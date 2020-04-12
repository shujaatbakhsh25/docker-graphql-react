const unsplash = require("./api");
const uuid = require("uuid");
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient({
  host: "redis",
  port: 6379,
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const resolvers = {
  Query: {
    unsplashImages: async (_, args) => {
      try {
        const { data } = await unsplash.get("/photos", {
          params: { page: args.pageNum },
        });
        return data.map(async (image) => {
          let ImagePost = await client.hgetAsync("images", image.id);
          if (ImagePost) return JSON.parse(ImagePost);
          else
            return {
              id: image.id,
              url: image.urls.raw,
              posterName: image.user.name,
              description: image.description,
              userPosted: false,
              binned: false,
            };
        });
      } catch (e) {
        console.log(e);
      }
    },
    binnedImages: async (_, args) => {
      try {
        let binned = [];
        const data = await client.hgetallAsync("images");
        for (let i in data) {
          let ImagePost = JSON.parse(data[i]);
          if (ImagePost.binned) {
            binned.push(ImagePost);
          }
        }
        return binned;
      } catch (e) {
        console.log(e);
      }
    },

    userPostedImages: async (_, args) => {
      try {
        let userPostedImages = [];
        const data = await client.hgetallAsync("images");
        for (let i in data) {
          let ImagePost = JSON.parse(data[i]);
          if (ImagePost.userPosted) {
            userPostedImages.push(ImagePost);
          }
        }
        return userPostedImages;
      } catch (e) {
        console.log(e);
      }
    },
  },

  Mutation: {
    uploadImage: async (_, args) => {
      try {
        const newImagePost = {
          id: uuid.v4(),
          url: args.url,
          description: args.description,
          posterName: args.posterName || "anonymous",
          binned: false,
          userPosted: true,
        };
        let details = JSON.stringify(newImagePost);
        await client.hsetAsync("images", newImagePost.id, details);
        return newImagePost;
      } catch (e) {
        console.log(e);
      }
    },
    updateImage: async (_, args) => {
      try {
        let ImagePost = await client.hgetAsync("images", args.id);
        if (ImagePost) {
          ImagePost = JSON.parse(ImagePost);
          const updatedImagePost = {
            id: ImagePost.id,
            url: args.url ? args.url : ImagePost.url,
            posterName: args.posterName
              ? args.posterName
              : ImagePost.posterName,
            description: args.description
              ? args.description
              : ImagePost.description,
            binned: args.hasOwnProperty("binned")
              ? args.binned
              : ImagePost.binned,
            userPosted: args.hasOwnProperty("userPosted")
              ? args.userPosted
              : ImagePost.userPosted,
          };
          await client.hsetAsync(
            "images",
            args.id,
            JSON.stringify(updatedImagePost)
          );
          return updatedImagePost;
        } else {
          const newImagePost = {
            id: args.id,
            url: args.url,
            description: args.description,
            binned: args.binned,
            userPosted: args.userPosted,
            posterName: args.posterName,
          };
          let details = JSON.stringify(newImagePost);
          await client.hsetAsync("images", args.id, details);
          return newImagePost;
        }
      } catch (e) {
        console.log(e);
      }
    },
    deleteImage: async (_, args) => {
      try {
        let deletedImage = await client.hgetAsync("images", args.id);
        deletedImage = JSON.parse(deletedImage);
        await client.hdelAsync("images", args.id);
        return deletedImage;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

module.exports = resolvers;

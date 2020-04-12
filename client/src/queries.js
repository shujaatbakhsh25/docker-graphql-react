import { gql } from "apollo-boost";
const GET_UNSPLASH_IMAGES = gql`
  query unsplashQuery($pageNum: Int) {
    unsplashImages(pageNum: $pageNum) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;
const GET_BINNED_IMAGES = gql`
  query binnedQuery {
    binnedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;
const GET_USER_POSTED_IMAGES = gql`
  query userPostedQuery {
    userPostedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;
const BIN_IMAGE = gql`
  mutation binImg(
    $id: ID!
    $url: String
    $posterName: String
    $description: String
    $userPosted: Boolean
    $binned: Boolean
  ) {
    updateImage(
      id: $id
      url: $url
      posterName: $posterName
      description: $description
      userPosted: $userPosted
      binned: $binned
    ) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const UPLOAD_IMAGE = gql`
  mutation addImg($url: String!, $description: String, $posterName: String) {
    uploadImage(url: $url, description: $description, posterName: $posterName) {
      id
    }
  }
`;

const DELETE_IMAGE = gql`
  mutation delImg($id: ID!) {
    deleteImage(id: $id) {
      id
    }
  }
`;
export default {
  GET_UNSPLASH_IMAGES,
  GET_BINNED_IMAGES,
  BIN_IMAGE,
  UPLOAD_IMAGE,
  GET_USER_POSTED_IMAGES,
  DELETE_IMAGE
};

const axios = require("axios");
module.exports = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization:
      "Client-ID ac5d24436c0ec4aabdc91100afcec9a48c9ef07d478d045acf49920fba366a63"
  }
});

const Movie = require("../models/movie");
const User = require("../models/user");
const request = require("request");

const BASE_URL =
  "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup";

module.exports = {
  getAllMovies
};

function getAllMovies(req, res) {
  const options = {
    url: `${BASE_URL}`,
    headers: {
      Host: "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      Key: process.env.REACT_APP_API_KEY
    }
  };

  request(options, (err, response, body) => {
    let data = JSON.parse(body);
    console.log("this is the data", data);
  });
}

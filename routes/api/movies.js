var express = require("express");
var axios = require("axios");
var router = express.Router();
//const moviesCtrl = require("../../controllers/movies");
const URL =
  "https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?&country=us&term=";

//router.get("/", moviesCtrl.getAllMovies);
router.get("/:title", (req, res) => {
  let title = req.params.title;
  axios({
    url: URL + title,
    method: "GET",
    headers: {
      "x-rapidapi-host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_API_KEY
    }
  })
    .then(response => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});
module.exports = router;

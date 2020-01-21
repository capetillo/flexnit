const express = require("express");
const router = express.Router();
const moviesCtrl = require("../../controllers/movies");

router.get("/movies", moviesCtrl.getAllMovies);

module.exports = router;
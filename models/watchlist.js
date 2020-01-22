const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const watchlistSchema = new Schema({
  title: { type: String, required: true },
  movie_id: { type: String, required: true, unique: true },
  summary: { type: String },
  release_date: { type: String }
  //poster: { type: String },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;

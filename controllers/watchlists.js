const Watchlist = require("../models/movie");
const User = require("../models/user");

module.exports = {
  addMovie,
  removeMovie,
  listWatchlist
};

function addMovie(req, res) {
  User.findById(req.params.user, function(err, user) {
    console.log("REQ BODY BABY", req.body);
    user.watchlist.push(req.body);
    user.save(function(err) {
      if (err) console.log(err);
      res.send({ message: req.body });
    });
  });
}

function removeMovie(req, res) {
  User.findById(req.params.user, function(err, user) {
    console.log("USER FOUND ", user);
    let newWatchlist = user.watchlist.filter(movie => {
      return movie.name !== req.params.title;
    });
    console.log("NEW WATCHLIST ", newWatchlist);
    user.watchlist = newWatchlist;
    user.save(function(err, user) {
      console.log("NEW NEW USER ", user);
      if (err) console.log(err);
      res.json(user);
    });
  });
}

function listWatchlist(req, res) {
  User.findById(req.params.user, function(err, user) {
    console
      .log("are we here???", user)
      .populate("Watchlist")
      .then(function(watchlist) {
        res.json(watchlist);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
}

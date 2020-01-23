const Watchlist = require("../models/movie");
const User = require("../models/user");

module.exports = {
  addMovie,
  removeMovie,
  listWatchlist
};

function addMovie(req, res) {
  // Watchlist.init().then(function() {
  //   Watchlist.create(req.body)
  //     .then(function(Watchlist) {
  //       return User.findOneAndUpdate(req.params.user,
  //         { $push: { favorite: Watchlist._id } },
  //         { new: true }
  //       );
  //     })
  //     .then(function(User) {
  //       res.json(User);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //       Watchlist.findOne({ movie_id: req.body.movie_id }).then(function(
  //         Watchlist
  //       ) {
  //         return User.findOneAndUpdate(
  //           { user_id: req.params.user },
  //           { $push: { favorite: Watchlist._id } },
  //           { new: true }
  //         );
  //       });
  //     });
  // });
  User.findById(req.params.user, function(err, user) {
    user.watchlist.push(req.body);
    user.save(function(err) {
      if (err) console.log(err);
      res.send({ message: "Movie added" });
    });
  });
}

function removeMovie(req, res) {
  Watchlist.findOne(req.body)
    .then(function(Watchlist) {
      return User.findOneAndUpdate(
        { user_id: req.params.user },
        { $pull: { favorite: Watchlist._id } }
      );
    })
    .then(function(User) {
      res.json(User);
    })
    .catch(function(err) {
      res.json(err);
    });
}

function listWatchlist(req, res) {
  User.findOne({ user_id: req.params.user })
    .populate("watchlist")
    .then(function(watchlist) {
      res.json(watchlist);
    })
    .catch(function(err) {
      res.json(err);
    });
}

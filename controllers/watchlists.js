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
    let newWatchlist = user.watchlist.filter(movie => {
      return movie.name !== req.params.title;
    });
    user.watchlist = newWatchlist;
    user.save(function(err) {
      if (err) console.log(err);
      res.send({ message: "deleted" });
    });
  });
}
// function removeMovie(req, res) {
//   var newWatchlist = user.watchlist.filter(movie => {
//     return movie.name !== req.params.title;
//   });
//   User.findByIdAndUpdate(
//     req.params.user_id,
//     newWatchlist,
//     { new: true },
//     function(err, user) {
//       user.save(function(err) {
//         if (err) console.log(err);
//         res.send({ message: "Movie removed" });
//       });
//     }
//   );
// }
// Watchlist.findOne(req.body)
//   .then(function(Watchlist) {
//     return User.findOneAndUpdate(
//       { user_id: req.params.user },
//       { $pull: { favorite: Watchlist._id } }
//     );
//   })
//   .then(function(User) {
//     res.json(User);
//   })
//   .catch(function(err) {
//     res.json(err);
//   });

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

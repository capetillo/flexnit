var express = require("express");
var axios = require("axios");
var router = express.Router();
var watchlistsCtrl = require("../../controllers/watchlists");

router.use(require("../../config/auth"));
router.get("/:user", checkAuth, watchlistsCtrl.listWatchlist);
router.post("/:user", watchlistsCtrl.addMovie);
router.delete("/:user", checkAuth, watchlistsCtrl.removeMovie);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;

var express = require("express");
var axios = require("axios");
var router = express.Router();
var watchlistsCtrl = require("../../controllers/watchlists");

router.use(require("../../config/auth"));
router.get("/:user", checkAuth, watchlistsCtrl.listWatchlist);
router.post("/:user", checkAuth, watchlistsCtrl.addMovie);
router.delete("/:user/:title", checkAuth, watchlistsCtrl.removeMovie);

function checkAuth(req, res, next) {
  console.log("REQ USER ", req.params.user);
  if (req.params.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;

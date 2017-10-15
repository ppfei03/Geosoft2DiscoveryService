const express = require("express");
const router = express.Router();

// var passport = require("passport");

// var Node = require("./models/node");s


router.get("/test", (req, res, next) => {
  res.send('Hello World')
});


module.exports = router;

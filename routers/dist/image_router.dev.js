"use strict";

var express = require("express");

var path = require("path");

var fs = require("fs");
/* create a router (to export) */


var router = express.Router();
/* Routes image URLs */

router.get("/:filename?", function (req, res) {
  var filename = req.params.filename;
  var image_path = path.resolve(__dirname, "../public/images/".concat(filename)); // if image doesn't exist, use a default image

  if (!fs.existsSync(image_path)) {
    console.error("Error image file not found: ".concat(filename));
    image_path = path.resolve(__dirname, "../public/images/default.jpg");
  }

  res.sendFile(image_path);
});
module.exports = router; // export the router
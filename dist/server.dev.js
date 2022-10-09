"use strict";

require("dotenv").config();

var dotenv = require("dotenv");

var path = require("path");

var express = require("express");

var bird_router = require("./routers/bird_router");

var image_router = require("./routers/image_router");

var bird_model = require("./model/birds_model");

var bodyParser = require("body-parser");
/* load .env */


dotenv.config();
/* create Express app */

var app = express();
/* setup Express middleware */
// Pug for SSR (static site rendering)

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); // TODO: middleware for parsing POST body

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname + "../public"))); // app.use(fileUpload());
// TODO: middleware for uploading files

app.post("/upload", function (req, res) {
  console.log(req.files.foo);
});
/* host static resources (.css, .js, ...) */

app.use("/images/", image_router);
app.use("/", express["static"](path.resolve(__dirname, "public/")));
/* redirect root route `/` to `/birds/` */

app.get("/", function (req, res) {
  res.redirect("/birds/");
});
app.use("/birds/", bird_router); // TODO: 404 page

app.get("*", function (request, response) {
  response.status(404);
  response.render("404-not-found.pug");
}); // /* connect database*/

var mongoose = require("mongoose");

var user = process.env.ATLAS_USER;
var password = process.env.ATLAS_PASSWORD;
var db_url = "mongodb+srv://".concat(user, ":").concat(password, "@cluster0.hayoush.mongodb.net/test?retryWrites=true&w=majority");
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}; // Database

mongoose.connect(db_url, options).then(function () {
  console.log("successfully connected!");
})["catch"](function (e) {
  console.error(e, "could not connect!");
});
/* start the server */

var PORT = process.env.PORT || 8088;
app.listen(PORT, function () {
  console.log("Server is live http://localhost:".concat(PORT));
});
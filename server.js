require("dotenv").config();
const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const bird_router = require("./routers/bird_router");
const image_router = require("./routers/image_router");
const bird_model = require("./model/birds_model");
const bodyParser = require("body-parser");

/* load .env */
dotenv.config();

/* create Express app */
const app = express();

/* setup Express middleware */
// Pug for SSR (static site rendering)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// TODO: middleware for parsing POST body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "../public")));
// app.use(fileUpload());

// TODO: middleware for uploading files
app.post("/upload", function (req, res) {
  console.log(req.files.foo);
});

/* host static resources (.css, .js, ...) */
app.use("/images/", image_router);
app.use("/", express.static(path.resolve(__dirname, "public/")));

/* redirect root route `/` to `/birds/` */
app.get("/", (req, res) => {
  res.redirect("/birds/");
});

app.use("/birds/", bird_router);

// TODO: 404 page

app.get("*", (request, response) => {
  response.status(404);
  response.render("404-not-found.pug");
});

// /* connect database*/
const mongoose = require("mongoose");
const user = process.env.ATLAS_USER;
const password = process.env.ATLAS_PASSWORD;
const db_url = `mongodb+srv://${user}:${password}@cluster0.hayoush.mongodb.net/test?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Database
mongoose
  .connect(db_url, options)
  .then(() => {
    console.log("successfully connected!");
  })
  .catch((e) => {
    console.error(e, "could not connect!");
  });

/* start the server */
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server is live http://localhost:${PORT}`);
});

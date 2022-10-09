const express = require("express");
const bird_model = require("../model/birds_model");
var bird_controller = require("../controllers/bird_controller");
/* create a router (to export) */
const router = express.Router();
var path = require("path");
router.use(express.static(path.join(__dirname + "../public")));

const multer = require("multer");
const { response } = require("express");

const storage = multer.diskStorage({
  //destination for file
  destination: function (request, file, callback) {
    callback(null, "./public/images");
  },

  // add back the extension
  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

// TODO: finish the "Create" route(s)
router.get("/create/", (req, res) => {
  // currently does nothing except redirect to home page
  res.render("create");
});

router.post("/create/", upload.single("photo_upload"), async (req, res) => {
  const text = req.body;
  const file = req.file.filename;
  if (req.file.filename != req.file.originalname) {
    file = req.file.originalname;
  }

  const bird_info = {
    primary_name: text.primary_name,
    english_name: text.english_name,
    scientific_name: text.scientific_name,
    order: text.order,
    family: text.family,
    other_names: text.other_names,
    status: text.status,
    photo: {
      credit: text.photo_credit,
      source: file,
    },
    size: {
      length: {
        value: text.length,
        units: "cm",
      },
      weight: {
        value: text.weight,
        units: "g",
      },
    },
  };

  const db_info = await bird_model.create(bird_info);
  res.redirect("/");
});

// TODO: get individual bird route(s)
router.get("/:id/", async (req, res) => {
  const id = req.params.id;
  const b = await bird_model.findOne({ _id: id });
  res.render("birds_view", { birds: [b] });
});

// TODO: Update bird route(s)
router.get("/:id/update", async (req, res) => {
  const id = req.params.id;
  const b = await bird_model.findOne({ _id: id });
  res.render("update", { birds: [b] });
});

router.post("/:id/update", upload.single("photo_upload"), async (req, res) => {
  const file = req.file;
  const id = req.params.id;
  const b = await bird_model.findOne({ _id: id });
  const content = req.body;
  var filename;
  if (!file) {
    filename = b.photo.source;
  } else {
    filename = file.originalname;
  }

  const db_info = await bird_model.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        primary_name: content.primary_name,
        english_name: content.english_name,
        other_names: content.other_names,
        scientific_name: content.scientific_name,
        order: content.order,
        family: content.family,
        other_names: content.other_names,
        status: content.status,
        photo: {
          credit: content.photo_credit,
          source: filename,
        },
        size: {
          length: {
            value: content.length,
            units: "cm",
          },
          weight: {
            value: content.weight,
            units: "g",
          },
        },
      },
    }
  );

  res.redirect("/");
});

// TODO: Delete bird route(s)
router.get("/:id/delete", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const db_info = await bird_model.findOneAndRemove({ _id: id });
  console.log(db_info, "/birds/:id/delete repsonse");
  // response.status(200).send("success! deleted message");
  res.redirect("/");
});

/* route the default URL: `/birds/ */
router.get("/", async (req, res) => {
  // extract the query params
  const search = req.query.search;
  const status = req.query.status;
  const sort = req.query.sort;

  // render the Pug template 'home.pug' with the filtered data
  res.render("home", {
    birds: await bird_controller.filter_bird_data(search, status, sort),
  });
});

module.exports = router; // export the router

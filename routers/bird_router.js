const express = require("express");
var bird_controller = require("../controllers/bird_controller");

/* create a router (to export) */
const router = express.Router();

/* route the default URL: `/birds/ */
router.get("/", async (req, res) => {
  // extract the query params
  const search = req.query.search;
  const status = req.query.status;
  const sort = req.query.sort;
  console.log(search, status, sort);

  // render the Pug template 'home.pug' with the filtered data
  res.render("home", {
    birds: bird_controller.filter_bird_data(search, status, sort),
  });
});

// TODO: finishe the "Create" route(s)
router.get("/create", (req, res) => {
  // currently does nothing except redirect to home page
  res.redirect("birds_view");
});
router.post("/create", async (req, res) => {
  // currently does nothing except redirect to home page
  res.redirect("birds_view");
});

// TODO: get individual bird route(s)

// TODO: Update bird route(s)

// TODO: Delete bird route(s)

module.exports = router; // export the router

"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = require("express");

var bird_model = require("../model/birds_model");

var bird_controller = require("../controllers/bird_controller");
/* create a router (to export) */


var router = express.Router();

var path = require("path");

router.use(express["static"](path.join(__dirname + "../public")));

var multer = require("multer");

var _require = require("express"),
    response = _require.response;

var storage = multer.diskStorage({
  //destination for file
  destination: function destination(request, file, callback) {
    callback(null, "./public/images");
  },
  // add back the extension
  filename: function filename(request, file, callback) {
    callback(null, file.originalname);
  }
}); //upload parameters for multer

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  }
}); // TODO: finish the "Create" route(s)

router.get("/create/", function (req, res) {
  // currently does nothing except redirect to home page
  res.render("create");
});
router.post("/create/", upload.single("photo_upload"), function _callee(req, res) {
  var text, file, bird_info, db_info;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          text = req.body;
          file = req.file.filename;

          if (req.file.filename != req.file.originalname) {
            file = (_readOnlyError("file"), req.file.originalname);
          }

          bird_info = {
            primary_name: text.primary_name,
            english_name: text.english_name,
            scientific_name: text.scientific_name,
            order: text.order,
            family: text.family,
            other_names: text.other_names,
            status: text.status,
            photo: {
              credit: text.photo_credit,
              source: file
            },
            size: {
              length: {
                value: text.length,
                units: "cm"
              },
              weight: {
                value: text.weight,
                units: "g"
              }
            }
          };
          _context.next = 6;
          return regeneratorRuntime.awrap(bird_model.create(bird_info));

        case 6:
          db_info = _context.sent;
          res.redirect("/");

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); // TODO: get individual bird route(s)

router.get("/:id/", function _callee2(req, res) {
  var id, b;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(bird_model.findOne({
            _id: id
          }));

        case 3:
          b = _context2.sent;
          res.render("birds_view", {
            birds: [b]
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // TODO: Update bird route(s)

router.get("/:id/update", function _callee3(req, res) {
  var id, b;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(bird_model.findOne({
            _id: id
          }));

        case 3:
          b = _context3.sent;
          res.render("update", {
            birds: [b]
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post("/:id/update", upload.single("photo_upload"), function _callee4(req, res) {
  var _$set;

  var file, id, b, content, filename, db_info;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          file = req.file;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(bird_model.findOne({
            _id: id
          }));

        case 4:
          b = _context4.sent;
          content = req.body;

          if (!file) {
            filename = b.photo.source;
          } else {
            filename = file.originalname;
          }

          _context4.next = 9;
          return regeneratorRuntime.awrap(bird_model.findOneAndUpdate({
            _id: id
          }, {
            $set: (_$set = {
              primary_name: content.primary_name,
              english_name: content.english_name,
              other_names: content.other_names,
              scientific_name: content.scientific_name,
              order: content.order,
              family: content.family
            }, _defineProperty(_$set, "other_names", content.other_names), _defineProperty(_$set, "status", content.status), _defineProperty(_$set, "photo", {
              credit: content.photo_credit,
              source: filename
            }), _defineProperty(_$set, "size", {
              length: {
                value: content.length,
                units: "cm"
              },
              weight: {
                value: content.weight,
                units: "g"
              }
            }), _$set)
          }));

        case 9:
          db_info = _context4.sent;
          res.redirect("/");

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // TODO: Delete bird route(s)

router.get("/:id/delete", function _callee5(req, res) {
  var id, db_info;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          console.log(id);
          _context5.next = 4;
          return regeneratorRuntime.awrap(bird_model.findOneAndRemove({
            _id: id
          }));

        case 4:
          db_info = _context5.sent;
          console.log(db_info, "/birds/:id/delete repsonse"); // response.status(200).send("success! deleted message");

          res.redirect("/");

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
/* route the default URL: `/birds/ */

router.get("/", function _callee6(req, res) {
  var search, status, sort;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // extract the query params
          search = req.query.search;
          status = req.query.status;
          sort = req.query.sort; // render the Pug template 'home.pug' with the filtered data

          _context6.t0 = res;
          _context6.next = 6;
          return regeneratorRuntime.awrap(bird_controller.filter_bird_data(search, status, sort));

        case 6:
          _context6.t1 = _context6.sent;
          _context6.t2 = {
            birds: _context6.t1
          };

          _context6.t0.render.call(_context6.t0, "home", _context6.t2);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router; // export the router
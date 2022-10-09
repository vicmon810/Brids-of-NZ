const mongoose = require("mongoose");
//create a schema
const birdSchema = new mongoose.Schema({
  primary_name: { type: String, require: true },
  english_name: { type: String, require: true },
  scientific_name: { type: String, require: true },
  order: { type: String, require: true },
  family: { type: String, require: true },
  other_names: { type: [String], require: true },
  status: { type: String, require: true },
  photo: {
    source: { type: String, require: true },
    credit: { type: String, require: true },
  },
  size: {
    weight: {
      value: { type: Number, require: true },
      units: { type: String, require: true },
    },
    length: {
      value: { type: Number, require: true },
      units: { type: String, require: true },
    },
  },
});
const bird = mongoose.model("bird", birdSchema);
module.exports = bird;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  images: { type: [String], required: true },
  posterId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  description: { type: [String] },
  timeStamp: { type: Number },
  available: { type: Boolean },
  history: { type: [String] }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

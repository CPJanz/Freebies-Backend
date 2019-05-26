const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  images: { type: [{ preview: String, uri: String }], required: true },
  giverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  description: { type: String },
  timeStamp: {
    type: [Date],
    default: Date.now
  },
  available: {
    type: Boolean,
    default: true
  },
  history: [{ type: String }]
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

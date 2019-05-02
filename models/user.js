const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  givenItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item"
    }
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toLower = (str) => str.toLowerCase();

const userSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, set: toLower },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;

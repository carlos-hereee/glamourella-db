const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Calendar = mongoose.model("Calendar", calendarSchema);
module.exports = Calendar;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    calendarId: { type: String },
    name: { type: String },
    description: { type: String },
    attendee: { type: String },
    start: { type: String },
    end: { type: String },
    date: { type: String },
    summary: { type: String },
  },
  { timestamps: true }
);

const Event = mongoose.model("Calendar", eventSchema);
module.exports = Event;

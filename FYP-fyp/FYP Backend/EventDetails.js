// EventDetails.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    isPublic: Boolean,
  },
  { collection: "Events" }
);

mongoose.model("Event", EventSchema);

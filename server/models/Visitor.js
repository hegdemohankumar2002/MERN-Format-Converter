const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    count: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastReset: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);

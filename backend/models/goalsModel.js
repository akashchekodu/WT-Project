const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    goal: {
      type: String,
      required: [true, "Goal is required"],
      maxlength: [40, "A tour name must have less or equal then 40 characters"],
      trim: true,
    },
    markedAsDone: {
      type: Boolean,
      required: [true, "Mark As Done is required"],
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Goal must belong to a user"],
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;

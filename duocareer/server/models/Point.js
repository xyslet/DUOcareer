import mongoose from "mongoose";

const pointSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    trail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trail",
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    xpReward: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

const Point = mongoose.model("Point", pointSchema);

export default Point;
import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
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

    requirement: {
      type: String,
      required: true,
      trim: true,
    },

    xpReward: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
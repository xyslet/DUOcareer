import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    point: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Point",
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    xpEarned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
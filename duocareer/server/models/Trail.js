import mongoose from "mongoose";

const trailSchema = new mongoose.Schema(
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

    category: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Trail = mongoose.model("Trail", trailSchema);

export default Trail;
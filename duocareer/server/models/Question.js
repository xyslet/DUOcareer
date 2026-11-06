import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: true,
      trim: true,
    },

    expectedAnswer: {
      type: String,
      required: true,
      trim: true,
    },

    point: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Point",
      required: true,
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

const Question = mongoose.model("Question", questionSchema);

export default Question;
import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      default: "General",
      trim: true
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Notice = mongoose.model(
  "Notice",
  noticeSchema
);

export default Notice;
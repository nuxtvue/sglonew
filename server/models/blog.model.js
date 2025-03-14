import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    h1: {
      type: String,
      unique: true,
    },
    banner: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    introtext: {
      type: String,
    },
    content: {
      type: Array,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },

    coverImageName: {
      type: Array,
    },
    region: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdDate: {
      type: Date,
      default: Date.now,
    },
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);

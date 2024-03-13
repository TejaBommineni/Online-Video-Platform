var { Schema, model, SchemaTypes } = require("mongoose");

//Video Schema
var VideoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  video: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  duration: {
    type: Number, //in second
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
  likes: [
    {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  ],
  dislikes: [
    {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  ],
  activeStatus: {
    type: Boolean,
    default: true,
  },
  ratings: [
    {
      user: {
        type: SchemaTypes.ObjectId,
      },
      rating: Number,
    },
  ],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Video = model("video", VideoSchema);

module.exports = { Video };

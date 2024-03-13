var { Schema, model, SchemaTypes } = require("mongoose");

//Comment Schema
var CommentSchema = Schema(
  {
    text: {
      type: String,
      required: true,
    },
    video: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "video",
    },
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    replies: [
      {
        text: String,
        user: {
          type: SchemaTypes.ObjectId,
          ref: "user",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = model("comment", CommentSchema);

module.exports = { Comment };

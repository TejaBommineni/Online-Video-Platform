import React, { useEffect, useReducer, useState } from "react";
import PostComment from "./PostComment";
import SingleComment from "./SingleComment";
import { GetComments } from "../../../service/service";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const initialComments = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return [...action.payload];
    case "create":
      return [action.payload, ...state];
    case "update":
      const updated = state.map((comment) => {
        if (comment._id.toString() !== action.payload._id.toString()) {
          return comment;
        }
        return action.payload;
      });
      return updated;
    case "delete":
      return state.filter(
        (comment) => comment._id.toString() !== action.commentID.toString()
      );
    case "unload":
      return [];
    default:
      return state;
  }
};

const Comments = ({ videoData }) => {
  const [comments, dispatchComments] = useReducer(reducer, initialComments);
  const [shouldGetComments, setShouldGetComments] = useState(false);

  // Fetch video comments
  useEffect(() => {
    (async () => {
      if (shouldGetComments) {
        const response = await GetComments(videoData._id);
        if (response && response.isSuccess) {
          console.log(response.data.result);
          const payload = response.data.result;
          dispatchComments({
            type: "load",
            payload,
          });
          setShouldGetComments(false);
        } else {
          toast.error(`${response.data.toString()}!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
      }
    })();

    return () => {
      setShouldGetComments(false);
    };
  }, [shouldGetComments, videoData]);

  useEffect(() => {
    setShouldGetComments(true);
    return () => {
      setShouldGetComments(false);
      dispatchComments({
        type: "unload",
      });
    };
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold">Comments</h1>
      <PostComment dispatchComments={dispatchComments} videoData={videoData} />
      {comments &&
        comments.map((comment) => (
          <SingleComment
            key={uuidv4()}
            comment={comment}
            dispatchComments={dispatchComments}
          />
        ))}
    </div>
  );
};

export default Comments;

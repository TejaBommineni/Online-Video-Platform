import React, { useState, useEffect, useContext } from "react";
import { CommentVideo } from "../../../service/service";
import { AuthContext } from "../../../Providers/AuthProvider";
import { toast } from "react-toastify";

const PostComment = ({ videoData, dispatchComments }) => {
  const [textValue, setTextValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [shouldComment, setShouldComment] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (textValue.trim().length > 0) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }

    return () => {
      setDisableSubmit(true);
    };
  }, [textValue]);

  useEffect(() => {
    (async () => {
      if (shouldComment) {
        const response = await CommentVideo(videoData._id, {
          text: textValue,
          userID: user._id,
        });

        if (response && response.isSuccess) {
          const commentData = { ...response.data.result };
          const commentUser = { ...response.data.result.user, ...user };
          commentData.user = commentUser;

          console.log(commentData);

          setTextValue("");
          dispatchComments({
            type: "create",
            payload: commentData,
          });
        } else {
          toast.error(`${response.data.toString()}!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
      }
    })();

    return () => {
      setShouldComment(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldComment, videoData, textValue, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTextValue(textValue.trim());
    setShouldComment(true);
  };

  return (
    <>
      <form className="w-full max-w-xxl" onSubmit={submitHandler}>
        <div className="py-2">
          <div className="md:w-2/3 mb-2">
            <textarea
              className="bg-gray-200 appearance-none border-b-2 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
              id="inline-full-name"
              type="text"
              placeholder="Add a comment"
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="inline-flex">
            <button
              type="submit"
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-1 rounded ${
                disableSubmit && "cursor-not-allowed"
              }`}
              disabled={disableSubmit}
            >
              Submit
            </button>
            <button
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-1 rounded"
              type="reset"
              onClick={() => {
                setTextValue("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostComment;

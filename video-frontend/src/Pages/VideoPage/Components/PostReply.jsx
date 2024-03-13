import React, { useState, useEffect, useContext, useRef } from "react";
import { ReplyComment } from "../../../service/service";
import { AuthContext } from "../../../Providers/AuthProvider";
import { toast } from "react-toastify";

const PostReply = ({ comment, dispatchComments, setShowReplyBox }) => {
  const [textValue, setTextValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [shouldReply, setShouldReply] = useState(false);

  const { user } = useContext(AuthContext);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      if (shouldReply) {
        console.log("should reply");
        const response = await ReplyComment(comment._id, user._id, {
          text: textValue,
        });
        if (response && response.isSuccess) {
          const payload = response.data.result;
          setTextValue("");
          dispatchComments({
            type: "update",
            payload,
          });
        } else {
          toast.error(`${response.data.toString()}!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
        setShouldReply(false);
      }
    })();

    return () => {
      setShouldReply(false);
    };
  }, [shouldReply, comment, textValue, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTextValue(textValue.trim());
    setShouldReply(true);
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
              placeholder="Add a reply"
              value={textValue}
              ref={inputRef}
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="inline-flex">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-1 px-2 rounded inline-flex items-center text-xs mr-2"
              disabled={disableSubmit}
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-900 text-white font-bold py-1 px-2 rounded inline-flex items-center text-xs mr-2"
              onClick={() => {
                setTextValue("");
                setShowReplyBox(false);
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

export default PostReply;

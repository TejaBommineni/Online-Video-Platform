import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AuthContext } from "../../../Providers/AuthProvider";
import { DeleteComment } from "../../../service/service";
import { toast } from "react-toastify";
import SingleReply from "./SingleReply";
import PostReply from "./PostReply";
import { v4 as uuidv4 } from "uuid";
import MiniButton from "./MiniButton";
import { updateComment } from "../../../service/service";

const SingleComment = ({ comment, dispatchComments }) => {
  const { user } = useContext(AuthContext);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldReplyBox, setShowReplyBox] = useState(false);

  const [showEditField, setShowEditField] = useState(false);
  const [editFieldValue, setEditFieldValue] = useState(comment?.text?.trim());
  const [shouldUpdate, setShouldUpdate] = useState(false);

  // Delete comment
  useEffect(() => {
    (async () => {
      if (shouldDelete) {
        const response = await DeleteComment(comment._id, user._id);

        if (response && response.isSuccess) {
          dispatchComments({
            type: "delete",
            commentID: comment._id,
          });
        } else {
          toast.error(`Could not delete the comment!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
      }
    })();

    return () => {
      setShouldDelete(false);
    };
  }, [shouldDelete, comment, user]);

  // Edit comment
  useEffect(() => {
    (async () => {
      if (shouldUpdate) {
        const response = await updateComment(comment._id, user._id, {
          text: editFieldValue,
        });

        setShouldUpdate(false);

        if (response && response.isSuccess) {
          console.log(response.data.result);

          setShowEditField(false);
          dispatchComments({
            type: "update",
            payload: response.data.result,
          });
        } else {
          setEditFieldValue(comment?.text?.trim());
          toast.error(`Could not update the comment!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
      }
    })();

    return () => {
      setShouldUpdate(false);
    };
  }, [shouldUpdate, comment, user, editFieldValue]);

  return (
    <div className="my-4">
      <div className="">
        <span className="text-base mr-2 font-bold">{comment?.user?.name}</span>
        <span className="text-xs">
          {moment(comment.createdAt).startOf("minute").fromNow()}
        </span>
      </div>
      <div>
        {!showEditField && (
          <pre
            className="w-100"
            style={{
              minHeight: "auto",
              fontFamily: "inherit",
            }}
          >
            {comment?.text?.trim()}
          </pre>
        )}
        {showEditField && (
          <textarea
            className="p-1 border rounded w-50"
            value={editFieldValue}
            onChange={(e) => {
              setEditFieldValue(e.target.value);
            }}
          />
        )}
      </div>
      <div className="my-1">
        <MiniButton
          icon="bx bx-reply"
          text="Reply"
          onClick={() => {
            setShowReplyBox((state) => !state);
          }}
        />

        {user._id === comment.user._id ? (
          <>
            {!showEditField && (
              <MiniButton
                icon="bx bx-edit-alt"
                text="Edit"
                onClick={() => {
                  setShowEditField(true);
                }}
              />
            )}
            {showEditField && (
              <MiniButton
                icon="bx bx-check-circle"
                text="Save"
                onClick={() => {
                  setShouldUpdate(true);
                }}
              />
            )}

            <MiniButton
              icon="bx bx-trash"
              text="Delete"
              onClick={() => {
                setShouldDelete(true);
              }}
            />
          </>
        ) : null}
      </div>

      <div className="pl-4 mt-2">
        {shouldReplyBox && (
          <PostReply
            comment={comment}
            dispatchComments={dispatchComments}
            setShowReplyBox={setShowReplyBox}
          />
        )}
        {comment?.replies?.map((reply) => (
          <SingleReply
            key={uuidv4()}
            reply={reply}
            comment={comment}
            dispatchComments={dispatchComments}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleComment;

import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AuthContext } from "../../../Providers/AuthProvider";
import { DeleteReply, updateReply } from "../../../service/service";
import { toast } from "react-toastify";
import MiniButton from "./MiniButton";

const SingleReply = ({ comment, reply, dispatchComments }) => {
  const { user } = useContext(AuthContext);
  const [showEditField, setShowEditField] = useState(false);
  const [editFieldValue, setEditFieldValue] = useState(reply?.text?.trim());

  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  // Delete reply
  useEffect(() => {
    (async () => {
      if (shouldDelete) {
        const response = await DeleteReply(user._id, {
          commentID: comment._id,
          replyID: reply._id,
        });

        if (response && response.isSuccess) {
          const payload = response.data.result;
          dispatchComments({
            type: "update",
            payload: payload,
          });
        } else {
          toast.error(`Could not delete the comment!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
        setShouldDelete(false);
      }
    })();

    return () => {
      setShouldDelete(false);
    };
  }, [shouldDelete, user, comment, reply]);

  // Edit comment
  useEffect(() => {
    (async () => {
      if (shouldUpdate) {
        const response = await updateReply(user._id, {
          replyID: reply._id,
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
          setEditFieldValue(reply?.text?.trim());
          toast.error(`Could not update the reply!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
      }
    })();

    return () => {
      setShouldUpdate(false);
    };
  }, [shouldUpdate, editFieldValue, reply, user]);
  return (
    <>
      <div className="mt-1">
        <div className="reply-meta">
          <span className="text-base mr-2 font-bold">{reply?.user?.name}</span>
          <span className="text-xs">
            {moment(reply.createdAt).startOf("minute").fromNow()}
          </span>
        </div>
        {!showEditField && (
          <pre
            className="reply-body w-100"
            style={{
              minHeight: "auto",
              fontFamily: "inherit",
            }}
          >
            {reply?.text?.trim().split("")}
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
        <div>
          {user._id === reply.user._id ? (
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
      </div>
    </>
  );
};

export default SingleReply;

import React from "react";
import Popup from "reactjs-popup";
import styles from "../../../styles/Popup.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";

const ShareVideo = ({ videoData }) => {
  return (
    <Popup
      trigger={
        <span className={`mx-2 flex`} role="button">
          <i
            className="bx bx-share-alt"
            style={{
              fontSize: "24px",
              color: "#000",
            }}
          ></i>
        </span>
      }
      modal
      nested
    >
      {(close) => (
        <div className={`${styles.modal}`}>
          <button className={`${styles.close}`} onClick={close}>
            &times;
          </button>
          <div className={`${styles.header}`}> Share video </div>
          <div className={`${styles.content}`}>
            <div className="d-flex justify-center">
              <div className="mr-2 d-flex align-items-center bg-slate-700 rounded-full px-1">
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={() => {
                    toast(`Copied link to clipboard!`, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 1000,
                      delay: 100,
                    });
                    close();
                  }}
                >
                  <button className="bx bx-copy text-4xl"></button>
                </CopyToClipboard>
              </div>
              <div className="mr-2">
                <FacebookShareButton
                  url={window.location.href}
                  quote={videoData?.title}
                >
                  <FacebookIcon size={50} round />
                </FacebookShareButton>
              </div>
              <div className="mr-2">
                <TwitterShareButton
                  url={window.location.href}
                  title={videoData?.title}
                >
                  <TwitterIcon size={50} round />
                </TwitterShareButton>
              </div>
              <div className="mr-2">
                <WhatsappShareButton
                  url={window.location.href}
                  title={videoData?.title}
                >
                  <WhatsappIcon size={50} round />
                </WhatsappShareButton>
              </div>
              <div className="mr-2">
                <LinkedinShareButton
                  url={window.location.href}
                  title={videoData?.title}
                  summary={videoData?.description}
                >
                  <LinkedinIcon size={50} round />
                </LinkedinShareButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ShareVideo;

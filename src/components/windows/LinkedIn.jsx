import React from "react";
import MacWindow from "./MacWindow";
import "./linkedin.scss";

const LINKEDIN_URL = "https://www.linkedin.com/feed/";
const PROFILE_URL = "https://www.linkedin.com/in/simerdeep-singh-gandhi/";

const LinkedIn = ({ windowName, setWindowState, windowProps }) => {
  return (
    <MacWindow
      windowName={windowName}
      setWindowState={setWindowState}
      windowProps={windowProps}
      width="50vw"
      height="70vh"
    >
      <div className="linkedin-window">
        <iframe
          title="LinkedIn"
          src={LINKEDIN_URL}
          className="linkedin-iframe"
          allow="fullscreen"
          loading="lazy"
        />
        <div className="linkedin-footer">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-open-tab"
          >
            Open LinkedIn in a new tab
          </a>
        </div>
      </div>
    </MacWindow>
  );
};

export default LinkedIn;

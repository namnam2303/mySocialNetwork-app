// Intro.js
import React from "react";
import "../../styles/Profile/Intro.css";

const Intro = ({ intro }) => {
  return (
    <div className="intro">
      <h2>Intro</h2>
      <div className="intro-info">
        <p>
          <span>Works at:</span> {intro.work}
        </p>
        <p>
          <span>Lives in:</span> {intro.location}
        </p>
        <p>
          <span>From:</span> {intro.from}
        </p>
        <p>
          <span>Joined:</span> {intro.joined}
        </p>
      </div>
    </div>
  );
};

export default Intro;

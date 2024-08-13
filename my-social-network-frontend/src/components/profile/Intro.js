// Intro.js
import React from "react";
import "../../styles/Profile/Intro.css";
import { formatDate } from "../../utils/utils";

const Intro = ({ user }) => {
  return (
    <div className="intro">
      <h2>Information</h2>
      <div className="intro-info">
        <p>
          <span>Birthday : </span> {formatDate(user.birthDate)}
        </p>
        <p>
          <span>Works as :</span> {user.occupation}
        </p>
        <p>
          <span>Lives in :</span> {user.location}
        </p>
        <p>
          <span>Joined :</span> {formatDate(user.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Intro;

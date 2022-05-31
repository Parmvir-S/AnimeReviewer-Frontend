import React from "react";
import P_NARUTO from "../Assets/Images/baryon2.png";
import "../Styling/landing.css";

function Landing() {
  return (
    <div>
      <div className="imgContainer">
        <img className="landingImg" src={P_NARUTO} alt="Third slide" />
      </div>
      <div className="centered">AniMedia</div>
    </div>
  );
}

export default Landing;

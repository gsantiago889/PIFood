import React from "react";
import { Link } from "react-router-dom";
import Cocinero from "../Images/cocineros.gif";
import "./landingpage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1 className="welcomeMsg">Do you love cooking? Welcome!</h1>
      <Link to="/home" id="click">
        <button className="homeButton">Let's go</button>
      </Link>
      <img className="cocinero" src={Cocinero} alt="coinero gif" />
    </div>
  );
}

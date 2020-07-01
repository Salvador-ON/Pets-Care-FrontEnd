import React from "react";
import "../styles/NavBar.css";
import LogoWite from "../assets/logosmall-white.png";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const NavBar = ({option}) => {

 
  return (
    <nav className="float-left NavContainer">
      <div className="mt-5 mx-2">
      <Link to='/'>
        <img className="img-fluid" src={LogoWite} alt="Pets-Care-Logo" />
      </Link>
        
      </div>

      <div className="LinkContainer">
      <Link className="navLinksItem rounded-left my-1" style={ option === "services" ? {background: "#101e42", color: "#fff"} : {background: "#fff", color: "#101e42"}} to='/services'>
      Services
      </Link>

      
      <Link className="navLinksItem rounded-left my-1" to='/services'>
        Dashboard
      </Link>
        

      <Link className="navLinksItem rounded-left my-1" style={ option === "signup" ? {background: "#101e42", color: "#fff"} : {background: "#fff", color: "#101e42"}} to='/signup'>
      Sign Up
      </Link>

      <Link className="navLinksItem rounded-left my-1" to='/login'>
        Log In
      </Link>

      <Link className="navLinksItem rounded-left my-1" to='/signup'>
        Log Out
      </Link>

      {/* style={ option === "signup" ? {background: "#101e42", color: "#fff"} : {background: "#fff", color: "#101e42"}} */}

      </div>

      <div className="socialCont d-flex justify-content-around">
      <FontAwesomeIcon icon={faFacebook} className={"fa-2x"}/>
      <FontAwesomeIcon icon={faTwitter} className={"fa-2x"}/>
      <FontAwesomeIcon icon={faInstagram} className={"fa-2x"}/>
      <FontAwesomeIcon icon={faYoutube} className={"fa-2x"}/>
      </div>
    </nav>
  );
};

export default NavBar;

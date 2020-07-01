import React from "react";
import "../styles/NavBar.css";
import LogoWite from "../assets/logosmall-white.png";
import {Link} from 'react-router-dom'

const NavBar = ({option}) => {
  return (
    <nav className="float-left NavContainer">
      <div className="mt-5 mx-2">
      <Link to='/'>
        <img className="img-fluid" src={LogoWite} alt="Pets-Care-Logo" />
      </Link>
        
      </div>

      <div className="LinkContainer">
      <Link className="LinksItem" to='/services'>
        <span className="my-2 navLinksItem" style={ option === "services" ? {background: "#101e42", color: "#fff"} : {background: "#fff", color: "#101e42 !important"} }>Services</span>
      </Link>
        
        <a className="my-2 navLinksItem">Values</a>
        <a className="my-2 navLinksItem">Dashboard</a>
        <a className="my-2 navLinksItem">Sign Up</a>
        <a className="my-2 navLinksItem">Log In</a>
        <a className="my-2 navLinksItem">Log Out</a>
      </div>
    </nav>
  );
};

export default NavBar;

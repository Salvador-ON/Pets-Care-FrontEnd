import React from "react";
import "../styles/NavBar.css";
import LogoWite from "../assets/logosmall-white.png";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { LogOut } from "../actions/index.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

const NavBar = ({ option }) => {
  const user = useSelector((state) => state.loggedInStatus);
  const dispatch = useDispatch();
  let history = useHistory();
  const handleLogOut = () => {
    axios
      .delete("https://pets-care-api.herokuapp.com/logout", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.logged_out) {
          dispatch(LogOut());
          history.push("/services");
        }
      })
      .catch((error) => {});
  };

  return (
    <nav className="float-left NavContainer">
      <div className="mt-5 mx-2">
        <Link to="/">
          <img className="img-fluid" src={LogoWite} alt="Pets-Care-Logo" />
        </Link>
      </div>

      <div className="LinkContainer">
        <Link
          className="navLinksItem rounded-left my-1"
          style={
            option === "services"
              ? { background: "#101e42", color: "#fff" }
              : { background: "#fff", color: "#101e42" }
          }
          to="/services"
        >
          Services
        </Link>

        {user.loggedInStatus === "LOGGED_IN" ? (
          <Link
            className="navLinksItem rounded-left my-1"
            style={
              option === "dashboard"
                ? { background: "#101e42", color: "#fff" }
                : { background: "#fff", color: "#101e42" }
            }
            to="/dashboard"
          >
            Dashboard
          </Link>
        ) : null}

        {user.loggedInStatus !== "LOGGED_IN" ? (
          <Link
            className="navLinksItem rounded-left my-1"
            style={
              option === "signup"
                ? { background: "#101e42", color: "#fff" }
                : { background: "#fff", color: "#101e42" }
            }
            to="/signup"
          >
            Sign Up
          </Link>
        ) : null}

        {user.loggedInStatus !== "LOGGED_IN" ? (
          <Link
            className="navLinksItem rounded-left my-1"
            style={
              option === "login"
                ? { background: "#101e42", color: "#fff" }
                : { background: "#fff", color: "#101e42" }
            }
            to="/login"
          >
            Log In
          </Link>
        ) : null}

        {user.loggedInStatus === "LOGGED_IN" ? (
          <span
            className="navLinksItem rounded-left my-1"
            onClick={handleLogOut}
          >
            Log Out
          </span>
        ) : null}

        {/* style={ option === "signup" ? {background: "#101e42", color: "#fff"} : {background: "#fff", color: "#101e42"}} */}
      </div>

      <div className="socialCont d-flex justify-content-around">
        <FontAwesomeIcon icon={faFacebook} className={"fa-2x"} />
        <FontAwesomeIcon icon={faTwitter} className={"fa-2x"} />
        <FontAwesomeIcon icon={faInstagram} className={"fa-2x"} />
        <FontAwesomeIcon icon={faYoutube} className={"fa-2x"} />
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  option: PropTypes.string.isRequired,
};

export default NavBar;

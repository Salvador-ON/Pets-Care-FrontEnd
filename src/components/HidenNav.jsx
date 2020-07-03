import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import {Link, useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { LogOut } from "../actions/index.js";
import '../styles/Landing.css';

const HidenNav = () => {
  const user = useSelector((state) => state.loggedInStatus);
  const dispatch = useDispatch();
  let history = useHistory();
  const handleLogOut = () => {
    axios
      .delete("http://localhost:3001/logout", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.logged_out) {
          dispatch(LogOut());
          history.push("/services");
        }
      })
      .catch((error) => {
      });
  };
  return ( 
    <Menu>
      <Link className="butt" to='/services'>
        Services
      </Link>
      
      {user.loggedInStatus === "LOGGED_IN" ? <Link className="my-2 butt" to='/dashboard'>
      Dashboard
      </Link> : null}


      {user.loggedInStatus !== "LOGGED_IN" ? <Link className="my-2 butt" to='/signup'>
      Sign Up
      </Link> : null}

      {user.loggedInStatus !== "LOGGED_IN" ? <Link className="my-2 butt" to='/login'>
      Log In
      </Link> : null}

      {user.loggedInStatus === "LOGGED_IN" ? <span className="my-2 butt" onClick={handleLogOut}>Log Out</span> : null}

      
      </Menu>
   );
}
 
export default HidenNav;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { LogOut } from "../actions/index.js";
import { useHistory } from "react-router-dom";
import FormArticles from "./FormArticles";
import FormServices from "./FormServices";
import Articles from "./Articles";
import Services from "../containers/Services";
import NavBar from "./Navbar.jsx";
import "../styles/Dashboard.css";

const Dashboard = () => {
  let history = useHistory();
  const dispatch = useDispatch();


  const handleDelete = () => {
    axios
      .delete("http://localhost:3001/appointments/4", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const handleLogOut = () => {
    axios
      .delete("http://localhost:3001/logout", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.logged_out) {
          console.log(response.data.logged_out);
          dispatch(LogOut());
          console.log(user);
          // history.push("/");
        }
        console.log("out", response);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const user = useSelector((state) => state.loggedInStatus);
  return (
    <div>
       <NavBar option={"dashboard"}/>

      <div className="float-right DashboardContainer">  
      <h1 className="DashboardTile text-center">Dashboard</h1>
      {user.loggedInStatus === "NOT_LOGGED_IN" ? (
          <h3  className="DashboardSubTile text-center">You are not Logged In </h3>
        ) : null}
        {user.loggedInStatus === "LOGGED_IN" ? (
          <h3 className="DashboardSubTile text-center">Welcome {user.user.name}</h3>
        ) : null}

       {/* <h1>Dashboard</h1>
        <FormArticles userID={user.user.id} />
        <Articles /> */}
      </div> 
    </div>
  );
};

export default Dashboard;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { LogOut } from "../actions/index.js";
import { useHistory } from "react-router-dom";
import FormArticles from "./FormArticles";
import FormServices from "./FormServices";
import Articles from "./Articles";
import Services from "../containers/Services";

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
      <div>
        {user.loggedInStatus === "NOT_LOGGED_IN" ? (
          <h1>You are not Logged In </h1>
        ) : null}
        {user.loggedInStatus === "LOGGED_IN" ? (
          <h1>Welcome {user.user.name}</h1>
        ) : null}

        <h1>Dashboard</h1>
        <FormArticles userID={user.user.id} />
        <Articles />
          <hr/>
        <FormServices/>
        <Services />
        <button className="btn btn-danger" onClick={() => handleLogOut()}>Log out</button>
        <button className="btn btn-danger" onClick={() => handleDelete()}>Delete appointment</button>
      </div>
    </div>
  );
};

export default Dashboard;

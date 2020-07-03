import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { LogOut } from "../actions/index.js";
import { useHistory } from "react-router-dom";
import FormArticles from "./FormArticles";
import FormServices from "./FormServices";
import Services from "../containers/Services";
import NavBar from "./Navbar.jsx";
import "../styles/Dashboard.css";
import AdminButtons from "./AdminButtons.jsx";
import ServicesList from "./ServicesList.jsx";
import AppointmentsEmployes from "./AppointmentsEmployes.jsx";
import UserAppointments from "./UserAppointments.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [selectedButton, useSelectedButton] = React.useState("");

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
  
  const ButtonSelected = (value) => {
    useSelectedButton(value)
  }

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
          <h3 className="DashboardSubTile text-center">Welcome <span className="text-capitalize">{user.user.name}</span> </h3>
        ) : null}

      { user.user.role === "admin" || user.user.role === "employe" ? <AdminButtons ButtonSelected={ButtonSelected}/> : null}
      
      {selectedButton === "ads" ? <FormServices ButtonSelected={ButtonSelected}/> : null}
      {selectedButton === "ser" ? <ServicesList/> : null}
      {selectedButton === "aps" ? <AppointmentsEmployes/> : null}
      {selectedButton === "map" || user.user.role === "user"  ? <UserAppointments/>: null}
      {/* <EmployeButtons/>
      <ClientButtons/> */}
       {/* <h1>Dashboard</h1>
        <FormArticles userID={user.user.id} />
        <Articles /> */}
      </div> 
    </div>
  );
};

export default Dashboard;

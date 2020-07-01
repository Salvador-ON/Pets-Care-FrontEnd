import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "../actions/index.js";
import Services from "./Services";
import Landing from '../components/Landing'
import Login from '../components/auth/Login'
import Registration from '../components/auth/Registration'
import AdminRegistration from '../components/auth/AdminRegistration'
import '../styles/App.css';

const App = () => {
  const user = useSelector((state) => state.loggedInStatus);

  const dispatch = useDispatch();

  const checkLoginSatus = () => {
    axios
      .get("http://localhost:3001/logged_in", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("login", response);

        if (
          response.data.logged_in &&
          user.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          dispatch(LogIn(response.data.user));
        } else if (
          !response.data.logged_in &&
          user.loggedInStatus === "LOGGED_IN"
        ) {
          dispatch(LogOut());
        }
        // console.log('resp', response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkLoginSatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path={"/"} component={Landing} />
        <Route exact path={"/services"} component={Services} />
          <Route exact path={"/home"} component={Home} />
          <Route exact path={"/dashboard"} component={Dashboard} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/signup"} component={Registration} />
          <Route exact path={"/adminsignup"} component={AdminRegistration} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

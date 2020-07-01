import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "../actions/index.js";
import Services from "../containers/Services";
import Landing from './Landing'
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
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

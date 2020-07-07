import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import axiosCalls from "../services/axiosCalls";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "../actions/index.js";
import Services from "./Services";
import Landing from "../components/Landing";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import AdminRegistration from "../components/auth/AdminRegistration";
import "../styles/App.css";

const App = () => {
  const user = useSelector((state) => state.loggedInStatus);

  const dispatch = useDispatch();

  const checkLoginSatus = () => {
    axiosCalls.checkLogged()
      .then((response) => {
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
      })
      .catch((error) => {});
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
          <Route exact path={"/dashboard"} component={(user.loggedInStatus === "LOGGED_IN" ?  Dashboard : Login )} />
          <Route exact path={"/login"} component={(user.loggedInStatus === "NOT_LOGGED_IN" ?  Login : Dashboard )} />
          <Route exact path={"/signup"} component={(user.loggedInStatus === "NOT_LOGGED_IN" ?  Registration : Dashboard )} />
          <Route exact path={"/adminsignup"} component={(user.loggedInStatus === "NOT_LOGGED_IN" ?  AdminRegistration : Dashboard )} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

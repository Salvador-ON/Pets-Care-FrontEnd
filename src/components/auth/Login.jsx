import React from "react";
import axiosCalls from "../../services/axiosCalls";
import NavBar from "../Navbar";
import Error from "../Error";
import "../../styles/Login.css";
import { useDispatch } from "react-redux";
import { LogIn } from "../../actions/index.js";
import { useHistory } from "react-router-dom";

const Registration = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const [userForm, useUserForm] = React.useState({
    email: "",
    password: "",
  });

  const [error, useError] = React.useState({
    value: false,
    data: "",
  });

  const SetError = (value, data) => {
    useError({
      value: value,
      data: data,
    });
  };

  const HandleForm = (e) => {
    useUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const { email, password } = userForm;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      SetError(true, "empty field");
      return;
    }

    axiosCalls.logIn(email, password )
      .then((response) => {
        if (response.data.logged_in === true) {
          dispatch(LogIn(response.data.user));
          history.push("/dashboard");
        } else {
          SetError(true, response.data.error);
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      <NavBar option={"login"} />
      <div className="float-right LoginContainer">
        <h1 className="LoginTile text-center">Sign In</h1>
        <h3 className="LoginSubTile text-center">
          Access your account to request and manage your appointments.
        </h3>

        <div className="d-flex mt-5">
          <form onSubmit={HandleSubmit} className="w-50 mx-2">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                onChange={HandleForm}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={HandleForm}
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                required
                minLength="6"
              />
            </div>

            <div>
              <button
                data-testid="SubmitLoginButton"
                type="submit"
                className="btnSubmit rounded-pill py-1 px-3 mr-3"
              >
                Submit
              </button>
              {error.value ? <Error error={error.data} /> : null}
            </div>
          </form>

          <div className="dogImageLoginContainer"></div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

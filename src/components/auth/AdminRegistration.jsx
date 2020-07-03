import React from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Error from "../Error";
import "../../styles/Registration.css";
import { useDispatch } from "react-redux";
import { LogIn } from "../../actions/index.js";
import { useHistory } from "react-router-dom";

const Registration = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const [userForm, useUserForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    token: "",
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

  const {
    email,
    password,
    passwordConfirmation,
    name,
    phone,
    token,
  } = userForm;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirmation.trim() === "" ||
      name.trim() === "" ||
      phone.trim() === "" ||
      token.trim() === ""
    ) {
      SetError(true, "empty field");
      return;
    } else if (password.length < 6) {
      SetError(true, "password need to have 6 characters");
      return;
    } else if (password !== passwordConfirmation) {
      SetError(true, "passwords don't match");
      return;
    } else {
      SetError(false, "");
    }

    axios
      .post(
        "http://pets-care-api.herokuapp.com/signup",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            phone: phone,
            name: name,
            token: token,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          dispatch(LogIn(response.data.user));
          history.push("/dashboard");
        } else if (response.data.hasOwnProperty("token")) {
          SetError(true, "invalid token");
        } else {
          const data = response.data.error;
          const keys = Object.keys(data);
          const errorMessage = keys.map((key) => {
            return key + " " + data[key].toString();
          });
          SetError(true, errorMessage);
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      <NavBar option={"signup"} />
      <div className="float-right SignupContainer">
        <h1 className="SignupTile text-center">Admin Registration</h1>

        <div className="d-flex">
          <form onSubmit={HandleSubmit} className="w-50 mx-2">
            <div className="form-group">
              <label htmlFor="token">Admin or Employe Token</label>
              <input
                onChange={HandleForm}
                type="password"
                className="form-control"
                id="token"
                name="token"
                value={token}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Name</label>
              <input
                onChange={HandleForm}
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                onChange={HandleForm}
                type="number"
                className="form-control"
                id="phone"
                name="phone"
                value={phone}
                required
              />
            </div>

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
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">
                Password Confirmation
              </label>
              <input
                onChange={HandleForm}
                type="password"
                className="form-control"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={passwordConfirmation}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="btnSubmit rounded-pill py-1 px-3 mr-3"
              >
                Submit
              </button>
              {error.value ? <Error error={error.data} /> : null}
            </div>
          </form>

          <div className="dogImageContainer"></div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

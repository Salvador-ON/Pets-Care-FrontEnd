import React from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Error from "../Error";
import "../../styles/Login.css";
import { useDispatch } from "react-redux";
import { LogIn } from "../../actions/index.js";
import { useHistory } from "react-router-dom";
import dogLap from "../../assets/dog_laptop.jpg";

const Registration = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const [userForm, useUserForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
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

  const ResetForm = () => {
    useUserForm({
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      phone: "",
    });
  };

  const { email, password, passwordConfirmation, name, phone } = userForm;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirmation.trim() === "" ||
      name.trim() === "" ||
      phone.trim() === ""
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
        "http://localhost:3001/signin",
        {
          user: {
            email: email,
            password: password,

          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);

        if (response.data.status === "created") {
          dispatch(LogIn(response.data.user));
          history.push("/dashboard");
        } else {
          // shoow error
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

      ResetForm();
    
  };

  return (
    <div>
      <NavBar option={"login"} />
      <div className="float-right LoginContainer">
        <h1 className="LoginTile text-center">Sign Up</h1>
        <h3 className="LoginSubTile text-center">
          Acces to your account to request and manage your appointments.
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
              />
            </div>
            
            <div>
              <button type="submit" className="btnSubmit rounded-pill py-1 px-3 mr-3">
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

import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LogIn } from "../../actions/index.js";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const [userForm, useUserForm] = React.useState({
    email: "",
    password: "",
  });

  const [error, useError] = React.useState(false);

  const SetError = (value) => {
    useError(value);
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
    });
  };

  const { email, password } = userForm;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      password.trim() === ""
    ) {
      SetError(true);
      return;
    }

    SetError(false);

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
        if (response.data.logged_in) {
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
      <form onSubmit={HandleSubmit} className="w-50">
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
        {error ? (
          <div className="alert alert-warning" role="alert">
            A field is empty!
          </div>
        ) : null}

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;

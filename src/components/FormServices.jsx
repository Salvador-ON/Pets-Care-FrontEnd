import React from "react";
import axios from "axios";
import Error from "./Error"
// import {useSelector} from 'react-redux'
// import { LogIn } from '../../actions/index.js'
// import { useHistory } from "react-router-dom";

const FormServices = ({ButtonSelected}) => {
  // let history = useHistory();

  // const dispatch = useDispatch();

  const [userForm, useUserForm] = React.useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const [userCheckForm, useUserCheckForm] = React.useState({
    "09:00": false,
    "10:00": false,
    "11:00": false,
    "12:00": false,
    "13:00": false,
    "14:00": false,
    "15:00": false,
    "16:00": false,
    "17:00": false,
    "18:00": false,
    "19:00": false,
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

  const HandleChecks = (e) => {
    useUserCheckForm({
      ...userCheckForm,
      [e.target.name]: e.target.checked,
    });
  };

  const ResetForm = () => {
    useUserForm({
      name: "",
      description: "",
      price: "",
      image_url: "",
    });
    useUserCheckForm({
      "09:00": false,
      "10:00": false,
      "11:00": false,
      "12:00": false,
      "13:00": false,
      "14:00": false,
      "15:00": false,
      "16:00": false,
      "17:00": false,
      "18:00": false,
      "19:00": false,
    });
  };

  const { name, description, price, image_url } = userForm;
  const hours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];
  const HandleSubmit = (e) => {
    e.preventDefault();
    const shedules = Object.keys(userCheckForm).filter(
      (e) => userCheckForm[e] === true
    );
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      price.trim() === "" ||
      image_url.trim() === ""
    ) {
      SetError(true ,"Empty field");
      return;
    }

    SetError(false, "");

    axios
      .post(
        "http://localhost:3001/services",
        {
          service: {
            name: name,
            description: description,
            price: price,
            image_url: image_url,
            schedule: shedules.toString(),
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          ButtonSelected("ser")
          // dispatch(LogIn(response.data.user))
          // history.push("/dashboard");
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
    <div className="w-50 ml-3">
      <h3 className="DashboardSubTile mt-2">New Services</h3>
      <form onSubmit={HandleSubmit}>
        <div className="form-group mb-1">
          <label htmlFor="exampleInputEmail1">Service name</label>
          <input
            onChange={HandleForm}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
            value={name}
            required
          />
        </div>

        <div className="form-group mb-1">
          <label htmlFor="exampleInputEmail1">Service price</label>
          <input
            onChange={HandleForm}
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="price"
            value={price}
            required
          />
        </div>

        <div className="form-group mb-1">
          <label htmlFor="exampleInputEmail1">Service Desciption</label>
          <input
            onChange={HandleForm}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="description"
            value={description}
            required
          />
        </div>

        <div className="form-group mb-1">
          <label htmlFor="exampleInputEmail1">Service image</label>
          <input
            onChange={HandleForm}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="image_url"
            value={image_url}
            required
          />
        </div>

        <div className="d-flex align-items-center flex-wrap">
          {hours.map((hour) => (
            <div key={hour} className="form-check mr-4">
              <input
                onChange={HandleChecks}
                name={hour}
                className="form-check-input"
                type="checkbox"
                value={hour}
                id={hour}
              />
              <label className="form-check-label" htmlFor={hour}>
                {hour}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="btnSubmit rounded-pill py-1 px-3 mr-3"
          >
            Submit
          </button>
          {error.value ? <Error error={error.data} /> : null}
        </div>
      </form>
    </div>
  );
};

export default FormServices;

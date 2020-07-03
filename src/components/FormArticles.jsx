import React from "react";
import axios from "axios";
// import {useSelector} from 'react-redux'
// import { LogIn } from '../../actions/index.js'
// import { useHistory } from "react-router-dom";

const FormArticles = ({ userID }) => {
  // let history = useHistory();

  // const dispatch = useDispatch();

  const [userForm, useUserForm] = React.useState({
    pet_name: "",
    date: "",
    time: ""
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
      pet_name: "",
      date: "",
      time: ""
    });
  };

  const { pet_name, date, time } = userForm;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (date.trim() === "" || 
        pet_name.trim() === ""|| 
       time.trim() === "") {
      SetError(true);
      return;
    }

    SetError(false);

    axios
      .post(
        "http://localhost:3001/appointments",
        {
          appointment: {
            date: date,
            time: "11:00",
            service_id: 1,
            pet_name: pet_name,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          // add message success
        } else {
          // shoow error
        }

      })
      .catch((error) => {
      });

    ResetForm();
  };

  return (
    <div>
      <h1>New Articles</h1>
      <form onSubmit={HandleSubmit} className="w-50">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Pet name</label>
          <input
            onChange={HandleForm}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="pet_name"
            value={pet_name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">date</label>
          <input
            onChange={HandleForm}
            type="date"
            className="form-control"
            id="password"
            name="date"
            value={date}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">time</label>
          <input
            onChange={HandleForm}
            type="time"
            className="form-control"
            id="time"
            name="time"
            value={time}
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

export default FormArticles;

import React from "react";
import axios from "axios";
import Error from "./Error";
import { storage } from "./firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const FormServices = ({ ButtonSelected }) => {
  const [userForm, useUserForm] = React.useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const [image, useImage] = React.useState(null);
  const [url, useUrl] = React.useState("");
  const [progress, useProgress] = React.useState(0);
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

  const SetImage = (data) => {
    useImage(data);
  };

  const SetUrl = (data) => {
    useUrl(data);
  };

  const SetProgress = (data) => {
    useProgress(data);
  };

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

  const { name, description, price } = userForm;
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

  const handChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        SetError(false, "");
        SetImage(file);
      } else {
        SetError(true, "Please select an image to upload");
      }
    }
  };

  const handleUpdate = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          SetProgress(progress);
        },
        (error) => {
          SetError(true, error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              SetUrl(url);
              // SetProgress(0);
            });
        }
      );
    } else {
      SetError(true, "Error please choose an image to upload");
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const shedules = Object.keys(userCheckForm).filter(
      (e) => userCheckForm[e] === true
    );
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      price.trim() === "" ||
      url.trim() === ""
    ) {
      SetError(true, "Empty field");
      return;
    }

    SetError(false, "");

    axios
      .post(
        "https://pets-care-api.herokuapp.com/services",
        {
          service: {
            name: name,
            description: description,
            price: price,
            image_url: url,
            schedule: shedules.toString(),
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          ButtonSelected("ser");
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="w-75 ml-3">
      <h3 className="DashboardSubTile mt-2">New Services</h3>

      <form onSubmit={HandleSubmit}>
        <div className="form-group mb-1">
          <label htmlFor="serviceName">Service name</label>
          <input
            onChange={HandleForm}
            type="text"
            className="form-control"
            id="serviceName"
            aria-describedby="serviceName"
            name="name"
            value={name}
            required
          />
        </div>

        <div className="form-group mb-1">
          <label htmlFor="servicePrice">Service price</label>
          <input
            onChange={HandleForm}
            type="number"
            className="form-control"
            id="servicePrice"
            aria-describedby="servicePrice"
            name="price"
            value={price}
            required
          />
        </div>

        <div className="form-group mb-1">
          <label htmlFor="serviceDescription">Service Desciption</label>
          <input
            onChange={HandleForm}
            type="text"
            className="form-control"
            id="serviceDescription"
            aria-describedby="serviceDescription"
            name="description"
            value={description}
            required
          />
        </div>

        <div className="form-group mt-2 mb-1">
          <label htmlFor="upload" className="mr-2">
            Upload image
          </label>
          <input id="upload" type="file" onChange={handChange} />
          {progress === 0 ? (
            <button
              type="button"
              onClick={handleUpdate}
              className="btnSubmit rounded-pill py-1 px-3 ml-3"
            >
              Upload
            </button>
          ) : url.length === 0 ? (
            <span>Please wait</span>
          ) : null}
        </div>

        <div className="form-group mb-1">
          <label htmlFor="uploadField">
            Url uploaded image{" "}
            {url.length > 0 ? (
              <FontAwesomeIcon icon={faCheckCircle} className=" text-success" />
            ) : null}
          </label>
          <input
            onChange={HandleForm}
            type="text"
            className="form-control"
            id="uploadField"
            aria-describedby="uploadField"
            name="image_url"
            value={url}
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

FormServices.propTypes = {
  ButtonSelected: PropTypes.func.isRequired,
};

export default FormServices;

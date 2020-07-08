import React from "react";
import axiosCalls from "../services/axiosCalls";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import utilities from "../utils/utilities";

const ServiceShow = ({ serviceOpen, ResetSetService, user }) => {
  let history = useHistory();
  const [show, setShow] = React.useState(false);
  const [availables, useAvailables] = React.useState([]);

  const SetAvailables = (data) => {
    useAvailables(data);
  };

  const ResetAvailables = () => {
    useAvailables([]);
  };

  const handleShow = () => {
    ResetForm();
    setShow(true);
  };

  const [userForm, useUserForm] = React.useState({
    pet_name: "",
    date: "",
    time: "",
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
      time: "",
    });
    ResetAvailables();
  };

  const handleClose = () => {
    setShow(false);
  };

  const { pet_name, date, time } = userForm;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (date.trim() === "" || pet_name.trim() === "" || time.trim() === "") {
      SetError(true);
      return;
    }

    SetError(false);

    axiosCalls.FormAppoinments(date, time, serviceOpen, pet_name  )
      .then((response) => {
        if (response.data.status === "created") {
          handleClose();
          history.push("/dashboard");
        } else {
          // shoow error
        }
      })
      .catch((error) => {});
  };

  const getAppointments = (valueDate) => {
    axiosCalls.AvailableHours(serviceOpen, valueDate)
      .then((response) => {
        SetAvailables(response.data.appointments);
      })
      .catch((error) => {});
  };

  const handleDate = (e) => {
    HandleForm(e);
    getAppointments(e.target.value);
  };

  return (
    <div className="float-right ServicesContainer">
      <div className="d-flex justify-content-center imageShow flex-sm-row flex-column">
        <div className=" order-2 order-sm-1 col-12 mx-2 col-sm-7 mx-sm-2 d-flex justify-content-center">
          <div
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              height: "80vh",
              width: "80vh",
              backgroundImage: `url(${serviceOpen.data.image_url})`,
            }}
          ></div>
        </div>
        <div className="order-1 order-sm-2 col-12 mx-2 col-sm-4 mx-sm-2">
          <h1 className="text-capitalize font-weight-bold text-center text-sm-right">
            {serviceOpen.data.name}
          </h1>
          <ul class="list-group">
            <li class="list-group-item list-group-item-secondary">
              <span className="h6 font-weight-bold mr-3">Description:</span>
            </li>
            <li class="list-group-item text-capitalize">
              {serviceOpen.data.description}
            </li>
            <li class="list-group-item list-group-item-secondary">
              <span className="h6 font-weight-bold">Price:</span>{" "}
              <span className="ml-2">${serviceOpen.data.price}</span>{" "}
            </li>
          </ul>

          <div className="mt-3 mt-sm-5 d-flex justify-content-center">
            {user.loggedInStatus !== "LOGGED_IN" ? (
              <h6 className="text-center mt-1">
                Log In or Sign Up to request an appointment
              </h6>
            ) : (
              <button
                className="btn btn-success btn-lg rounded-pill"
                onClick={handleShow}
              >
                {" "}
                <FontAwesomeIcon icon={faCalendarCheck} className={"mr-2"} />
                Request an Appointment
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="paginationButCont">
        <button
          onClick={() => {
            ResetSetService();
          }}
          className="buttonPagination btl float-left"
        >
          <FontAwesomeIcon icon={faChevronLeft} className={"fa-2x"} />
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <span className="text-capitalize">
              {serviceOpen.data.name}
            </span>{" "}
            Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={HandleSubmit} className="w-100">
            <div className="form-group">
              <label htmlFor="petname">Pet name</label>
              <input
                onChange={HandleForm}
                type="text"
                className="form-control"
                id="petname"
                aria-describedby="emailHelp"
                name="pet_name"
                value={pet_name}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                onChange={handleDate}
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date}
                required
                min={utilities.tomorrowDate()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Available hours</label>
              <select
                onChange={HandleForm}
                id="time"
                class="form-control"
                value={time}
                name="time"
                required
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                {availables.map((available) => (
                  <option key={available}>{available}</option>
                ))}
              </select>
            </div>

            {error ? (
              <div className="alert alert-warning" role="alert">
                A field is empty!
              </div>
            ) : null}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={HandleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ServiceShow.propTypes = {
  user: PropTypes.object.isRequired,
  ResetSetService: PropTypes.func.isRequired,
  serviceOpen: PropTypes.object.isRequired,
};
export default ServiceShow;

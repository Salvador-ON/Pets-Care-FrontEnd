import React from "react";
import axiosCalls from "../services/axiosCalls";
import utilities from "../utils/utilities"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/UserAppointments.css";
const UserAppointments = () => {
  const [appoList, setAppoList] = React.useState([]);
  const [appointmentPast, setAppointmentPast] = React.useState(false);

  const SetAppointmenstPast = (value) => {
    setAppointmentPast(value);
  };

  const SetAppoList = (data) => {
    setAppoList(data);
  };

  const getAppointments = () => {
    axiosCalls.myAppointments()
      .then((response) => {
        SetAppoList(response.data.appointments);
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    getAppointments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleForm = (e) => {
    SetAppointmenstPast(e.target.checked);
  };

  const deleteAppointment = (value) => {
    axiosCalls.deleteAppoinment(value)
      .then((response) => {
        getAppointments();
      })
      .catch((error) => {});
  };
  return (
    <div className="ServiceList mt-2 mr-2">
      <h4 className="mb-0">
        {" "}
        {!appointmentPast
          ? "Requested Appointments"
          : "Previous Appointments"}{" "}
      </h4>

      <div className="d-flex align-items-center">
        <span>Previous Appointments</span>
        <label className="switch mb-0 ml-2">
          <input type="checkbox" onClick={handleForm} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"># ID</th>
            <th scope="col">Date</th>
            <th scope="col">Hour</th>
            <th scope="col">Pet Name</th>
            <th scope="col">Service</th>
            {!appointmentPast ? <th scope="col">Delete</th> : null}
          </tr>
        </thead>
        <tbody>
          {(!appointmentPast ? utilities.futureAppointments(appoList) : utilities.pastAppointments(appoList)).map(
            (appo) => (
              <tr key={appo.id}>
                <td>{appo.id}</td>
                <td>{appo.date}</td>
                <td>{appo.time.split("T")[1].split(".")[0]}</td>
                <td>{appo.pet_name}</td>
                <td>{appo.service_name}</td>
                {!appointmentPast ? (
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteAppointment(appo.id)}
                      className="fa-2x text-danger trashCan"
                    />
                  </td>
                ) : null}
              </tr>
            )
          )}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default UserAppointments;

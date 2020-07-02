import React from "react";
import axios from "axios";
import ClientButtons from "./ClientButtons.jsx";
import '../styles/UserAppointments.css'
const UserAppointments = () => {

  const [appoList, useAppoList] = React.useState([]);
  const [appointmentPast, useAppointmentPast] = React.useState(false);

  const SetAppointmenstPast = (value) => {
    useAppointmentPast(value)
  }

  const handleForm = (e) => {
    SetAppointmenstPast(e.target.checked)
  }

  const SetAppoList = (data) => {
    useAppoList(data);
  };

  const getAppointments = () => {
    axios
      .get("http://localhost:3001/appointments", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.appointments);
        SetAppoList(response.data.appointments);
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    getAppointments();
  }, []);
  return (
    <div className="ServiceList mt-2">
      
  <h4 className="mb-0"> { !appointmentPast? "Requested Appointments": "Previous Appointments" } </h4>

      <div className="d-flex align-items-center">
        <span>Previous Appointments</span>
        <label className="switch mb-0 ml-2">
          <input type="checkbox" onClick={handleForm}/>
          <span className="slider round"></span>
        </label>
      
      </div>
      

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"># ID</th>
            <th scope="col">Date</th>
            <th scope="col">Hour</th>
            <th scope="col">Pet Name</th>
            <th scope="col">Service</th>
            { !appointmentPast? <th scope="col">Delete</th>: null }
            
          </tr>
        </thead>
        <tbody>
          {appoList.map((appo) => (
            <tr key={appo.id}>
              <td>{appo.id}</td>
              <td>{appo.date}</td>
              <td>{appo.time.split("T")[1].split(".")[0]}</td>
              <td>{appo.pet_name}</td>
              <td>{appo.service_name}</td>
              { !appointmentPast? <td>delete</td>: null }
              
              {/* <td><FontAwesomeIcon icon={faTrash} onClick={() => deleteServices(service.id)} className="fa-2x text-danger trashCan"/></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAppointments;

import React from "react";
import axios from "axios";

const AppointmentsEmployes = () => {
  const [serviceList, useServiceList] = React.useState([]);

  const dateToday = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  const [dateSearch, useDateSearch] = React.useState(dateToday());

  
  const SetServiceList = (data) => {
    useServiceList(data);
  };

  

  const getAppointments = () => {
    axios
      .get(("http://localhost:3001/dashboard?date="+dateSearch), {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data_appointments)
        SetServiceList(response.data.data_appointments);
      })
      .catch((error) => {
      });
  };

  const SetDate = (e) => {
    useDateSearch(e.target.value)
    
  }

  

  React.useEffect(() => {
    getAppointments();
    
  }, [dateSearch]);

  

  
  return (
    
    <div className="ServiceList mt-4">
      <div className="form-group">
        <label htmlFor="date">Appointments Date: </label>
      <input onChange={SetDate} type="date" className="form-control" id="date" value={dateSearch}/>
      </div>
      {serviceList.map((service, index) => (
        <div key={index}className="serviceTable">
          <h4>{service.service}</h4> 
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"># ID</th>
              <th scope="col">Date</th>
              <th scope="col">Hour</th>
              <th scope="col">Name</th>
              <th scope="col">Pet Name</th>
            </tr>
          </thead>
          <tbody>
            {service.appointments.map((apointment) => (
              <tr key={apointment.id}>
                <td>{apointment.id}</td>
                <td>{apointment.date}</td>
                <td>{apointment.time}</td>
                <td>{apointment.name}</td>
                <td>{apointment.pet_name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      ))}
      
    </div>
  )}
// availables?service_id=1&date=2020-06-28
 
export default AppointmentsEmployes;
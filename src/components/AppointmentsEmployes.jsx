import React from "react";
import axios from "axios";

const AppointmentsEmployes = () => {
  const [serviceList, useServiceList] = React.useState([]);

  const SetServiceList = (data) => {
    useServiceList(data);
  };

  const getServices = () => {
    axios
      .get("http://localhost:3001/dashboard?date=2020-06-28", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data_appointments)
        SetServiceList(response.data.data_appointments);
      })
      .catch((error) => {
      });
  };

  const deleteServices = (value) => {
    axios
      .delete("http://localhost:3001/services/"+`${value}`, {
        withCredentials: true,
      })
      .then((response) => {
        getServices();
      })
      .catch((error) => {
      });
  };

  React.useEffect(() => {
    getServices();
  }, []);

  
  return (
    
    <div className="ServiceList mt-2">
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
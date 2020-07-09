import React from "react";
import axiosCalls from "../services/axiosCalls";
import "../styles/ServiceList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ServicesList = () => {
  const [serviceList, useServiceList] = React.useState([]);

  const SetServiceList = (data) => {
    useServiceList(data);
  };

  const getServices = () => {
    axiosCalls.showServices()
      .then((response) => {
        SetServiceList(response.data.services);
      })
      .catch((error) => {});
  };

  const deleteServices = (value) => {
    axiosCalls.deleteService(value)
      .then((response) => {
        getServices();
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    getServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //
  return (
    <div className="ServiceList mt-2">
      <h4>Services</h4>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"># ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {serviceList.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <td>{service.description}</td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteServices(service.id)}
                  className="fa-2x text-danger trashCan"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesList;

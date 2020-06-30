import React from "react";
import axios from "axios";

const Services = () => {

  const getServices = () => {
    axios
      .get("http://localhost:3001/services", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });}
  // const art = getArticles();
  return (
    <div>
      <h3>services</h3>
      <button onClick={getServices}className="btn btn-success">get services</button>
    </div>
  )
};

export default Services;

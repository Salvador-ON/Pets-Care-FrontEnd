import React from "react";
import axios from "axios";

const Articles = () => {

  const getArticles = () => {
    console.log("hey")
    axios
      .get("http://localhost:3001/appointments", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });}
  // const art = getArticles(); availables?service_id=1&date=2020-06-28
  return (
    <div>
      <h3>articles</h3>
      <button onClick={getArticles}className="btn btn-success">get appointments</button>
    </div>
  )
};

export default Articles;

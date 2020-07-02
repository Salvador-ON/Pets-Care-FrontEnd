import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const AdminButtons = ({ButtonSelected}) => {
  const user = useSelector((state) => state.loggedInStatus);
  
  return (
    <div className="d-flex mt-3 justify-content-around">
      <button type="button" className="btn btn-success btn-lg px-4" onClick={() => {ButtonSelected("aps")}}>Appointments</button>

      { user.user.role === "admin" ? 
      <React.Fragment>
        <button type="button" className="btn btn-info btn-lg px-4" onClick={() => {ButtonSelected("ser")}}>Services</button> 
        <button type="button" className="btn btn-warning btn-lg px-4" onClick={() => {ButtonSelected("ads")}}>Add Services</button> 
      </React.Fragment>
      : null}
      
      

      <button type="button" className="btn btn-secondary btn-lg px-4" onClick={() => {ButtonSelected("map")}}>My Appointments</button>
    </div>
    );
}
 
export default AdminButtons;
import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const AdminButtons = ({ButtonSelected}) => {
  const user = useSelector((state) => state.loggedInStatus);
  
  return (
    <div className="d-flex mt-3 justify-content-around flex-column flex-sm-row mx-2 mx-sm-0">
      <button data-testid="appoints" type="button" className="btn btn-success btn-lg px-4" onClick={() => {ButtonSelected("aps")}}>Appointments</button>

      { user.user.role === "admin" ? 
      <React.Fragment>
        <button type="button" data-testid="ServiceAdmin" className="btn btn-info btn-lg px-4" onClick={() => {ButtonSelected("ser")}}>Services</button> 
        <button type="button" data-testid="ServiceAdd" className="btn btn-warning btn-lg px-4" onClick={() => {ButtonSelected("ads")}}>Add Services</button> 
      </React.Fragment>
      : null}
      
      

      <button type="button" data-testid="Mappoints" className="btn btn-secondary btn-lg px-4" onClick={() => {ButtonSelected("map")}}>My Appointments</button>
    </div>
    );
}

AdminButtons.propTypes = {
  ButtonSelected: PropTypes.func.isRequired,
};
 
export default AdminButtons;
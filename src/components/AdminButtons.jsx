import React from 'react';

const AdminButtons = ({buttonSelected}) => {
  return (
    <div className="d-flex mt-3 justify-content-around">
      <button type="button" className="btn btn-success btn-lg px-4" onClick={() => {buttonSelected("aps")}}>Appointments</button>
      <button type="button" className="btn btn-info btn-lg px-4" onClick={() => {buttonSelected("ser")}}>Services</button>
      <button type="button" className="btn btn-warning btn-lg px-4" onClick={() => {buttonSelected("ads")}}>Add Services</button>
      <button type="button" className="btn btn-secondary btn-lg px-4" onClick={() => {buttonSelected("map")}}>My Appointments</button>
    </div>
    );
}
 
export default AdminButtons;
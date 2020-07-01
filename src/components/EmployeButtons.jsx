import React from 'react';

const EmployeButtons = () => {
  return (
    <div className="d-flex mt-5 justify-content-around">
      <button type="button" className="btn btn-success btn-lg px-5">Appointments Requested</button>
      <button type="button" className="btn btn-secondary btn-lg px-5">Past Appointments</button>
    </div>
    );
}
 
export default EmployeButtons;
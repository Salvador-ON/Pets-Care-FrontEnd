import React from 'react';

const ClientButtons = () => {
  return (
    <div className="d-flex mt-5 justify-content-around">
      <button type="button" className="btn btn-success btn-lg px-5"> Requested Appointments</button>
      <button type="button" className="btn btn-secondary btn-lg px-5">Previous Appointments</button>
    </div>
    );
}
 
export default ClientButtons;
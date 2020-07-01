import React from 'react';

const Error = ({error}) => {
  return (
    <span className="alert alert-danger mt-2 py-2" role="alert">
      {error}
    </span>
    );
}
 
export default Error;
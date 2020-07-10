import React from 'react';
import PropTypes from 'prop-types';

const Error = ({error}) => {
  return (
    <span className="alert alert-danger mt-2 py-2" role="alert">
      {error}
    </span>
    );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
 
export default Error;


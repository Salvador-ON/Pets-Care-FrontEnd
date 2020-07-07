import axios from 'axios';

const ApposDashboard = dateSearch => (
  axios.get(`https://pets-care-api.herokuapp.com/dashboard?date=${dateSearch}`, {
    withCredentials: true,
  }));

const axiosCalls = {
  ApposDashboard,
};

export default axiosCalls;

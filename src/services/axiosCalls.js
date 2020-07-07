import axios from 'axios';

const ApposDashboard = dateSearch => (
  axios.get(`https://pets-care-api.herokuapp.com/dashboard?date=${dateSearch}`, {
    withCredentials: true,
  }));

const FormServices = (name, description, price, url, shedules) => (
  axios
    .post(
      'https://pets-care-api.herokuapp.com/services',
      {
        service: {
          name,
          description,
          price,
          image_url: url,
          schedule: shedules.toString(),
        },
      },
      { withCredentials: true },
    )
);

const Logout = () => (
  axios
    .delete('https://pets-care-api.herokuapp.com/logout', {
      withCredentials: true,
    })
);

const FormAppoinments = (date, time, serviceOpen, petName) => (
  axios
    .post(
      'https://pets-care-api.herokuapp.com/appointments',
      {
        appointment: {
          date,
          time,
          service_id: serviceOpen.data.id,
          pet_name: petName,
        },
      },
      { withCredentials: true },
    )
);

const AvailableHours = (serviceOpen, valueDate) => (
  axios
    .get(
      `https://pets-care-api.herokuapp.com/availables?service_id=${
        serviceOpen.data.id
      }&date=${
        valueDate}`,
      {
        withCredentials: true,
      },
    )
);

const showServices = () => (
  axios
    .get('https://pets-care-api.herokuapp.com/services', {
      withCredentials: true,
    })
);

const deleteService = value => (
  axios
    .delete(`https://pets-care-api.herokuapp.com/services/${value}`, {
      withCredentials: true,
    })
);

const myAppointments = () => (
  axios
    .get('https://pets-care-api.herokuapp.com/appointments', {
      withCredentials: true,
    })
);

const deleteAppoinment = value => (
  axios
    .delete(`https://pets-care-api.herokuapp.com/appointments/${value}`, {
      withCredentials: true,
    })
);

const adminSignUp = (email, password, passwordConfirmation, phone, name, token) => (
  axios
    .post(
      'https://pets-care-api.herokuapp.com/signup',
      {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
          phone,
          name,
          token,
        },
      },
      { withCredentials: true },
    )
);

const logIn = (email, password) => (
  axios
    .post(
      'https://pets-care-api.herokuapp.com/signin',
      {
        user: {
          email,
          password,
        },
      },
      { withCredentials: true },
    )
);

const signUp = (email, password, passwordConfirmation, phone, name) => (
  axios
    .post(
      'https://pets-care-api.herokuapp.com/signup',
      {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
          phone,
          name,
          token: '',
        },
      },
      { withCredentials: true },
    )
);

const checkLogged = () => (
  axios
    .get('https://pets-care-api.herokuapp.com/logged_in', {
      withCredentials: true,
    })
);

const axiosCalls = {
  ApposDashboard,
  FormServices,
  Logout,
  FormAppoinments,
  AvailableHours,
  showServices,
  deleteService,
  myAppointments,
  deleteAppoinment,
  adminSignUp,
  logIn,
  signUp,
  checkLogged,
};

export default axiosCalls;

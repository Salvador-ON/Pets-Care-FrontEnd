const user = {
  loggedInStatus: 'NOT_LOGGED_IN',
  user: {},
};

const loggedInStatus = (state = user, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        loggedInStatus: 'LOGGED_IN',
        user: action.payload,
      };
    case 'LOG_OUT':
      return {
        loggedInStatus: 'NOT_LOGGED_IN',
        user: {},
      };
    default:
      return state;
  }
};

export default loggedInStatus;

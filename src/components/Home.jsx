import React from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.loggedInStatus);
  return (
    <div>
      {user.loggedInStatus === "NOT_LOGGED_IN" ? <h1>You are not Logged In </h1> : null}
      {user.loggedInStatus === "LOGGED_IN" ? <h1>Welcome {user.user.name}</h1> : null}
      <h1>Sign up</h1>
      <Registration/>
      <h1>Log in</h1>
      <Login/>
    </div>
    );
}
 
export default Home;
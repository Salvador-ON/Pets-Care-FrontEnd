import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import {Link} from 'react-router-dom'
import '../styles/Landing.css';
const Landing = () => {


  

  return (
    <div className="LandingWrap pt-2 ">
      <Menu>
      <Link className="butt" to='/services'>
        <span  className="my-2 butt">Services</span>
      </Link>
        <a  className="my-2 butt">Values</a>
        <a  className="my-2 butt">Dashboard</a>
        <a  className="my-2 butt">Sign Up</a>
        <a  className="my-2 butt">Log In</a>
        <a  className="my-2 butt">Log Out</a>
      </Menu>

      <div className="LogoImage"></div>
      
      <div className="DogVetImage"></div>
      <h1 className=" mb-2 text-white LandingTitle text-center">Taking care of your loved ones.</h1>
      <div className="mt-5 mb-1 mt-md-5 mt-lg-4 pb-3 mx-auto text-center">
      <Link to='/services'>
        <span type="button" className="btn btn-light rounded-pill btn-lg">Services</span>
      </Link>
      </div>
    </div>
    );
}
 
export default Landing;
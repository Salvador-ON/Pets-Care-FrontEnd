import React from 'react';
import {Link} from 'react-router-dom'
import '../styles/Landing.css';
import HidenNav from './HidenNav';
const Landing = () => {

  return (
    <div className="LandingWrap pt-2 ">
      <HidenNav className="d-none"/>

      <div className="LogoImage"></div>
      
      <div className="DogVetImage"></div>
      <h1 className=" mb-2 text-white LandingTitle text-center">Taking care of your loved ones.</h1>
      <div className="mt-5 mb-1 mt-md-5 mt-lg-4 pb-3 mx-auto text-center">
      <Link to='/services'>
        <span type="button" data-testid="ServiceButton" className="btn btn-light rounded-pill btn-lg">Services</span>
      </Link>
      </div>
    </div>
    );
}
 
export default Landing;
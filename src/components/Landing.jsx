import React from 'react';
import logosmall from '../assets/logosmall.png'

const Landing = () => {
  return (
    <div className="LandingWrap pt-2 ">
      <div className="LogoImage"></div>
      
      <div className="DogVetImage"></div>
      <h1 className=" mb-2 text-white LandingTitle text-center">Taking care of your loved ones.</h1>
      <div className="mt-5 mb-1 mt-md-5 mt-lg-4 pb-3 mx-auto text-center"><a type="button" className="btn btn-light rounded-pill btn-lg">Services</a></div>
    </div>
    );
}
 
export default Landing;
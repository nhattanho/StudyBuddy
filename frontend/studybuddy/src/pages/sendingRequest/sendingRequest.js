import React from "react";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeCheckLogin } from "../../redux/redux";
import Placeholder from './placeholder.png'
import './sendingRequest.css';

const SendingRequest = (props) => {
  const checkLogin = useSelector((state) => state.checkLogin);
  const dispatch = useDispatch();

  const setLogout = () => {
    dispatch(storeCheckLogin(false));
  };

  
  return (
    <div>
      <div className='background'>
        <h1 className='name'>
        	Joe Bruin
        </h1>
        <img src={Placeholder} alt='Profile Pic' 
            style={{ height : '250px', width : '250px', borderRadius : '25px', marginTop: '50px' }} />
        <div className='info'>
          <div style={{ position: 'absolute', marginRight: '60%', marginTop: '115px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color : 'white', fontSize : '30px', textShadow: '2px 2px rgba(58, 61, 224, 1)' }}>
            About Me
          </div>
          <h2 className='aboutMe'>
        	 Hey! I'm looking for a study partner for my CS classes and thought making an account on here would be a great way to do so. I'm very flexible with my schedule!
          </h2>
        </div>
        <div className='info'>
          <div className='label'>
            Major
          </div>
          <h3 className='major'>
        	 Computer Science
          </h3>
        </div>
        <div className='info'>
          <div className='label'>
            Year
          </div>
          <h3 className='year'>
        	 2022
          </h3>
        </div>
        <div className='info'>
          <div className='label'>
            Classes
          </div>
          <h3 className='classes'>
        	 CS130 CS143 CS118
          </h3>
        </div>
        <button className="request" onClick={() => { }} 
            style={{ height : '50px', width : '120px', marginTop: '25px', borderWidth: '0px', color : '#2fa13a' }}>
            Request!
        </button>
      </div>
    </div>
  );
};

export default SendingRequest;
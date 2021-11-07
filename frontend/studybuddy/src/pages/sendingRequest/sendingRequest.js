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
        	Name
        </h1>
        <img src={Placeholder} alt='Profile Pic' 
            style={{ height : '250px', width : '250px', borderRadius : '25px', marginTop: '25px' }} />
        <h2 className='aboutMe'>
        	About Me
        </h2>
        <h3 className='major'>
        	Major
        </h3>
        <h3 className='year'>
        	Year
        </h3>
        <h3 className='classes'>
        	Classes
        </h3>
        <button className="request" onClick={() => { }} 
            style={{ height : '50px', width : '120px', marginTop: '25px', borderWidth: '0px', color : '#2fa13a' }}>
            Request!
        </button>
      </div>
    </div>
  );
};

export default SendingRequest;
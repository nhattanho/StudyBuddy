import React from "react";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeCheckLogin } from "../../redux/redux";
import {customStyles, InputField, useStyles} from "../home/styles";
import {Typography, Button, Grid, Box} from '@material-ui/core';
import Placeholder from './placeholder.png'
import './sendingRequest.css';
import RequestPopupPage from '../requestPopup/RequestPopupPage.js';

const Popup = (props) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <h1 style={{ 'color' : '#ffffff' }}> Send a Request </h1>
          <RequestPopupPage/>
        <Button variant="contained" color="primary" style={{ height : '30px', width : '100px', 'marginTop' : '50px' }} onClick={props.closePopup}>
          Done
        </Button>
      </div>
    </div>
  );
}

const SendingRequest = (props) => {
  
  const dispatch = useDispatch();

  const userinformation = useSelector((state) => state);
  const checkLogin = userinformation.checkLogin; 
  const email = userinformation.email;
  
  const classes = useStyles();

  const setLogout = () => {
    dispatch(storeCheckLogin(false));
  };

  const [requesting, setRequesting] = React.useState(false);

  const sendRequest = () => {
    setRequesting(true);
  };

  const closeRequest = () => {
    setRequesting(false);
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
        <div className={classes.parentButton}>
          <div className={classes.button}>
            <Button variant="contained" color="primary" onClick={sendRequest}>
              Request!
            </Button>
          </div>
        </div>
      </div>
      {requesting ? 
        <Popup
          text='Create a Goal'
          closePopup={closeRequest}
        />
        : null
      }
    </div>
  );
};

export default SendingRequest;
import React from "react";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeCheckLogin } from "../../redux/redux";
import {customStyles, InputField, useStyles} from "../home/styles";
import {Typography, Button, Grid, Box} from '@material-ui/core';
import { PrimaryButton } from "../../components/button/button";
import Placeholder from './placeholder.png'
import './sendingRequest.css';

const SendingRequest = (props) => {
  const checkLogin = useSelector((state) => state.checkLogin);
  const dispatch = useDispatch();

  const classes = useStyles();

  const setLogout = () => {
    dispatch(storeCheckLogin(false));
  };

  const sendRequest = () => {

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
          <div style={{ position: 'absolute', marginRight: '60%', marginTop: '115px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color : '#6157BB', fontSize : '30px'}}>
            <Typography variant="h4">About Me</Typography>
          </div>
          <h2 className='aboutMe'>
        	   <Typography variant="body">Hey! I'm looking for a study partner for my CS classes and thought making an account on here would be a great way to do so. I'm very flexible with my schedule!</Typography>
          </h2>
        </div>
        <div className='info'>
          <div className='label'>
            <Typography variant="h4">Major</Typography>
          </div>
          <h3 className='major'>
        	 <Typography variant="body">Computer Science</Typography>
          </h3>
        </div>
        <div className='info'>
          <div className='label'>
            <Typography variant="h4">Year</Typography>
          </div>
          <h3 className='year'>
        	 <Typography variant="body">2022</Typography>
          </h3>
        </div>
        <div className='info'>
          <div className='label'>
            <Typography variant="h4">Classes</Typography>
          </div>
          <h3 className='classes'>
        	 <Typography variant="body">CS130 CS143 CS118</Typography>
          </h3>
        </div>
        <div className={classes.parentButton}>
          <div className={classes.button}>
            <PrimaryButton text="Request!" onClick={sendRequest} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendingRequest;
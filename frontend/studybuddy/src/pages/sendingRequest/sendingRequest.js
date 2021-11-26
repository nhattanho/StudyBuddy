import React from "react";
import axios from "axios";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeCheckLogin } from "../../redux/redux";
import {customStyles, InputField, useStyles} from "../home/styles";
import {Typography, Button, Grid, Box} from '@material-ui/core';
import { PrimaryButton } from "../../components/button/button";
import Placeholder from './placeholder.png'
import './sendingRequest.css';
import RequestPopupPage from '../requestPopup/RequestPopupPage.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendingRequest = (props) => {
  
  const dispatch = useDispatch();

  const userinformation = useSelector((state) => state);
  const checkLogin = userinformation.checkLogin; 
  const currentUserObjectId = userinformation.id;
  const currentRecipientObjectId = props.match.params['objectID'];

  const classes = useStyles();

  const setLogout = () => {
    dispatch(storeCheckLogin(false));
  };

  const [info, setInfo] = React.useState(false);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [major, setMajor] = React.useState('');
  const [year, setYear] = React.useState('');
  const [courses, setCourses] = React.useState([]);

  const handleInfo = () => {
    setInfo(true);
  };

  const handleName = (name) => {
    setName(name);
  };
   
  const handleAbout = (about) => {
    setAbout(about);
  };

  const handleMajor = (major) => {
    setMajor(major);
  };

  const handleYear = (year) => {
    setYear(year);
  };

  const handleCourses = (courses) => {
    const newCourses = courses.map(course => course + ' ');
    setCourses(newCourses);
  }; 

  const notify = (success, res) => {
    if (success) {
      toast.success(res, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(res, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (!info) {
    axios
      .get(`http://localhost:5000/user/${currentRecipientObjectId}`)
      .then((res) => {
        if (res.data.success) {
          console.log(`Axios success: ${res.data}`);
          if(res.data.user.hasOwnProperty('name') && res.data.user.name != null) {
            handleName(res.data.user.name);
          }
          if(res.data.user.hasOwnProperty('about') && res.data.user.about != null) {
            handleAbout(res.data.user.about);
          }
          if(res.data.user.hasOwnProperty('major') && res.data.user.major != null) {
            setMajor(res.data.user.major);
          }
          if(res.data.user.hasOwnProperty('year') && res.data.user.year != null) {
            handleYear(res.data.user.year);
          }
          if(res.data.user.hasOwnProperty('classes') && res.data.user.classes != null) {
            handleCourses(res.data.user.classes);
          }
          handleInfo();
        } else {
          console.log('Failure for retrieving recipient info from API');
        }
      })
      .catch((err) => {
        notify(false, 'Couldn\'t retrieve this buddy\'s info!');
        console.log(err);
      });
  }

  return (
    <div>
      <ToastContainer />
      <div className='background'>
        <h1 className='name'>
        	{name}
        </h1>
        <img src={Placeholder} alt='Profile Pic' 
            style={{ height : '250px', width : '250px', borderRadius : '25px', marginTop: '50px' }} />
        <div className='info'>
          <div style={{ position: 'absolute', marginRight: '60%', marginTop: '115px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color : '#6157BB', fontSize : '30px'}}>
            <Typography variant="h4">About Me</Typography>
          </div>
          <h2 className='aboutMe'>
        	   <Typography variant="body">{about}</Typography>
          </h2>
        </div>
        <div className='info'>
          <div className='label'>
            <Typography variant="h4">Major</Typography>
          </div>
          <h3 className='major'>
        	 <Typography variant="body">{major}</Typography>
          </h3>
        </div>
        <div className='info'>
          <div className='label'>
            <Typography variant="h4">Year</Typography>
          </div>
          <h3 className='year'>
        	 <Typography variant="body">{year}</Typography>
          </h3>
        </div>
        <div className='info'>
          <div className='label'>
            <Typography variant="h4">Classes</Typography>
          </div>
          <h3 className='classes'>
        	 <Typography variant="body">{courses}</Typography>
          </h3>
        </div>
        <div className={classes.parentButton}>
          <div className={classes.button}>
            <RequestPopupPage user={currentUserObjectId} recipient={currentRecipientObjectId} callback={notify} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendingRequest;
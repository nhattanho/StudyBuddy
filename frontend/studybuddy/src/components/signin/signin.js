/* =======================================================================*/
/**
/* This is SignIn Component
* @author NhatHo, Ty Koslowski
*/
/* =======================================================================*/

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Validate from "../validation/validate";
//import checkIfValidEmail from "../validation/validate"
import { useHistory } from "react-router-dom";

/* Import Redux */
import { useDispatch } from "react-redux";
import { storeCheckLogin, storeEmail, storeInformation } from "../../redux/redux";

/* Material UI styles */
import {Button} from "@material-ui/core";
import {customStyles, InputField, useStyles} from "./style";


/* Import Facebook login */
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
//const User = require("../../../model/usersModel");

/* Import Google login */
//import { GoogleLogin } from "react-google-login";

import { PrimaryButton } from "../../components/button/button";

/* Main here */
const Signin = (props) => {
  /* Use Redux */
  const dispatch = useDispatch();

  /* Use React Hook */
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [password, setPass] = React.useState("");

  /* Stuff for Facebook login */
  const [login, setLogin] = React.useState(false);
  const [data, setData] = React.useState({});
  const [picture, setPicture] = React.useState("");

  /*Will store information of current user after discussing about the userModel table*/
  const [errors, setErrors] = React.useState({});
  const history = useHistory();
  /****************************************************************/
  var subtitle;
  const [modalIsOpenFalse, setIsOpenFalse] = React.useState(false);
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  const closeModal = () => {
    setIsOpenFalse(false);
  };

  /****************************************************************/
  /**
  * Facebook login for new user
  * @param {object} response - user's information including email and password
  *  getting from input
  * @return {object} - user's information which was sent back from backend side
  */
  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      /* Login is valid */
      setLogin(true);
      axios
      .get(`http://localhost:5000/user/${response.email}/information`)
      .then((res) => {
        if (res.data.success) {
          setIsOpenFalse(false);
          setMessage(res.data.message);
          //setInformation(res.data.user);
          dispatch(storeInformation(res.data.user));
          props.push('/home');
        } else {
          setIsOpenFalse(true);
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("User email does not exist in DB")
      });
    } else {
      /* Facebook login not recognized */
      console.log("Invalid Facebook login");
    }
  }

  /****************************************************************/
  /**
  * Google login functions for new user
  */
  // const googleSuccess = (res) => {
  //   console.log('[Login Success] currentUser:', res.profileObj);
  // };
  // const googleFailure = (res) => {
  //   console.log('[Login Failure] res:', res);
  // };

  /****************************************************************/
  /**
  * SignIn for new buddy user
  * @param {object} loginObject - user's information including email and password
  *  getting from input
  * @return {object} - user's information which was sent back from backend side
  */
  const onSubmit = (props) => {
    /*console.log(password);*/
    const loginObject = {
      email: email,
      password: password,
    };
    let result = Validate({...loginObject});
    console.log(result);
    setErrors(result);
    if(!result.pass) return;
    /*console.log("email " + email);*/
    axios
      .get("http://localhost:5000/user/login", {
        params: {
          email: email,
          password: password,
        },
      })
      .then(
        /* The user exists in DB */
        (res) => {
          if (!res.data.success) {
            setIsOpenFalse(true);
            setMessage(res.data.message);
          } else {
            axios
              .get(`http://localhost:5000/user/${email}/information`)
              .then((res) => {
                if (res.data.success) {
                  setIsOpenFalse(false);
                  setMessage(res.data.message);
                  if(res.data.user.hasOwnProperty('birthday') && res.data.user.birthday != null){
                    res.data.user.birthday = res.data.user.birthday.split("T")[0];
                    console.log(res.data.user.birthday);
                  }
                  dispatch(storeInformation(res.data.user));
                  dispatch(storeEmail(email));
                  dispatch(storeCheckLogin(true));
                  props.push('/home');
                } else {
                  setIsOpenFalse(true);
                  setMessage(res.data.message);
                  props.push('/');
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };
  /****************************************************************/
  return (
    <div className={classes.mainform}>
      <div className={classes.login}> Login </div>
      <form className={classes.form}>
        <InputField
          className={classes.input}
          fullWidth={true}
          label="Email"
          name="email"
          required
          autoComplete="email"
          variant="outlined"
          margin="dense"
          size="medium"
          inputProps={{ style: { color: "black" } }}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email ? errors.email : ""}
          defaultValue={email}
        />
        <InputField
          className={classes.input}
          fullWidth={true}
          label="Password"
          name="password"
          required
          autoComplete="current-password"
          variant="outlined"
          margin="dense"
          size="medium"
          type="password"
          inputProps={{ style: { color: "black" } }}
          onChange={(e) => setPass(e.target.value)}
          error={!!errors.password}
          helperText={errors.password ? errors.password : ""}
          defaultValue={password}
        />
        <div className={classes.button}>
          <PrimaryButton text="Submit" onClick={() => onSubmit(history)} />
        </div>
        <div className={classes.button}>
          <Card>
            <Card.Header>
              <FacebookLogin
                  appId="428962065561834"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,email"
                  callback={responseFacebook}
                  cssClass="btnFacebook"
                  icon="fa-facebook" 
                  textButton = "&nbsp;&nbsp;Sign In with Facebook"                                                                
              />
            </Card.Header>
          </Card>
      </div>
      </form>
      <div className={classes.newaccount}>
        <Link to="/register" variant="body2">
          {"Don't have an account? Register"}
        </Link>
      </div>

      <div className={classes.newaccount}>
        <Link to="/resetpassword" variant="body2">
          {"Forgot Password? Reset"}
        </Link>
      </div>

      <Modal
        isOpen={modalIsOpenFalse}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" size="small">
              Register
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={closeModal}
            >
              Try Again
            </Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};
export default Signin;
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
  const [information, setInformation] = React.useState("");
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
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  /****************************************************************/
  /**
  * SignIn for new buddy user
  * @param {object} loginObject - user's information including email and password
  *  getting from input
  * @return {object} - user's information which was sent back from backend side
  */
  const onSubmit = (props) => {
    const loginObject = {
      email: email,
      password: password,
    };
    let result = Validate({...loginObject});
    console.log(result);
    setErrors(result);
    if(!result.pass) return;

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
            dispatch(storeEmail(email));
            dispatch(storeCheckLogin(true));
            axios
              .get(`http://localhost:5000/user/${email}/information`)
              .then((res) => {
                if (res.data.success) {
                  setIsOpenFalse(false);
                  setMessage(res.data.message);
                  setInformation(res.data.user);
                  dispatch(storeInformation(res.data.user));
                  props.push('/home');
                } else {
                  setIsOpenFalse(true);
                  setMessage(res.data.message);
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
        />
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={() => onSubmit(history)}>
            Submit
          </Button>
        </div>
        <div class="container">
        <Card style={{ width: '600px' }}>
          <Card.Header>
            {!login &&
              <FacebookLogin
                appId="428962065561834"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook" />
            }
            {login &&
              <Image src={picture} roundedCircle />
            }
          </Card.Header>
          {login &&
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>
                {data.email}
              </Card.Text>
            </Card.Body>
          }
        </Card>
    </div>
      </form>
      <div className={classes.newaccount}>
        <Link to="/register" variant="body2">
          {"Don't have an account? Register"}
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
          <Link style={{ textDecoration: "none" }}>
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
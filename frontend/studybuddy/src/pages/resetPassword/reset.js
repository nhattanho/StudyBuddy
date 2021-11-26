/* =======================================================================*/
/**
/* This is a page for entering email to reset password
* @author NhatHo
*/
/* =======================================================================*/

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Validate from "../../components/validation/validate";
import { useHistory } from "react-router-dom";

/* Import Redux */
import { useDispatch } from "react-redux";
import { storeCheckLogin, storeEmail, storeInformation } from "../../redux/redux";

/* Material UI styles */
import {Button} from "@material-ui/core";
import {customStyles, InputField, useStyles} from "./style";

/* Main here */
const ResetPassword = (props) => {
    /* Use Redux */
    const dispatch = useDispatch();

    /* Use React Hook */
    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const history = useHistory();
    /****************************************************************/
    const [modalIsOpenTrue, setIsOpenTrue] = React.useState(false);
    const [modalIsOpenFalse, setIsOpenFalse] = React.useState(false);
    var subtitle;
    function closeModalTrue() {
        setIsOpenTrue(false);
    }
    function afterOpenModalTrue() {
        subtitle.style.color = "blue";
    }

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }
    const closeModal = () => {
        setIsOpenTrue(false);
        setIsOpenFalse(false);
    };
  /****************************************************************/
  /**
  * SignIn for new buddy user
  * @param {object} loginObject - user's information including email and password
  *  getting from input
  * @return {object} - user's information which was sent back from backend side
  */
  const onSend = (props) => {
    /*console.log(password);*/
    const loginObject = {
      email: email,
    };
    let result = Validate({...loginObject});
    console.log(result);
    setErrors(result);
    if(!result.pass) return;

    console.log("email " + email);

    const resetEmail = {
        email:email,
    }
    axios
        .post("http://localhost:5000/user/resetPassword", resetEmail) 
        .then(res => {
            if (res.data.success) {
                console.log("true");
                setIsOpenTrue(true);
                setIsOpenFalse(false);
                setMessage(res.data.message);
                console.log(res.data.message);
            } else {
                setIsOpenFalse(true);
                setIsOpenTrue(false);
                setMessage(res.data.message);
            }
        })
        .catch(function (e) {
            console.log(e);
        });
    
  };
  /****************************************************************/
  return (
    <div className={classes.mainform}>     
      <div className={classes.reset}> Reset your password </div>
      <div> Enter your user account's verified email address and we will send you a password reset link.</div>
      <form className={classes.form}>
        <InputField
          className={classes.input}
          fullWidth={false}
          label="Enter your email address"
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
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={onSend}>
            Send
          </Button>
        </div>
      </form>

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
            justifyContent: "center",
          }}
        >
          {message == "Email does not exist!" ? (
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" size="small">
                Register
              </Button>
            </Link>
          ):(
            null
          )}
          
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpenTrue}
        onAfterOpen={afterOpenModalTrue}
        onRequestClose={closeModalTrue}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
        </div>
      </Modal>
    </div>
  );
};
export default ResetPassword;
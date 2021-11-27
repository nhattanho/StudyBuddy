/* =======================================================================*/
/**
/* This is update Password Page
* @author NhatHo
*/
/* =======================================================================*/
import React from "react";
import { Link, useParams  } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Validate from "../../components/validation/validate";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

/* Import Redux */
import { useDispatch } from "react-redux";
import { storeCheckLogin, storeEmail, storeInformation } from "../../redux/redux";

/* Material UI styles */
import {Button} from "@material-ui/core";
import {customStyles, InputField, useStyles} from "./style";

import {useCancelToken} from "./hook";

/* Main here */
const UpdatePassword = (props) => {
    /* Use Redux */
    const dispatch = useDispatch();

    const { token } = useParams();
    const { newCancelToken, isCancel } = useCancelToken();

    /* Use React Hook */
    const classes = useStyles();
    let [password, setPassword] = React.useState("");
    const [confirm_password, setConfirmPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [expire, setExpire] = React.useState(false);
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
    useEffect(() => {
        /*Cover edge case that component unmount successfully while request is still in process*/
        axios
        .get(`http://localhost:5000/user/${token}/checkTokenPass`, {
            cancelToken: newCancelToken(),
        }) 
        .then(res => {
            if (res.data.success) {
                setExpire(false);
                setPassword("");
                setConfirmPassword("");
                setEmail(res.data.email);
                console.log(email);
            } else {
                setMessage(res.data.message);
                setExpire(true);
            }
        })
        .catch((error) => {
            if (isCancel(error)) return;
        });
    }, [newCancelToken, isCancel]);
  
    /**
     * SignIn for new buddy user
     * @param {object} - resetObject - new password for resetting
     * @return {bool} - update succesfully or not
    */
    const onUpdate = () => {
        console.log(password);
        console.log(email);
        const resetObject = {
            email: email,
            password: password,
            confirm_password: confirm_password,
        };
        let result = Validate({...resetObject});
        console.log(result);
        setErrors(result);
        if(!result.pass) return;

        axios
            .put(`http://localhost:5000/user/updatePassword`, resetObject)
            .then(res => {
                if (res.data.success) {
                    setIsOpenTrue(true);
                    setIsOpenFalse(false);
                    setMessage(res.data.message);
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
    <div>
        {expire ? (
            <div>
                <h4>{message}</h4>
                <Link to="/resetpassword" style={{ textDecoration: "none" }}>
                    <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    >
                        Get the new link!
                    </Button>
                </Link>
            </div>
        ):(
        <div className={classes.mainform}>     
            <div className={classes.reset}> Enter new password </div>
            <form className={classes.form}>
                <div>
                <InputField
                        className={classes.input}
                        fullWidth={false}
                        label="Password"
                        name="password"
                        type="password"
                        required={true}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        inputProps={{ style: { color: "black" } }}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        value={password}
                        helperText={errors.password ? errors.password : ""}
                    />
                    <InputField
                        className={classes.input}
                        fullWidth={false}
                        label="Confirm Password"
                        name="confirm_password"
                        type="password"
                        required={true}
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        inputProps={{ style: { color: "black" } }}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirm_password}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password ? errors.confirm_password : ""}
                    />
                </div>
                <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={onUpdate}>
                    Update
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
                
                <Button variant="contained" color="primary" size="small">
                    Try again!
                </Button>

                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpenTrue}
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
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" size="small">
                        Login
                    </Button>
                </Link>
                </div>
            </Modal>
        </div>
    )}
    </div>
  );
};
export default UpdatePassword;
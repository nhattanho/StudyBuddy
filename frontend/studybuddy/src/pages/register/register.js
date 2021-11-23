/* =======================================================================*/
/**
* This is component for Resgister page - Click button will connect/check with DB
* @author NhatHo
*/
/* =======================================================================*/
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Modal from "react-modal";
import Validate from "../../components/validation/validate";
import {customStyles, InputField, useStyles} from "./styles.js";
/* =======================================================================*/
const Register = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState("");
    const [zoomid, setZoomId] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm_password, setConfirmPassword] = React.useState("");
    const [errors, setErrors] = React.useState({});
    
    /* =======================================================================*/
    const [modalIsOpenTrue, setIsOpenTrue] = React.useState(false);
    const [modalIsOpenFalse, setIsOpenFalse] = React.useState(false);
    const [message, setMessage] = React.useState();
    /* Use for modal true */
    var subtitle;
    function closeModalTrue() {
        setIsOpenTrue(false);
    }
    /* Use for modal false */
    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }
    const closeModal = () => {
        setIsOpenFalse(false);
    };
    /* =======================================================================*/
    /**
    * Creates a new buddy user
    * @param {object} registerObject - user's information getting from input
    * @return {object} - result which was sent back from backend side
    */
    const onSubmit = () => {
        const registerObject = {
            name: firstName + " " + lastName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirm_password: confirm_password,
            username: username,
            checkLogin: true,
            zoomid: zoomid,
        };
        let result = Validate({...registerObject});
        setErrors(result);
        console.log(result);
        if(!result.pass) return;

        axios
            .post("http://localhost:5000/user/register", registerObject) 
            .then(res => {
                if (res.data.success) {
                    setIsOpenTrue(true);
                    setIsOpenFalse(false);
                    setMessage(res.data.message);
                } else {
                console.log("user profile is not set up");
                setIsOpenFalse(true);
                setIsOpenTrue(false);
                setMessage(res.data.message);
                }
            })
            .catch(function (e) {
                console.log(e);
            });
    };
/* =======================================================================*/
    return (
        <div className={classes.mainform}>
        <h1>Register as a new Buddy</h1>
        <form>
            <div className={classes.form}>
                <InputField
                    className={classes.input}
                    fullWidth={false}
                    label="First Name"
                    name="first_name"
                    required={true}
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    inputProps={{ style: { color: "black" } }}
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    error={!!errors.firstName}
                    helperText={errors.firstName ? errors.firstName : ""}
                />
                <InputField
                    className={classes.input}
                    fullWidth={false}
                    label="Last Name"
                    name="last_name"
                    required={true}
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    inputProps={{ style: { color: "black" } }}
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName : ""}
                />
                </div>
                <div>
                <InputField
                    className={classes.input}
                    fullWidth={false}
                    label="Email Address"
                    name="email"
                    required={true}
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    inputProps={{ style: { color: "black" } }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email : ""}
                />
                <InputField
                    className={classes.input}
                    fullWidth={false}
                    label="Username"
                    name="username"
                    required={true}
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    inputProps={{ style: { color: "black" } }}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username : ""}
                />
            </div>
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
                    value={password}
                    error={!!errors.password}
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
            <div>
                <InputField
                    className={classes.input}
                    fullWidth={false}
                    label="Zoom ID"
                    name="zoomid"
                    required={true}
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    inputProps={{ style: { color: "black" } }}
                    onChange={(e) => setZoomId(e.target.value)}
                    value={zoomid}
                    error={!!errors.zoomid}
                    helperText={errors.zoomid ? errors.zoomid : ""}
                />      
            </div>
            <div className={classes.button}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
                Submit
            </Button>
            </div>
        </form>

        <div className={classes.signin}>
            <Link to="/" variant="body2">
            {"Already have an account? Sign in!"}
            </Link>
        </div>

        <Modal
        isOpen={modalIsOpenTrue}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Modal for succesfully login"
        >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                Congrat, You register successfully. Go to Login page!
            </h2>
            <div
                style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                }}
            >
                <Link to="/">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={closeModalTrue}
                    >
                        Login
                    </Button>
                </Link>
            </div>
        </Modal>

        <Modal
        isOpen={modalIsOpenFalse}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
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
            <Link to="/register">
                <Button variant="contained" color="primary" onClick={closeModal}>
                    Try again!
                </Button>
            </Link>
            </div>
        </Modal>
        </div>
    );
};
export default Register;

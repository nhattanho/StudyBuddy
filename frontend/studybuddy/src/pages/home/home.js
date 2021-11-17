/* =======================================================================*/
/**
* This is component for Home page
* @author NhatHo
*/
/* =======================================================================*/
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import {customStyles, InputField, useStyles} from "./styles.js";
import {Typography, Button, Grid, Box} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Validate from "../../components/validation/validate";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeCheckLogin, storeInformation} from "../../redux/redux";
/* =======================================================================*/
const Home = () => {
    const history = useHistory();
    /* Use Redux */
    const dispatch = useDispatch();
    const userinformation = useSelector((state) => state);
    const checkLogin = userinformation.checkLogin; 
    const email = userinformation.email;
    /* Use React Hook*/
    const classes = useStyles();
    let [name, setName] = React.useState("");
    let [about, setAboutyou] = React.useState("");
    let [major, setMajor] = React.useState("");
    let [year, setYear] = React.useState("");
    let [birthday, setBirthday] = React.useState("");
    let [userClasses, setClasses] = React.useState("");
    let [errors, setErrors] = React.useState({});
    /* =======================================================================*/
    const [modalIsOpenTrue, setIsOpenTrue] = React.useState(false);
    const [modalIsOpenFalse, setIsOpenFalse] = React.useState(false);
    const [deleteUser, setDeleteUser] = React.useState(false);
    const [message, setMessage] = React.useState();
    /* Use for modal true */
    var subtitle;
    function closeModalTrue() {
        setIsOpenTrue(false);
    }
    function afterOpenModalTrue() {
        subtitle.style.color = "blue";
    }
    /* Use for modal false */
    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }
    const closeModal = () => {
        setIsOpenFalse(false);
        setIsOpenTrue(false);
    };
    /* =======================================================================*/

    useEffect(() => {
        console.log("In update with userEffect " + checkLogin);
        if(!checkLogin){
            Object.keys(userinformation).forEach((i) => userinformation[i] = "");
        }
      }, []);


    /**
    * Creates a new buddy user
    * @param {object} registerObject - user's information getting from input
    * @return {object} - result which was sent back from backend side
    */
    const onUpdate = () => {
        if(!checkLogin) return;
        if (name === "") name = userinformation.name;
        if (about === "") about = userinformation.about;
        if (birthday === "") birthday = userinformation.birthday;
        if (year === "") year = userinformation.year;
        if (major === "") major = userinformation.major;
        if (userClasses === "") userClasses = userinformation.classes;
        const updateObject = {
            name: name,
            email: email,
            about: about,
            major: major,
            year: year,
            birthday: birthday,
            classes: userClasses,
            checkLogin: true,
        };
        let result = Validate({...updateObject});
        setErrors(result);
        /*console.log("result error " + result.classes);
        console.log("result error " + result.major);*/
        if(!result.pass) return;
        axios
            .put(`http://localhost:5000/user/email/update`, updateObject)
            .then(res => {
                if (res.data.success) {
                    setIsOpenTrue(true);
                    setIsOpenFalse(false);
                    setMessage(res.data.message);
                    setDeleteUser(false);
                    dispatch(storeInformation(updateObject));
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

    const onDelete = () => {
        if(!checkLogin) return;
        setIsOpenTrue(true);
        setIsOpenFalse(false);
        setMessage("Are you sure?");
        setDeleteUser(true);
    };

    /**
    * Delete user
    * @param {email} - email
    * @return {none} - delete user account
    */
    const onDeleteUser = (props) => {
        axios
            .delete(`http://localhost:5000/user/delete/${email}`)
            .then(res => {
                if (res.data.success) {
                    dispatch(storeCheckLogin(false));
                    props.push('/');
                } else {
                    setIsOpenFalse(true);
                    setIsOpenTrue(false);
                    setMessage(res.data.message);
                }
            })
            .catch(function (e) {
                console.log(e);
            });
    }

/* =======================================================================*/
    return (
        <Box component='div' className={classes.container}>
            <Grid container justify='center' style={{zIndex: 2}}>
                <Box component='form' className={classes.form}>
                    <Typography variant='h5' style={{color: 'tomato', textAlign: 'center', textTransform: 'uppercase'}}>
                        Your Information
                    </Typography>
                    <InputField
                        className={classes.input}
                        label="Your Name"
                        name="name"
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        fullWidth={true}
                        required={true}
                        inputProps={{ style: { color: "black" } }}
                        onChange={(e) => setName(e.target.value)} 
                        defaultValue={userinformation.name}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name : ""}
                    />
                    <br/>
                    <InputField 
                        className={classes.input}
                        label="About You"
                        name="about_you"
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        type='string'
                        fullWidth={true}
                        required={true}                        
                        multiline={true}
                        defaultValue={userinformation.about}
                        inputProps={{ style:{color: 'black', height: '80px'} }}
                        error={!!errors.about}
                        helperText={errors.about ? errors.about : ""}
                        onChange={(e) => setAboutyou(e.target.value)}  
                    />
                    <br/>
                    <InputField 
                        className={classes.input}                        
                        label='Email'
                        name="email"
                        variant='outlined'
                        margin='dense'
                        size='medium'
                        fullWidth={true}
                        disabled={true}
                        inputProps={{ style:{color: 'black'}  }}
                        defaultValue={userinformation.email}
                    />
                    <br/>
                    <InputField
                        className={classes.input}
                        label="Major"
                        name="major"
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        fullWidth={true}
                        required={true}
                        inputProps={{ style: { color: "black" } }}
                        onChange={(e) => setMajor(e.target.value)}  
                        defaultValue={userinformation.major}
                        error={!!errors.major}
                        helperText={errors.major ? errors.major : ""}
                    />
                    <br/>
                    <InputField
                        className={classes.input}                       
                        label="Year"
                        name="year"                       
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        fullWidth={true}
                        required={true}
                        inputProps={{ style: { color: "black" } }}
                        defaultValue={userinformation.year}
                        onChange={(e) => setYear(e.target.value)}
                        error={!!errors.year}
                        helperText={errors.year ? errors.year : ""}
                    />
                    <br/>
                    <InputField
                        className={classes.input}
                        label="Birthday"
                        name="birthday"
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        fullWidth={true}
                        required={true}
                        inputProps={{ style: { color: "black" } }}
                        onChange={(e) => setBirthday(e.target.value)}
                        defaultValue={userinformation.birthday}
                        error={!!errors.birthday}
                        helperText={errors.birthday ? errors.birthday : ""}
                    />
                    <br/>
                    <InputField
                        className={classes.input}
                        label="Classes"
                        name="classes"
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        fullWidth={true}
                        multiline={true}
                        required={true}
                        inputProps={{ style: { color: "black" } }}
                        onChange={(e) => setClasses(e.target.value)}
                        defaultValue={userinformation.classes}
                        error={!!errors.classes}
                        helperText={errors.classes ? errors.classes : ""}
                    />
                    <br/>
                    <div className={classes.parentButton}>
                        <div className={classes.button}>
                            <Button variant="contained" color="primary" onClick={onUpdate}>
                                Update
                            </Button>
                        </div>
                        <div className={classes.button}>
                            <Button variant="contained" color="primary" onClick={onDelete}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Box>
            </Grid>
            <Modal
                isOpen={modalIsOpenTrue}
                ariaHideApp={false}
                onAfterOpen={afterOpenModalTrue}
                onRequestClose={closeModalTrue}
                style={customStyles}
                contentLabel="Modal for succesfully login"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
  
                {deleteUser ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link to='/home' style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="primary" size="small" onClick={closeModal}>
                                No   
                            </Button>
                        </Link>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => onDeleteUser(history)}
                            >
                                Yes
                            </Button>
                        </Link>
                    </div>
                ):(<div></div>)}     
            </Modal>

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
                </div>
            </Modal>
        </Box>
    );
};
export default Home;

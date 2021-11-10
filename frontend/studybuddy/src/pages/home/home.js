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
import {customStyles, InputField, useStyles} from "./styles.js";
import {Typography, Button, Grid, Box} from '@material-ui/core';

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeCheckLogin, storeInformation} from "../../redux/redux";
/* =======================================================================*/
const Home = () => {
    /* Use Redux */
    const userinformation = useSelector((state) => state);
    const dispatch = useDispatch();

    /* Use React Hook*/
    const classes = useStyles();
    const [aboutYou, setAboutyou] = React.useState("");
    const [major, setMajor] = React.useState("");
    const [year, setYear] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [userClasses, setClasses] = React.useState("");
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
    const onUpdate = () => {
        console.log(userinformation.aboutYou);
        const updateObject = {
            email: userinformation.email,
            aboutYou: aboutYou,
            major: major,
            year: year,
            birthday: birthday,
            classes: userClasses,
            checkLogin: userinformation.checkLogin,
        };

        axios
            .post("http://localhost:5000/user/update", updateObject) 
            .then(res => {
                if (res.data.success) {
                    setIsOpenTrue(true);
                    setIsOpenFalse(false);
                    setMessage(res.data.message);
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
        //const id = userinfor._id;
        axios
            .post("http://localhost:5000/user/delete") 
            .then(res => {
                if (res.data.success) {
                    setIsOpenTrue(true);
                    setIsOpenFalse(false);
                    setMessage(res.data.message);
                    dispatch(storeCheckLogin(false));
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
                        label="About You"
                        name="about_you"
                        variant="outlined"
                        margin="dense"
                        size="medium"
                        type='string'
                        fullWidth={true}
                        required={true}                        
                        multiline={true}
                        defaultValue={userinformation.aboutYou}
                        inputProps={{ style:{color: 'black', height: '80px'} }}
                        
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
        </Box>
    );
};
export default Home;

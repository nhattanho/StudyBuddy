import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

/* Import Redux */
import { useDispatch } from "react-redux";
import { storeCheckLogin } from "../../redux/redux";

/* Material UI styles */
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "tomato",
    },
    "& label": {
      color: "tan",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "tan",
      },
      "&:hover fieldset": {
        borderColor: "tan",
      },
      "& .Mui-focused fieldset": {
        borderColor: "tan",
      },
    },
  },
})(TextField);
const useStyles = makeStyles((theme) => ({
  form: {
    display: "column",
  },
  button: {
    marginTop: "10px",
  },
  newaccount: {
    marginTop: "10px",
  },
}));

/* Main here */
const Signin = (props) => {
  /* Use Redux */
  const dispatch = useDispatch();

  /* Use React Hook */
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPass] = React.useState("");

  /****************************************************************/
  const onSubmit = () => {
    dispatch(storeCheckLogin(true));
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
        />
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </form>
      <div className={classes.newaccount}>
        <Link to="/register" variant="body2">
          {"Don't have an account? Register"}
        </Link>
      </div>
    </div>
  );
};
export default Signin;
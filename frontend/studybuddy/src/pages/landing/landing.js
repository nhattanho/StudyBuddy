import React from "react";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";

/* Adding Material UI libs */
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

/* Adding components */
import Image from "./images/ucla.jpeg";
import Signin from "../../components/signin/signin.js";
import { storeCheckLogin, storeInformation } from "../../redux/redux";
import { PrimaryButton } from "../../components/button/button";

/* Adding Material UI styles */
var styles = {
  backgroundImage: `url(${Image})`,
  backgroundPositionX: "center",
  backgroundPositionY: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const useStyles = makeStyles((theme) => ({
  mainback: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100vh",
  },
  mainimage: {
    position: "relative",
    width: "75% !important",
    height: "100%",
    margin: "0px 5px 0px 0px",
  },
  signin: {
    position: "relative",
    width: "25%",
    margin: "10% 30px 0px 30px",
    [theme.breakpoints.down("sm")]: {
      margin: "10% 5px 0px 5px",
    },
  },
  infor: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    width:"100%",
    backgroundColor: "#FFFFFF96",
    padding: "10px 0",
    margin: "0 auto",
    color: "#0EA2D8",
  },
  signOutButton: {
    marginTop: "9px"
  }
}));

const Landing = (props) => {
  const checkLogin = useSelector((state) => state.checkLogin);
  const name = useSelector((state) => state.name);
  const dispatch = useDispatch();

  const setLogout = () => {
    dispatch(storeCheckLogin(false));
  };

  const classes = useStyles();
  return (
    <div>
      <div className={classes.mainback}>
        <div className={classes.mainimage} style={styles}>
            <div className={classes.infor}>
                <Typography variant="h2" >
                <b>Study Buddy</b>
                </Typography>
                <Typography variant="h4">
                    Find a friend to study with!
                </Typography>
            </div>
        </div>
        <div className={classes.signin}>
          {checkLogin ? (
            <div>
              <Typography variant="h6">
                Hey {name}!
              </Typography>
              <Typography variant="h6">
                Do you want to sign out?
              </Typography>
              <PrimaryButton
                className={classes.signOutButton}
                text={"Sign Out"}
                onClick={setLogout} />
            </div>
          ) : (
            <Signin />
          )}
        </div>
      </div>
    </div>
  );
};
export default Landing;
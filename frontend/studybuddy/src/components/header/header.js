import React from "react";
import { useEffect } from "react";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeCheckLogin, storeInformation } from "../../redux/redux";
/* Material UI */
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import { TertiaryButton } from "../../components/button/button";

/* logo image */
import logo from '../../logo/happy.png'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0EA2D8"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    border: "3px solid #FFCB77"
  },
}));

export default function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    /* Use Redux */
    let checkLogin = useSelector((state) => state.checkLogin);
    let userinformation = useSelector((state) => state);
    const dispatch = useDispatch();
    const setLogout = () => {
        dispatch(storeCheckLogin(false));
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            {checkLogin ? (
                <AppBar position="static" color="transparent">
                    <Toolbar className={classes.header}>
                        <Link to="/">
                            <IconButton>
                                <Avatar
                                alt="bruincareer"
                                src={logo}
                                className={classes.large}
                                />
                            </IconButton>
                        </Link>

                        <Link to="/home" style={{ textDecoration: "none" }}>
                            <TertiaryButton text="Profile" />
                        </Link>

                        <Link to="/search" style={{ textDecoration: "none" }}>
                            <TertiaryButton text="Find a Buddy" />
                        </Link>

                        <Link to="/buddies" style={{ textDecoration: "none" }}>
                            <TertiaryButton text="Buddy Requests" />
                        </Link>

                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar
                                alt='Profile Pic'
                                src={userinformation.profileURL}
                                className={classes.large}
                            />
                        </IconButton>

                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        getContentAnchorEl={null}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        open={open}
                        onClose={handleClose}
                        >
                        <MenuItem onClick={handleClose}>
                            <Link to="/home" style={{ textDecoration: "none" }}>
                                <Button
                                    size="small"
                                    color="primary"
                                >
                                    View Profile
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <Button
                                size="small"
                                color="primary"
                                onClick={setLogout}
                                >
                                Logout
                                </Button>
                            </Link>
                        </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            ) : (
                <AppBar position="static" color="transparent">
                    <Toolbar className={classes.header}>
                        <Link to="/">
                            <IconButton>
                                <Avatar
                                alt="bruincareer"
                                src={logo}
                                className={classes.large}
                                />
                            </IconButton>
                        </Link>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            <TertiaryButton text="Register" />
                        </Link>
                    </Toolbar>
                </AppBar>
            )}
        </div>
    );
}
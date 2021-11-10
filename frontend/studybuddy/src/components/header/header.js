import React from "react";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeCheckLogin } from "../../redux/redux";
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
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

  /* Use Redux */
    const checkLogin = useSelector((state) => state.checkLogin);
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

                        <Link to="/Pending" style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="primary">
                                Pending
                            </Button>
                        </Link>

                        <Link to="/findBuddy" style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="primary">
                                FindBuddy
                            </Button>
                        </Link>

                        <Link to="/" style={{ textDecoration: "none" }}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Typography variant="h6" color="primary">
                                "Nhat Ho"
                                </Typography>
                            </IconButton>
                        </Link>

                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={open}
                        onClose={handleClose}
                        >
                        <MenuItem>
                            <Button
                            size="small"
                            color="primary"
                            onClick={setLogout}
                            style={{ marginRight: 30 }}
                            >
                            Logout
                            </Button>
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
                            <Button variant="contained" color="primary">
                                Register
                            </Button>
                        </Link>
                        <Link to="/home" style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="primary">
                                Home
                            </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            )}
        </div>
    );
}
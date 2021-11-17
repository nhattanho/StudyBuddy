/* =======================================================================*/
/* This is styles for LogIn Page
* @author NhatHo
/* =======================================================================*/
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField} from "@material-ui/core";

export const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export const InputField = withStyles({
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

export const useStyles = makeStyles((theme) => ({
    infor: {
        display: "flex",
        flexDirection: "column"
    },
    login: {
        backgroundColor: "greenyellow",
        fontSize: 35
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    button: {
        marginTop: "10px",
    },
    newaccount: {
        marginTop: "10px",
    },
}));
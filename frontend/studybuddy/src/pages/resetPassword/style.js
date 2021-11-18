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
    mainform: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        marginLeft: "50px",
        marginRight: "50px",
        alignItems: "center",
        marginTop: "20px",
        border: "3px solid #535348"

    },
    reset: {
        backgroundColor: "greenyellow",
        fontSize: 35
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "260px"
    },
    button: {
        marginTop: "10px",
    },
    newaccount: {
        marginTop: "10px",
    },
}));
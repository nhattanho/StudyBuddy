/* =======================================================================*/
/* This is styles component for Register Page
* @author NhatHo
/* =======================================================================*/
import { TextField} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

export const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "blue",
    },
  };

export const InputField = withStyles({
    root: {
      marginLeft: "10px",
      marginRight: "10px",
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
    form: {
      display: "column",
    },
    button: {
      marginTop: "20px",
    },
    signin: {
      marginTop: "20px",
    },
  }));
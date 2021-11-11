/* =======================================================================*/
/* This is styles component for Home Page
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



export const useStyles = makeStyles(theme=>({
  container: {
      position: 'relative',
      height: '100vh',
      width: '100%',
      [theme.breakpoints.down('sm')]:{
          display: 'grid',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
      }
  },
  form: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: '30px',
      width: '100vh',
      [theme.breakpoints.down('sm')]:{
          width: '90%',
      }
  },
  info: {
      marginTop: '1rem',
      borderRadius: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '3px 6px rgba(0, 0, 0, 0.2)',
      marginBottom: '1rem',
      [theme.breakpoints.down('sm')]: {
          marginTop: '2rem !important',
      }
  },
  item:{
      color: 'white',
      [theme.breakpoints.down('sm')]: {
          width: '90%',
          marginLeft: '-1rem'
      }
  },
  parentButton: {
    display: "flex"
  },
  button: {
      marginTop: '1.5rem',
      color: 'tomato',
      borderColor: 'tomato',
      justifyContent: 'space-between',
      width: '180px',
      [theme.breakpoints.down('sm')]:{
          marginTop: '5px',
          height: '95%'
      }
  },
  heading: {
      [theme.breakpoints.down('sm')]:{
          marginRight: '-1.5rem'
      } 
  },
  input: {
      [theme.breakpoints.down('sm')]:{
          width: '90%',
          height: '100%'
      }
}}))
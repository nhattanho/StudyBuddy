/* =======================================================================*/
/* Validation input component
* @author NhatHo
* @param {object} - all properties we want to verify from the user's input
* It can be destructed directly by using new syntax of ES6: {email, firstname, lastname}
* @return {object} - an object contains all missing errors 
/* =======================================================================*/
const Errors = {
    empty: {
        firstname: "Must enter firstname",
        lastname: "Must enter lastname",
        email: "Must enter email",
        password: "Must enter password",
        confirm_password: "Must enter confirm password",
        username: "Must enter user name",
    },
    invalid: {
        email: "Enter valid email",
        password: {
            length: "Must be 8 or more characters",
            confirm: "Must confirm password",
        }
    },
};

const Validate = (props) => {
    let email = props.email;
    function checkIfValidEmail(email) {
        let re = /^[^\s@]+@[^\s@]+$/;
        return re.test(email) ? true : false;
    }
    let temp = {};
    temp.firstName = props.firstName ? "" : Errors.empty.firstname;
    temp.lastName = props.lastName ? "" : Errors.empty.lastname;
    if (email) {
      if (checkIfValidEmail()) {
        temp.email = "";
      } else temp.email = Errors.invalid.email;
    } else temp.email = Errors.empty.email;

    if (props.password) {
      if (props.password.length >= 8) {
        temp.password = "";
      } else temp.password = Errors.invalid.password.length;
    } else temp.password = Errors.empty.password;

    temp.username = props.username ? "" : Errors.empty.username;
    temp.confirm_password = props.confirm_password ? "" : Errors.invalid.password.confirm;

    if (Object.values(temp).every((x) => x === "")) 
        temp.pass = false;
    else temp.pass = true;
    return temp;
  };
  /* =======================================================================*/
  export default Validate;
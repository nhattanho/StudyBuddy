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

const checkIfValidEmail = (value) => {
    let re = /^[^\s@]+@[^\s@]+$/;
    return re.test(value) ? true : false;
}

const Validate = (props) => {
    let temp = {};
    let email = props.email;
    if (email) {
        if (checkIfValidEmail(email)) {
            temp.email = "";
        } else temp.email = Errors.invalid.email;
    } else temp.email = Errors.empty.email;

    if (props.password) {
        if (props.password.length >= 8) {
            temp.password = "";
        } else temp.password = Errors.invalid.password.length;
    } else temp.password = Errors.empty.password;

    if(props.firstName !== undefined)
        temp.firstName = props.firstName ? "" : Errors.empty.firstname;
    if(props.lastName !== undefined)
        temp.lastName = props.lastName ? "" : Errors.empty.lastname;
    if(props.username !== undefined)
        temp.username = props.username ? "" : Errors.empty.username;
    if(props.confirm_password !== undefined)
        temp.confirm_password = props.confirm_password ? "" : Errors.invalid.password.confirm;

    if (Object.values(temp).every((x) => x === "")) 
        temp.pass = true;
    else temp.pass = false;
    return temp;
  };
  /* =======================================================================*/
  export default Validate;
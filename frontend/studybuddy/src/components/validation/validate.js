const Errors = {
    empty: {
        name: "Must update your name",
        major: "Must update your major",
        year: "Must update your school year",
        birthday: "Must update your birthday",
        classes: "Must update your classes",
        about: "Must update about you",
        firstname: "Must enter firstname",
        lastname: "Must enter lastname",
        email: "Must enter email",
        password: "Must enter password",
        confirm_password: "Must enter confirm password",
        username: "Must enter user name",
        zoomid: "Must enter zoom id",
    },
    invalid: {
        email: "Enter valid email",
        password: {
            length: "Must be 8 or more characters",
            confirm: "Must confirm password",
        }
    },
};

/* =======================================================================*/
/**
* Validation email
* @author NhatHo
* @param {email}
* @return {boolean} - result of email validation
*/
/* =======================================================================*/
const checkIfValidEmail = (value) => {
    let re = /^[^\s@]+@[^\s@]+$/;
    return re.test(value) ? true : false;
}

/* =======================================================================*/
/**
* Validation input component
* @author NhatHo
* @param {object} - all properties we want to verify from the user's input
* It can be destructed directly by using new syntax of ES6: {email, firstname, lastname}
* @return {object} - an object contains all missing errors 
*/
/* =======================================================================*/
const Validate = (props) => {
    let temp = {};
    let email = props.email;
    if (email) {
        if (checkIfValidEmail(email)) {
            temp.email = "";
        } else temp.email = Errors.invalid.email;
    } else temp.email = Errors.empty.email;

    if(props.password !== undefined){
        if (props.password) {
            if (props.password.length >= 8) {
                temp.password = "";
            } else temp.password = Errors.invalid.password.length;
        } else temp.password = Errors.empty.password;
    }

    if(props.zoomid !== undefined)
        temp.zoomid = props.zoomid ? "" : Errors.empty.zoomid;
    if(props.firstName !== undefined)
        temp.firstName = props.firstName ? "" : Errors.empty.firstname;
    if(props.lastName !== undefined)
        temp.lastName = props.lastName ? "" : Errors.empty.lastname;
    if(props.username !== undefined)
        temp.username = props.username ? "" : Errors.empty.username;
    if(props.confirm_password !== undefined)
        temp.confirm_password = props.confirm_password ? "" : Errors.invalid.password.confirm;
    if(props.name !== undefined)
        temp.name = props.name ? "" : Errors.empty.name;
    if(props.about !== undefined)
        temp.about = props.about ? "" : Errors.empty.about;
    if(props.major !== undefined)
        temp.major = props.major ? "" : Errors.empty.major;  
    if(props.year !== undefined)
        temp.year = props.year ? "" : Errors.empty.year;
    if(props.birthday !== undefined)
        temp.birthday = props.birthday ? "" : Errors.empty.birthday;
    if(props.classes !== undefined)
        temp.classes = props.classes.length != 0 ? "" : Errors.empty.classes;

    if (Object.values(temp).every((x) => x === "")) 
        temp.pass = true;
    else temp.pass = false;
    return temp;
};
  /* =======================================================================*/
  export default Validate;
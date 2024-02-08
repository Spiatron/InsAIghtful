const loginValidation = (value) => {
    let error = {};
  
    if (!value.Username) {
      error.Username = "Username Is Required";
    }
    if (!value.email) {
      error.email = "Email is Requierd";
    } else if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(value.email)) {
      error.email = "Email invalid";
    }
  
    if (!value.password) {
      error.password = "Password Is Required";
    } else if (value.password.length < 5) {
      error.password = "Password Is Invalid";
    }
  
    return error;
  };
  
  export default loginValidation;
  
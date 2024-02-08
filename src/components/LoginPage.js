import React, { useState, useEffect } from 'react';
import loginValidation from "@/validators/loginValidation";
import styles from '@/styles/LoginFormStyles.css'

function LoginPage({ SubmitButton }) {
  const [value, setValue] = useState({
    username: '', // Assuming you use 'username' instead of 'fullname' for login
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [data, setData] = useState();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && data) {
      SubmitButton(true);
    }
  }, [errors]);

  const handleOnClick = (e) => {
    e.preventDefault();
    setErrors(loginValidation(value)); // Assuming you have a validation function
    setData(true);
  };

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
    </div>
    <form autoComplete="off" className="form">
      <h3 className="h3">Login</h3>
      <label htmlFor="username" className="label">
        Username
      </label>
      <input
        value={value.Username}
        onChange={handleOnChange}
        type="text"
        className="input"
        placeholder="Enter Your Name"
        name="Username"
      />
      {errors.Username && <p className="p">{errors.Username}</p>}
      <label htmlFor="username" className="label">
        Email
      </label>
      <input
        value={value.email}
        onChange={handleOnChange}
        type="email"
        className="input"
        placeholder="Enter Your Email"
        name="email"
      />
      {errors.email && <p className="p">{errors.email}</p>}
      <label htmlFor="username" className="label">
        Password
      </label>
      <input
        value={value.password}
        onChange={handleOnChange}
        type="password"
        placeholder="Enter Your Password"
        name="password"
        className="input"
      />
      {errors.password && <p className="p">{errors.password}</p>}
      <button className="button" onClick={handleOnClick}>
        Sumbit
      </button>
    </form>
  </>
  );
};

export default LoginPage;

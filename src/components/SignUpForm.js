"use client";
import React, { useEffect, useState } from "react";
import SignUpValidation from "@/validators/SignUpValidation";
import styles from '@/styles/SignUpFormStyles.css'

function SignUpForm({ SubmitButton }) {
  const [value, setValue] = useState({
    fullname: "",
    email: "",
    password: "",
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
    setErrors(SignUpValidation(value));
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
        <h3 className="h3">Sign Up Here</h3>
        <label htmlFor="username" className="label">
          Full Name
        </label>
        <input
          value={value.fullname}
          onChange={handleOnChange}
          type="text"
          className="input"
          placeholder="Enter Your Name"
          name="fullname"
        />
        {errors.fullname && <p className="p">{errors.fullname}</p>}
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
}

export default SignUpForm;

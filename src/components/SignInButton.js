"use client";
import { signIn } from "next-auth/react";
// import { LogIn } from 'lucide-react';
import React from "react";

const SignInButton = () => {
  return (
    // <div className="card ">
    // <button className="btn btn-outline-success text-green font-monospace"
      <button className="btn btn-outline-success text-green font-monospace"
        onClick={() => {
          signIn("google");
        }}
      >
      log In
      </button >
    // </div>
  );
};

export default SignInButton;

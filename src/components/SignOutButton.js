"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = ({ user }) => {
  return (
    <>
      <div>
          <button className="btn btn-outline-danger text-red"
            onClick={() => {
              signOut();
            }}
          >
           <div className=" font-monospace">log Out</div> 
          </button>
        </div>
    </>
  );
};

export default SignOutButton;



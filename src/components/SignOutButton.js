"use client";
import { signOut } from "next-auth/react";
// import { LogOut } from 'lucide-react';
import React from "react";

const SignOutButton = ({ user }) => {
  return (
    <>
      <div>
        {/* <div className="card m-1 "> */}
        {/* <button className="btn btn-outline-danger text-red" */}
          <button className="btn btn-outline-danger text-red"
            onClick={() => {
              signOut();
            }}
          >
           <div className=" font-monospace">log Out</div> 
          </button>
        </div>
      {/* </div> */}
    </>
  );
};

export default SignOutButton;



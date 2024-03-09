"use client";
import { signOut } from "next-auth/react";
import React from "react";

const MainPageSignOutButton = ({ user }) => {
  return (
    <>
      <div>
        <div 
          onClick={() => {
            signOut();
          }}
        >
          <div>log Out</div>
        </div>
      </div>
    </>
  );
};

export default MainPageSignOutButton;

"use client";
import { signOut } from "next-auth/react";
import React from "react";

const UserAccountNav = ({ user }) => {
  return (
    <>
      <div className="dropdown">
        {/* <button className="dropbtn">Select an option</button> */}

        <div className="dropdown-content">
          <a href="#">{user?.name && <p>{user.name}</p>}</a>
          <a href="#">{user?.email && <p>{user.email}</p>}</a>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default UserAccountNav;

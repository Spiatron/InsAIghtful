"use client";
import { signOut } from "next-auth/react";
import React from "react";

const UserAccountNav = ({ user }) => {
  return (
    <>
      <div>
        <div className="card border-white">
          <ul className="list-group list-group-flush ">
            <li className="list-group-item font-monospace ">
              {user?.name && <div>{user.name}</div>}
            </li>
            <li className="list-group-item font-monospace">
              {user?.email && <div>{user.email}</div>}
            </li>
          </ul>
        </div>

        <div className="card m-1 ">
          <button
            className="btn btn-outline-danger text-red"
            onClick={() => {
              signOut();
            }}
          >
            <div className=" font-monospace">Sign Out</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserAccountNav;

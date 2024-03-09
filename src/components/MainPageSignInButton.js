"use client";
import { signIn } from "next-auth/react";
import React from "react";

const MainPageSignInButton = () => {
  return (
    <div
      onClick={() => {
        signIn("google");
      }}
    >
      log In
    </div>
  );
};

export default MainPageSignInButton;

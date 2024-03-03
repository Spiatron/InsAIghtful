"use client";
import React from "react";
import style from "@/styles/loader/loadingpage.module.css";
// import style from "@/styles/loader/loader.module.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import Spinner from "react-bootstrap/Spinner";

const loading = () => {
  return (
    <div
      className={style.loadingpage}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <span className={style.loader}></span> {/*#ffb703*/}
      {/* <ScaleLoader color="#ffa200"/> */} {/*Another type of spinner */}
      <Spinner
        animation="border"
        variant="dark"
        style={{ width: "4rem", height: "4rem" }}
      >
        ;<span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
export default loading;

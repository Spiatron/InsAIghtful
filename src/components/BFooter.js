'use client'
import React from "react";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithubSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const BFooter = () => {
  return <div className="container">
    <footer className="d-flex  flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center ">
        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
          {/* <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"/></svg> */}
        </a>
        <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Company, Inc</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3"><a className="text-body-secondary" href="https://www.instagram.com/"><RiInstagramFill size={25} /></a></li>
        <li className="ms-3"><a className="text-body-secondary" href="https://www.facebook.com/"><FaFacebookSquare size={25} /></a></li>
        <li className="ms-3"><a className="text-body-secondary" href="https://github.com/"><FaGithubSquare size={25} /></a></li>
        <li className="ms-3"><a className="text-body-secondary" href="https://twitter.com/?lang=en"><BsTwitterX size={22} /></a></li>
      </ul>
    </footer>
  </div>
  
};
export default BFooter;
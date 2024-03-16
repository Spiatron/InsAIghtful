import React from "react";
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
import styles from "@/styles/BFooter.module.css";

const BFooter = () => {
  return (
    <footer className={`d-flex  ${styles.footerContainer}`}>
      <div className={`container col-md-4 d-flex align-items-center  ${styles.footerLeft}`}>
        <span className="mb-3 mb-md-0 text-body-secondary">
          &copy; 2024 Company, Inc
        </span>
      </div>

      <ul className=" container nav col-md-4 justify-content-end list-unstyled d-flex mt-4 mb-4">
        <li className="ms-3">
          <Link
            className={` text-body-secondary ${styles.socialLink}`}
            href="https://www.instagram.com/"
          >
            <RiInstagramFill size={25} />
          </Link>
        </li>
        <li className="ms-3">
          <Link
            className={`text-body-secondary ${styles.socialLink}`}
            href="https://www.facebook.com/"
          >
            <FaFacebookSquare size={25} />
          </Link>
        </li>
        <li className="ms-3">
          <Link
            className={`text-body-secondary ${styles.socialLink}`}
            href="https://github.com/"
          >
            <FaGithubSquare size={25} />
          </Link>
        </li>
        <li className="ms-3">
          <Link
            className={`text-body-secondary ${styles.socialLink}`}
            href="https://twitter.com/?lang=en"
          >
            <BsTwitterX size={22} />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default BFooter;

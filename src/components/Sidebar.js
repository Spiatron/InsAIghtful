import UserAccountNav from "../components/UserAccountNav";
import SignInButton from "../components/SignInButton";
import SignOutButton from "../components/SignOutButton";
import '../styles/fonts.module.css';
import { BookCopy } from 'lucide-react';
import { FcGallery } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { Cog } from 'lucide-react';
import { IoClose } from "react-icons/io5";
import style from "@/styles/buttons/mainMenubuttonClick.module.css";
import React from "react";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import '../styles/fonts.module.css';
import btnMenuStyles from '@/styles/btnMenuStyles.css'
import sidebarNavAnimationStyles from '@/styles/sidebarNavAnimationStyles.css'


const Sidebar = async () => {
  const session = await getAuthSession();
  return (

    <>
      <nav className="navbar bg-black fixed-fliud">
        <div>
          <div className="container-fluid">
            <button className="btnmenu"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="icon">
                <svg viewBox="0 0 175 80" width="40" height="40">
                  <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                  <rect y="30" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                  <rect y="60" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                </svg>
              </span>
              <span className="text">Menu</span>
            </button>

            {/* <span> <RiMenuUnfoldFill size="30" /></span> */}
            {/* </button> */}
            <Link className="fs-1 lh-1 navbar-brand text-light btn btn-outline-warning m-2" href="/" style={{ fontFamily: "angrybird" }}> Learnify</Link>
          </div>
        
          <div
            className="offcanvas offcanvas-start bg-black"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h1 className="offcanvas-title fs-2 btn btn-outline-warning" id="offcanvasNavbarLabel" style={{ fontFamily: "angrybird" }}>
                Learnify
              </h1>
              <button
                type="button"
                className="btn btn-outline-warning"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              // className={style.button}
              > <IoClose size={20} /></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li>
                  {session?.user && <UserAccountNav user={session.user} />}
                </li>
                {session?.user && (
                  <li className="nav-item">
                    <Link className={`m-1 nav-link btn font-monospace fw-bold text-start ${style.button}`} href="/create"> <BookCopy /> Create Course</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className={` m-1 nav-link btn font-monospace fw-bold text-start ${style.button}`} href="/gallery">  <FcGallery /> Gallery</Link>
                </li>
                <li className="nav-item">
                  <Link className={` m-1 nav-link btn font-monospace fw-bold text-start ${style.button}`} href="/about"> <FcAbout /> About-us</Link>
                </li>
                <li className="nav-item">
                  <Link className={` m-1 nav-link btn font-monospace fw-bold text-start ${style.button}`} href="/settings"> <Cog /> Settings</Link>
                </li>
              </ul>

              <div style={{ marginTop: "20.5rem" }}>
                {session?.user && <SignOutButton />}
              </div>

              <div>
                {!session?.user && <SignInButton />}
              </div>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Sidebar;
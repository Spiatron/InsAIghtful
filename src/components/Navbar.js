import UserAccountNav from "./UserAccountNav";
import SignInButton from "./SignInButton";
import React from "react";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav>
      <ul>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/gallery">
          <li>Gallery</li>
        </Link>
        {session?.user && (
          <>
            <Link href="/create">
              <li>Create Course</li>
            </Link>
            <Link href="/settings">
              <li>Settings</li>
            </Link>
          </>
        )}
        <div>
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton />
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

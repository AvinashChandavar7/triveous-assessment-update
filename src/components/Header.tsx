"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


// Tailwind CSS 
const logoutLinkStyles = "rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const loginLinkStyles = "rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const signupLinkStyles = "rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"



export default function Header() {

  const [user] = useAuthState(auth);
  const logout = () => auth.signOut();


  return (
    <div className="relative w-full py-2 bg-purple-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">

          <Link href={"/"} className="inline-block w-full max-w-[150px]">
            <Image src="/favicon.ico" alt="Logo" width={60} height={60} priority />
          </Link>

        </div>

        <div className="hidden space-x-2 lg:block">

          {user ? (
            <Link href={"/"} onClick={logout} className={logoutLinkStyles}>
              Logout
            </Link>
          ) : (
            <Link href={"/login"} className={loginLinkStyles}   >
              Log In
            </Link>
          )}

          {/* <Link href={"/newsdetails"} className={signupLinkStyles} >
            newsdetails
          </Link> */}

          <Link href={"/signup"} className={signupLinkStyles} >
            Sign up
          </Link>

        </div>
      </div>
    </div>
  );
}
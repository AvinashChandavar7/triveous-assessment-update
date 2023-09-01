"use client";


import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    signOut(auth)
      .then(() => router.replace("/"))
      .catch(error => console.error("Error signing out:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<></>)
}


export default LogoutPage;

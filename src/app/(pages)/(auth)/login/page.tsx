"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Login from "@/components/Login";
import { auth } from "@/utils/firebase";



const LoginPage = () => {
  const router = useRouter();


  useEffect(() => {
    if (auth.currentUser) {
      router.replace("/news");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Login />
    </section>
  )
}


export default LoginPage;
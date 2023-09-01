"use client";

import Signup from "@/components/Signup";

import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignupPage = () => {
  const router = useRouter();


  useEffect(() => {
    if (auth.currentUser) {
      router.replace("/news");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-15">
      <Signup />
    </section>
  )
}

export default SignupPage;
"use client"


import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation"

import React from "react"

const ProtectedLayout = ({ children, }: { children: React.ReactNode }) => {

  const router = useRouter();

  if (!auth.currentUser) {
    router.replace("/login");
    return <></>;
  }

  return children
}

export default ProtectedLayout;
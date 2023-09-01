"use client";

import React from "react";
import Header from "@/components/Header";
import AppProvider from "@/context/AppProvider";


const ProtectedLayout = ({ children, }: { children: React.ReactNode }) => {

  return (
    <>
      <AppProvider>
        <Header />
        <main className="px-2 py-2">
          {children}
        </main>
      </AppProvider>

    </>

  )
}

export default ProtectedLayout;
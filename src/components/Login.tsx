"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";

import { auth } from "@/utils/firebase";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'


interface FormData {
  email: string;
  password: string;
}


const Login: React.FC = () => {
  const router = useRouter();



  const [formData, setFormData] = useState<FormData>({ email: "", password: "", });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    userError,
  ] = useSignInWithEmailAndPassword(auth);

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const authData = await signInWithEmailAndPassword(email, password);
      // console.log(authData, "authData");
      if (authData) {

        router.push("/news");
      }

    } catch (error: any) {
      setErrorMessage(error?.message);
      console.error("Invalid email or password", error);
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`mx-auto w-full max-w-lg bg-purple-900 rounded-xl p-10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[60px]">

            <Image src="/favicon.ico" alt="Logo" width={60} height={60} priority />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-red-400">
          Don&apos;t have any account?&nbsp;
          <Link
            href="/signup"
            className="font-medium text-white transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {errorMessage && <p className="text-red-600 mt-8 text-center">{errorMessage}</p>}

        <form onSubmit={login} className="mt-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="text-base font-medium ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Email"
                  id="email"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium ">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  id="password"
                  required
                />
              </div>
            </div>
            {(errorMessage || userError) && (
              <p className="text-center text-red-500">{errorMessage || userError?.message}</p>
            )}
            <div>
              <button type="submit" className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80 hover:text-black" >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;

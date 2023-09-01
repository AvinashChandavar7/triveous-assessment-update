"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@/utils/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'



interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const router = useRouter();


  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");


  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    userError,
  ] = useCreateUserWithEmailAndPassword(auth);



  const createSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { email, password, confirmPassword } = formData;

      if (errorMessage) {
        setErrorMessage('');
      }

      if (password !== confirmPassword) {
        setErrorMessage("Password do not match");
        return;
      }


      const authData = await createUserWithEmailAndPassword(email, password);
      console.log(authData, "authData");

      if (authData) {

        router.push("/login");
      }


    } catch (error: any) {
      setErrorMessage(error.message);
      console.error("Error creating user:", error);
    }
  };



  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-purple-900 rounded-xl p-10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[60px]">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={60}
              height={60}
              priority
            />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-red-400">
          Already have an account?&nbsp;
          <Link
            href="/login"
            className="font-medium text-primary text-white transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        {errorMessage && <p className="text-red-600 mt-8 text-center">{errorMessage}</p>}
        <form onSubmit={createSignUp} className="mt-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="text-base font-medium ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value, }))}
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-base font-medium ">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>
            {(errorMessage || userError) && (
              <p className="text-center text-red-500">{errorMessage || userError?.message}</p>
            )}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary  font-semibold leading-7 text-white  hover:bg-primary/80  py-2" >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;

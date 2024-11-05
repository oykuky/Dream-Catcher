"use client";

import BlurIn from "@/components/ui/blur-in";
import Link from "next/link";
import React from "react";

function LoginForm() {
  return (
    <div className="w-full flex items-center justify-center">
      <form className="flex flex-col gap-8">
        <BlurIn word="Login" className="text-white dark:text-pink-700" />
        <label className="text-white text-sm -mb-5" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          //   placeholder={t("login.username")}
          className="rounded-lg h-12 px-9 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
        />
        <label className="text-white text-sm -mb-5" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          //   placeholder={t("login.password")}
          className="rounded-lg h-12 px-9 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
        />
        <button
          type="submit"
          className="text-white rounded-lg text-md font-semibold px-5 py-3 mt-12 text-center bg-gray-950 border-pink-500 border-t-2 shadow-md shadow-pink-500 hover:scale-105 hover:bg-pink-700 duration-300 transition ease-in-out"
        >
          {/* {t("login.loginButton")} */} login
        </button>

        <Link href={"/register"} className="text-pink-400 font-bold">
          {" "}
          <span className="text-white text-sm font-semibold">
            Hesabınız yok mu üye olun
          </span>{" "}
          Register
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;

import BlurIn from "@/components/ui/blur-in";
import Link from "next/link";
import React from "react";

function RegisterForm() {
  return (
    <div className="w-full flex items-center justify-center">
      <form className="flex flex-col gap-5 w-full px-20">
        <BlurIn word="Register" className="text-white dark:text-pink-700" />
        <label className="text-white text-sm -mb-4" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          //   placeholder={t("login.username")}
          className="rounded-lg h-12 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
        />
        <label className="text-white text-sm -mb-4" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          //   placeholder={t("login.username")}
          className="rounded-lg h-12 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
        />
        <label className="text-white text-sm -mb-4" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          //   placeholder={t("login.password")}
          className="rounded-lg h-12 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
        />
        <label className="text-white text-sm -mb-4" htmlFor="passwordRepeat">
          Repeat Password
        </label>
        <input
          id="passwordRepeat"
          type="password"
          name="passwordRepeat"
          //   placeholder={t("login.password")}
          className="rounded-lg h-12 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
        />
        <button
          type="submit"
          className="text-white rounded-lg text-md font-semibold py-3 mt-5 text-center bg-gray-950 border-pink-500 border-t-2 shadow-md shadow-pink-500 hover:scale-105 hover:bg-pink-700 duration-300 transition ease-in-out"
        >
          {/* {t("login.loginButton")} */} Register
        </button>
        <Link href={"/login"} className="text-pink-400 font-bold">
          {" "}
          <span className="text-white text-sm font-semibold">
            Hesabınız zaten var mı giriş yapın
          </span>{" "}
          Login
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;

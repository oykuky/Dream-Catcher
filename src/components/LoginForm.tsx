"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import BlurIn from "@/components/ui/blur-in";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LoginFormInputs {
  username: string;
  password: string;
}

function LoginForm() {
  const t = useTranslations();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
 
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
        <BlurIn
          word={t("login.title")}
          className="text-white dark:text-pink-700"
        />
        <div className="space-y-1">
          <Label htmlFor="username" className="text-white text-sm">
            {t("login.labelName")}
          </Label>
          <Input
            id="username"
            type="text"
            placeholder={t("login.placehldName")}
            {...register("username", { required: "Username is required" })}
            className="rounded-lg h-12 px-2 text-xs bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password" className="text-white text-sm">
            {t("login.labelPassword")}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={t("login.placehldPassword")}
            {...register("password", { required: "Password is required" })}
            className="rounded-lg h-12 px-2 text-xs bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>
        <Button
          type="submit"
          className="text-white rounded-lg text-md font-semibold py-3 text-center bg-gray-950 border-pink-500 border-t-2 shadow-md shadow-pink-500 hover:scale-105 hover:bg-pink-700 duration-300 transition ease-in-out"
        >
          {t("login.button")}
        </Button>
        <Link href="/register" className="text-pink-400 font-bold">
          <span className="text-white text-sm font-semibold">
            {t("login.haveAccQ")}
          </span>{" "}
          {t("login.span")}
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;


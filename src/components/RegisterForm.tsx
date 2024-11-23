"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import BlurIn from "@/components/ui/blur-in";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

function RegisterForm() {
  const t = useTranslations();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
  
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
        <BlurIn
          word={t("register.title")}
          className="text-white dark:text-pink-700"
        />
        <div className="space-y-1">
          <Label htmlFor="username" className="text-white text-sm">
            {t("register.labelName")}
          </Label>
          <Input
            id="username"
            type="text"
            placeholder={t("register.placehldName")}
            {...register("username", { required: "Username is required" })}
            className="rounded-lg h-12 text-xs px-1 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email" className="text-white text-sm">
            {t("register.labelEmail")}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t("register.placehldEmail")}
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address"
              }
            })}
            className="rounded-lg h-12 text-xs px-1 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password" className="text-white text-sm">
            {t("register.labelPassword")}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={t("register.placehldPassword")}
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              }
            })}
            className="rounded-lg h-12 text-xs px-1 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="passwordRepeat" className="text-white text-sm">
            {t("register.labelconfirmpass")}
          </Label>
          <Input
            id="passwordRepeat"
            type="password"
            placeholder={t("register.placehldconfirmpass")}
            {...register("passwordRepeat", { 
              required: "Please confirm your password",
              validate: (value, formValues) => value === formValues.password || "Passwords do not match"
            })}
            className="rounded-lg h-12 text-xs px-1 bg-gray-800 text-gray-200 border border-gray-700 focus:border-pink-600 focus:outline-none"
          />
          {errors.passwordRepeat && <p className="text-red-500 text-xs">{errors.passwordRepeat.message}</p>}
        </div>
        <Button
          type="submit"
          className="text-white rounded-lg text-md font-semibold py-3 mt-5 text-center bg-gray-950 border-pink-500 border-t-2 shadow-md shadow-pink-500 hover:scale-105 hover:bg-pink-700 duration-300 transition ease-in-out"
        >
          {t("register.button")}
        </Button>
        <Link href="/login" className="text-pink-400 font-bold">
          <span className="text-white text-sm font-semibold">
            {t("register.haveAccQ")}
          </span>{" "}
          {t("register.span")}
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;


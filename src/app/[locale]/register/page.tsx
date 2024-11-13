import RegisterForm from "@/components/RegisterForm";
import ShineBorder from "@/components/ui/shine-border";
import React from "react";

function register() {
  return (
    <div className="flex justify-center items-center h-screen px-8 ">
      <ShineBorder
        className="flex items-center justify-center rounded-lg border-none bg-gray-950 md:shadow-xl py-10 lg:px-20 md:px-10 sm:px-8 px-5  w-full max-w-[31.25rem]"
        color={["#5c2ed1", "#c40446", "#710e87"]}
      >
        <RegisterForm />
      </ShineBorder>
    </div>
  );
}

export default register;

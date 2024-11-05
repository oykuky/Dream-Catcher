import LoginForm from "@/components/LoginForm";
import ShineBorder from "@/components/ui/shine-border";
import React from "react";

function login() {
  return (
    <div className="flex justify-center items-cente py-56">
      <ShineBorder
        className="flex h-[580px] items-center justify-center rounded-lg border-none bg-gray-950 md:shadow-xl"
        color={["#5c2ed1", "#c40446", "#710e87"]}
      >
        <LoginForm />
      </ShineBorder>
    </div>
  );
}

export default login;

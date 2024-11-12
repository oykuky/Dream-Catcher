// import Image from 'next/image'
import React from "react";
import SparklesText from "@/components/ui/sparkles-text";
// import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-gray-950 flex justify-center items-center w-3/4 h-28 rounded-2xl border-[4px] border-purple-800 mt-5 mb-10 ">
      <div className="flex flex-col text-center font-bold gap-5">
        <div className="flex justify-center items-center my-5">
          <SparklesText text="Dream Catcher" />
        </div>
      </div>
    </div>
  );
};

export default Header;

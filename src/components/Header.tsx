// import Image from 'next/image'
import React from "react";
import SparklesText from "@/components/ui/sparkles-text";
// import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-gray-950 flex justify-center items-center w-3/4 h-36 rounded-xl border-[4px] border-purple-800 mt-5 mb-10 ">
      <div className="flex flex-col text-center font-bold gap-5">
        <div className="flex justify-center items-center my-5">
          <SparklesText text="Dream Catcher" />
        </div>
        {/* <Image src="/dream-catcher.png" alt='dream-catcher' width={50} height={50} className='rounded-full bg-purple-500 p-1 mr-3'/> */}
        {/* <div className='flex gap-5 justify-evenly'>
                    <h2 className='hover:text-pink-600'>Keşfet</h2>
                    <h2 className='hover:text-pink-600'>Rüya Yorumlat</h2>
                    <a href='/login'><h2 className='hover:text-pink-600'>Login</h2></a>
                </div> */}
      </div>
    </div>
  );
};

export default Header;

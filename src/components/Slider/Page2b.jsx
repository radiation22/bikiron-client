import React from "react";
import slid1 from "../../assets/slideBus.jpg";
import skip from "../../assets/skip.png";
import bus2 from "../../assets/bus2.png";
import { initializeApp } from "firebase/app";

const Page2b = () => {
  return (
    <div className=" pb-[40px]">
      <div className="">
        <img className="w-full" src={slid1} alt="" />
        <div className="mt-[-50px]">
          <p className="text-[#232323] font-bold text-xl">সুবিধাসমূহ</p>
          <p className="text-sm mx-10  text-center mb-10 text-[#474d53]">
            এই অ্যাপটি গুগল ম্যাপিং পরিসেবা দ্বারা গঠিত। যে কেউ অ্যাপ অনলাইনে সে
            যেকোনো স্থান থেকে বা যেকোনো সময় বাসের টিকিট কিনতে পারে। টিকিট নিতে
            এবং বাস সুবিধা নিতে রাস্তায় থাকতে হবে না।
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page2b;

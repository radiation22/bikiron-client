import React from "react";
import slid1 from "../../assets/page2.png";
import skip from "../../assets/skip.png";
import bus2 from "../../assets/bus2.png";
import { initializeApp } from "firebase/app";

const Page2 = () => {
  return (
    <div className=" pb-[40px]">
      <div className="">
        <img className="h-[100px] mx-auto mb-5" src={slid1} alt="" />
        <div className="">
          <p className="text-[#232323] mb-5 font-bold text-xl">
            বিনামূল্যে বই সহজেই
          </p>
          <p className="text-sm mx-5  text-justify mb-10 text-[#474d53]">
            অনলাইন প্ল্যাটফর্মে বিনামূল্যে বই পাওয়া অতি সহজ এবং সহায়ক করেছে
            বিকিরণ পাঠাগার। অতি সহজে পাঠকদের প্রিয় বইগুলি সংগ্রহ করতে পারবে। এই
            সুযোগ সৃষ্টি করেছে শিক্ষা, বৃদ্ধি, এবং মনোরম বই প্রাপ্ত করতে।
            পাঠকদের জন্য এটি একটি অমূল্য সহায়। এটি শিক্ষা এবং বিনোদনের সুযোগ
            সৃষ্টি করে এবং আমাদের সমৃদ্ধিতে অংশগ্রহণ করতে অনুমতি দেয়। এটি একজন
            পাঠকের জীবনে আনন্দ এবং জ্ঞান এনে দিতে সাহায্য করে, সহজেই প্রতিজ্ঞান
            তৈরি করতে।বই এখন আমাদের হাতের মুঠেই এবং অনলাইনে বিনামূল্যে পাওয়া
            যায়। বই বিনামূল্যে পাওয়ার অতি সহজ এবং দ্রুত উপায়।
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page2;

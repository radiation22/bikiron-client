import React from "react";
import slid1 from "../../assets/slidebus2.png";

const Page3b = () => {
  return (
    <div className=" pb-[40px]">
      <div className="">
        <img className="w-full" src={slid1} alt="" />
        <div className="mt-[-50px]">
          <p className="text-[#232323] font-bold text-xl">বাধাহীন ব্যবহার</p>
          <p className="text-sm mx-10 text-center mb-10 text-[#474d53]">
            এই অ্যাপের মাধ্যমে আপনি যেকোনো সময়, যেকোনো জায়গা থেকে টিকিট কিনতে
            পারবেন। অ্যাপ থেকে ইচ্ছে মত টিকিট কাটুন এবং পুরো দিনের জন্য একটি
            টিকিট বা একাধিক টিকিট কিনুন, আপনি টিকিটটি দিনে যে কোন সময় ব্যবহার
            করতে পারবেন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page3b;

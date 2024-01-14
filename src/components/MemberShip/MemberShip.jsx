import React from "react";
import basic from "../../assets/basic.png";
import standard from "../../assets/standard.png";
import premium from "../../assets/premium.png";
import title from "../../assets/title.png";
import { FaCheck } from "react-icons/fa";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const MemberShip = () => {
  return (
    <>
      <div className="px-5 pb-20 md:px-16">
        <div className="py-5">
          <img src={title} alt="" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="border-2 rounded-xl border-yellow-400 p-3">
            <img className="h-32 py-5 mx-auto" src={basic} alt="" />
            <hr />
            <div className="my-10 p-5 space-y-4">
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">
                  রেজিষ্ট্রেশন ফি- ৩৫ টাকা।
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">মেয়াদ- ৪৫ দিন।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">ফেরত দেওয়ার সময়- ৭ দিন।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">ফেরতযোগ্য টাকা ৫০ টাকা।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">পুনরায় ইস্যু গ্রহণযোগ্য।</span>
              </p>
            </div>
            <div className="text-center">
              <Link to="/register">
                {" "}
                <button className="px-5 mb-8  py-2 rounded-xl text-white bg-[#50AE2A]">
                  নির্বাচন করুন
                </button>
              </Link>
            </div>
          </div>
          <div className="border-2 rounded-xl border-yellow-400 p-3">
            <img className="h-32 py-5 mx-auto" src={standard} alt="" />
            <hr />
            <div className="my-10 p-5 space-y-4">
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">
                  রেজিষ্ট্রেশন ফি- ৪৫ টাকা।
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">মেয়াদ- ৬০ দিন।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">ফেরত দেওয়ার সময়- ১২ দিন।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">ফেরতযোগ্য টাকা ১০০ টাকা।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">পুনরায় ইস্যু গ্রহণযোগ্য।</span>
              </p>
            </div>
            <div className="text-center">
              <Link to="/register">
                {" "}
                <button className="px-5 mb-8  py-2 rounded-xl text-white bg-[#50AE2A]">
                  নির্বাচন করুন
                </button>
              </Link>
            </div>
          </div>
          <div className="border-2 rounded-xl border-yellow-400 p-3">
            <img className="h-32 py-5 mx-auto" src={premium} alt="" />
            <hr />
            <div className="my-10 p-5 space-y-4">
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">
                  রেজিষ্ট্রেশন ফি- ৭৫ টাকা।
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">মেয়াদ- ৮০ দিন।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">ফেরত দেওয়ার সময়- ১৬ দিন।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">ফেরতযোগ্য টাকা ১৫০ টাকা।</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheck className="text-[#50AE2A]"></FaCheck>
                <span className="text-[#F5438E]">পুনরায় ইস্যু গ্রহণযোগ্য।</span>
              </p>
            </div>
            <div className="text-center">
              <Link to="/register">
                {" "}
                <button className="px-5 mb-8  py-2 rounded-xl text-white bg-[#50AE2A]">
                  নির্বাচন করুন
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MemberShip;

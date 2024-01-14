import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useQuery } from "@tanstack/react-query";

const AllPackages = () => {
  const queryKey = ["packages"];

  // Use the useQuery hook to fetch data
  const { data: packages = [], refetch } = useQuery(queryKey, async () => {
    const url = `https://bikiron-server.vercel.app/allPackages`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  });
  return (
    <>
      <div className="pb-20">
        <h1 className="text-center text-2xl py-5 font-bold">
          আমাদের সব আকর্ষণীয় প্যাকেজ উপভোগ করুন
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {packages.map((pack, idx) => (
            <div
              key={pack.id}
              className="border border-purple-700 my-2 p-4 mx-3 rounded"
            >
              <h1 className="text-xl text-[#52B94C]">{pack.title}</h1>
              <div className="flex mt-2 gap-4">
                <Link to={`/details/${pack.packageNo1?.name}`}>
                  <button className="bg-cyan-600 px-5 py-2 text-white rounded-lg">
                    প্যাকেজ -১
                  </button>
                </Link>
                <Link to={`/details/${pack.packageNo2?.name}`}>
                  <button className="bg-cyan-600 px-5 py-2 text-white rounded-lg">
                    প্যাকেজ -২
                  </button>
                </Link>
                <Link to={`/details/${pack.packageNo3?.name}`}>
                  {" "}
                  <button className="bg-cyan-600 px-5 py-2 text-white rounded-lg">
                    প্যাকেজ -৩
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AllPackages;

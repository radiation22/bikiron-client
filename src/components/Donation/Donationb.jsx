import React, { useContext } from "react";
import cup1 from "../../assets/cup1.png";
import cup2 from "../../assets/cup2.png";
import donate from "../../assets/donate2.png";
import { FaAngleRight } from "react-icons/fa";
import homepic from "../../assets/donateHome.png";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Navbarb from "../Navbar/Navbarb";
import Footerb from "../Footer/Footerb";

const Donationb = () => {
  const { user } = useContext(AuthContext);

  // Define the query key
  const queryKey = ["tickets", user?.email];

  // Use the useQuery hook to fetch data
  const { data: tickets = [], refetch } = useQuery(
    queryKey,
    async () => {
      const url = `https://e-wallet-server.vercel.app/myTicket?email=${user?.email}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    {
      enabled: !!user?.email, // Only fetch data when user.email is available
    }
  );

  // Calculate the total donation value
  const totalDonation = tickets.reduce((total, ticket) => {
    // Assuming each ticket has a 'donation' property
    return total + ticket?.donation;
  }, 0);

  return (
    <>
      <Navbarb />
      <div className="h-screen">
        <img className="h-[180px] mt-8 mx-auto" src={homepic} alt="" />
        <h2 className="text-center text-xl py-5 font-bold uppercase text-[#00A63A]">
          Make a donation today!
        </h2>
        <div className="bg-white py-5 mx-6 rounded-2xl text-center space-y-5">
          <p className="text-[#A6B1C1]">Your total donated amount is</p>
          <input
            readOnly
            value=""
            placeholder={`${totalDonation} tk`}
            className="w-[60%] border-b text-center text-[#869097] focus:outline-none"
            type="text"
          />
          <button className="bg-[#9DDE2A] drop-shadow-xl rounded-full px-8 py-1 text-white">
            Learn About Donate
          </button>
          <div className="flex justify-center gap-2">
            {totalDonation == "100" ? (
              <>
                <img className="h-7" src={cup1} alt="" />
              </>
            ) : (
              <>
                <img className="h-7" src={cup2} alt="" />
              </>
            )}

            {totalDonation == "200" ? (
              <>
                <img className="h-7" src={cup1} alt="" />
              </>
            ) : (
              <>
                <img className="h-7" src={cup2} alt="" />
              </>
            )}
            {totalDonation == "300" ? (
              <>
                <img className="h-7" src={cup1} alt="" />
              </>
            ) : (
              <>
                <img className="h-7" src={cup2} alt="" />
              </>
            )}
            {totalDonation == "400" ? (
              <>
                <img className="h-7" src={cup1} alt="" />
              </>
            ) : (
              <>
                <img className="h-7" src={cup2} alt="" />
              </>
            )}
            {totalDonation == "500" ? (
              <>
                <img className="h-7" src={cup1} alt="" />
              </>
            ) : (
              <>
                <img className="h-7" src={cup2} alt="" />
              </>
            )}
          </div>
        </div>
        <div className="bg-white mx-6 rounded-full py-3 px-5 mt-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <img className="h-6" src={donate} alt="" />
              <p>Donation History</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
      </div>
      <Footerb></Footerb>
    </>
  );
};

export default Donationb;

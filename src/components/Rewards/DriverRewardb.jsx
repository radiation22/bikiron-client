import React, { useEffect, useState } from "react";
import DriverNav from "../Navbar/DriverNav";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import sun from "../../assets/sun.png";
import star from "../../assets/star.png";
import { FaAngleRight } from "react-icons/fa";
import DriverFooter from "../Footer/DriverFooter";
import DriverFooterb from "../Footer/DriverFooterb";
import DriverNavb from "../Navbar/DriverNavb";
const DriverRewardb = () => {
  const { user } = useContext(AuthContext);

  const [trip, setTrip] = useState([]);
  useEffect(() => {
    // Fetch data from the URL
    fetch(`https://e-wallet-server.vercel.app/myTrip?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
        const yyyy = today.getFullYear();
        const formattedDate = `${dd}/${mm}/${yyyy}`;
        const todayTrips = data.filter((trip) => {
          return trip.formattedDate === formattedDate;
        });
        // console.log(todayTrips);
        setTrip(todayTrips);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <DriverNavb></DriverNavb>
      <div className="pt-10 pb-28">
        <img
          className="rounded-full h-12 w-12 mx-auto"
          src={user?.photoURL}
          alt=""
        />
        <h1 className="text-center">{user?.displayName}</h1>
        <div></div>
        <div className="flex items-center border rounded-full p-1 justify-center mx-auto w-[35%]">
          <img className="h-6" src={sun} alt="" />
        </div>
        {/* <div className="bg-[#FE9F0D] rounded-full mt-4 mx-5 py-2">
          <p className="text-center text-white">Gold</p>
          <div
            className="rounded-full  h-[7px] mx-5 mb-3 mt-1 bg-white"
            style={{ width: progressBarWidth }}
          ></div>
        </div> */}

        <div className="bg-white p-4 rounded-2xl mt-5 mx-5">
          <div className="flex justify-between">
            <h1 className="text-[#0DAB46]">Bonus</h1>
            <p className="text-[#9DDE2A]">View all</p>
          </div>
          <hr className="mt-2 mb-4" />
          {/* Render Cash Back reward if enabled */}

          <div className="flex gap-3 items-center justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "70px",
                  height: "70px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-white font-bold text-center">
                  {100 * trip?.length}
                  <br /> tk
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              You get this bonus for yours todays completing trips.
            </p>
            <button className="bg-[#96A6B6] py-2 px-4 rounded-full">
              Claim
            </button>
          </div>
        </div>

        <div className="bg-white mx-6 rounded-full py-3 px-5 mt-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <img className="h-6" src={star} alt="" />
              <p>Points History</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        <div className="text-center py-3">
          <button className="bg-[#05A83F] text-white rounded-full px-3 py-1">
            Learn More
          </button>
        </div>
      </div>
      <DriverFooterb></DriverFooterb>
    </>
  );
};

export default DriverRewardb;

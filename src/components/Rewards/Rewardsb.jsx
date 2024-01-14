import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import sun from "../../assets/sun.png";
import star from "../../assets/star.png";
import { FaAngleRight } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbarb from "./../Navbar/Navbarb";
import Footerb from "./../Footer/Footerb";

const Rewardsb = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Define the query key
  const queryKey = ["tickets", user?.email];

  // Use the useQuery hook to fetch data
  const { data: tickets = [], refetch } = useQuery(
    queryKey,
    async () => {
      const url = `https://e-wallet-server.vercel.app/myTicket?email=${user?.email}`;
      const res = await fetch(url);
      const data = await res.json();
      const count = data?.filter((tik) => tik?.status == "checked");
      // console.log(count);
      return count;
    },
    {
      enabled: !!user?.email, // Only fetch data when user.email is available
    }
  );
  const points = 10 + 10 * tickets?.length; // Replace with the actual points
  const totalPointsGoal = 11360; // Replace with your total points goal

  // Calculate the progress percentage
  const progressPercentage = (points / totalPointsGoal) * 100;

  // Calculate the width of the progress bar based on the progress percentage
  const progressBarWidth = `${progressPercentage}%`;

  // Define whether each reward is enabled based on points
  const isCashBackEnabled = points >= 110; //10 ticket
  const isFreeRideEnabled = points >= 310; // 20 ticket
  const isFreeRingEnabled = points >= 710; //40 ticket
  const isFreeGlassEnabled = points >= 1410; //70 ticket
  const isFreeCapEnabled = points >= 2410; //100 ticket
  const isFreeTwoRideEnabled = points >= 3910; //150 ticket
  const isFreeShirtEnabled = points >= 5910; //200 ticket
  const isFreeWatchEnabled = points >= 8410; //250 ticket
  const isFreeMugEnabled = points >= 11410; //300 ticket

  const claims = {
    status: "Pending",
    email: user?.email,
  };

  const handleCollectButtonClick = () => {
    fetch("https://e-wallet-server.vercel.app/addClaim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(claims),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Enjoy Claim");
          navigate("/claimb");
          refetch();
        }
      });
    // setIsButtonClicked(true);
  };

  const handleSilver = () => {
    document.getElementById("silver").style.display = "block";
  };

  return (
    <>
      <Navbarb></Navbarb>
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
          <p className="text-[#9FDF29]">{points} Points</p>
        </div>
        <div className="bg-[#FE9F0D] rounded-full mt-4 mx-5 py-2">
          {points <= 2360 ? (
            <p className="text-center font-bold text-white">ব্রোঞ্জ</p>
          ) : points <= 11360 ? (
            <p className="text-center font-bold text-white">সিল্ভার</p>
          ) : (
            <p className="text-center font-bold text-white">গোল্ড</p>
          )}

          <div
            className="rounded-full  h-[7px] mx-5 mb-3 mt-1 bg-white"
            style={{ width: progressBarWidth }}
          ></div>
        </div>

        <div className="bg-white p-4 rounded-2xl mt-5 mx-5">
          <div className="flex justify-between">
            <h1 className="text-[#0DAB46]">Rewards</h1>
            <p onClick={handleSilver} className="text-[#9DDE2A] cursor-pointer">
              View all
            </p>
          </div>
          <hr className="mt-2 mb-4" />
          {/* Render Cash Back reward if enabled */}

          <div className="flex gap-3 items-center justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  Free <br /> Ride
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy a free ride with using claim
            </p>
            <Link to="/claim">
              {isCashBackEnabled ? (
                <button
                  onClick={handleCollectButtonClick}
                  className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                  disabled={!isCashBackEnabled} // Disable the button if not enabled
                >
                  Claim
                </button>
              ) : (
                <button
                  onClick={handleCollectButtonClick}
                  className="bg-[#a3a899] py-2 px-4 rounded-full"
                  disabled={!isCashBackEnabled} // Disable the button if not enabled
                >
                  Claim
                </button>
              )}
            </Link>
          </div>

          {/* Render Free Ride reward if enabled */}

          <div className="flex gap-3 items-center mt-3 justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  Snack <br /> Pack
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy Snack Pack with using claim
            </p>
            {isFreeRideEnabled ? (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                disabled={!isFreeRideEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            ) : (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#a3a899] py-2 px-4 rounded-full"
                disabled={!isFreeRideEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center mt-3 justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  Key <br /> Ring
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy Key Ring with using claim
            </p>
            {isFreeRingEnabled ? (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                disabled={!isFreeRingEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            ) : (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#a3a899] py-2 px-4 rounded-full"
                disabled={!isFreeRingEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center mt-3 justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  Sun <br /> Glass
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy Sun Glass with using claim
            </p>
            {isFreeGlassEnabled ? (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                disabled={!isFreeGlassEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            ) : (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#a3a899] py-2 px-4 rounded-full"
                disabled={!isFreeGlassEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center mt-3 justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  Sun <br /> Cap
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy Sun Cap with using claim
            </p>
            {isFreeCapEnabled ? (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                disabled={!isFreeCapEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            ) : (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#a3a899] py-2 px-4 rounded-full"
                disabled={!isFreeCapEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            )}
          </div>
        </div>

        {/* this is for silver stage */}

        <div id="silver" className="bg-white p-4 hidden rounded-2xl mt-5 mx-5">
          <div className="flex justify-between">
            <h1 className="text-[#0DAB46]">Silver</h1>
          </div>
          <hr className="mt-2 mb-4" />
          {/* Render Cash Back reward if enabled */}

          <div className="flex gap-3 items-center justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  Two <br /> Ride
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy a Two ride with using claim
            </p>
            <Link to="/claim">
              {isFreeTwoRideEnabled ? (
                <button
                  onClick={handleCollectButtonClick}
                  className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                  disabled={!isFreeTwoRideEnabled} // Disable the button if not enabled
                >
                  Claim
                </button>
              ) : (
                <button
                  onClick={handleCollectButtonClick}
                  className="bg-[#a3a899] py-2 px-4 rounded-full"
                  disabled={!isFreeTwoRideEnabled} // Disable the button if not enabled
                >
                  Claim
                </button>
              )}
            </Link>
          </div>

          {/* Render Free Ride reward if enabled */}

          <div className="flex gap-3 items-center mt-3 justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  T- <br /> Shirt
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy a T-shirt with using claim
            </p>
            {isFreeShirtEnabled ? (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                disabled={!isFreeShirtEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            ) : (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#a3a899] py-2 px-4 rounded-full"
                disabled={!isFreeShirtEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center mt-3 justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  Hand <br /> Watch
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy hand watch with using claim
            </p>
            {isFreeWatchEnabled ? (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                disabled={!isFreeWatchEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            ) : (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#a3a899] py-2 px-4 rounded-full"
                disabled={!isFreeWatchEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center mt-3 justify-between">
            <div className="w-[20%]">
              <div
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "#9DDE2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="text-sm">
                  Small <br /> Mug
                </p>
              </div>
            </div>
            <p className="w-[60%] text-sm text-[#96A6B6]">
              Enjoy a Mug with using claim
            </p>
            {isFreeMugEnabled ? (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#9DDE2A] py-2 px-4 rounded-full"
                disabled={!isFreeMugEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            ) : (
              <button
                onClick={handleCollectButtonClick}
                className="bg-[#a3a899] py-2 px-4 rounded-full"
                disabled={!isFreeMugEnabled} // Disable the button if not enabled
              >
                Claim
              </button>
            )}
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

      <Footerb></Footerb>
    </>
  );
};

export default Rewardsb;

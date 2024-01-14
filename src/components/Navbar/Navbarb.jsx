import React, { useContext, useState, useRef, useEffect } from "react";
import { FaBell, FaChartLine, FaSearch, FaUser } from "react-icons/fa";
import { FaGear, FaHandHoldingDollar, FaGift } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ticket from "../../assets/ticket.png";
import reward from "../../assets/reward.png";
import reward2 from "../../assets/gift2.png";
import donate from "../../assets/donate.png";
import donate2 from "../../assets/donate2.png";
import more from "../../assets/more.png";
import more2 from "../../assets/moreactive.png";
import search from "../../assets/search.png";
import bell from "../../assets/bell.png";
import bus from "../../assets/bus1.png";
import ticket2 from "../../assets/ticket2.png";
import { useQuery } from "@tanstack/react-query";

const Navbarb = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const [balance, setBalance] = useState(0);
  const [ticketCost, setTicketCost] = useState(0);

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

  // Calculate the total cost from the tickets data and update the state
  useEffect(() => {
    const totalTicketCost = tickets.reduce(
      (total, ticket) => total + ticket.totalCost,
      0
    );

    // Update the ticketCost state with the calculated total cost
    setTicketCost(totalTicketCost);
    refetch();
  }, [tickets, ticketCost]);

  useEffect(() => {
    const url = `https://e-wallet-server.vercel.app/myBalance?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const balance = data.map((bal) => setBalance(bal.balance));
        refetch();
      });
  }, [user]);

  const handleNotificationClick = () => {
    setNotificationCount(0);
    navigate("/notificationb");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <header className="bg-[#04A83F] w-full px-3 text-white pt-1">
        <div className="container mx-auto flex items-center">
          <div className="flex">
            {/* Add the user icon */}
            <div className="mr-4">
              <img className="h-6" src={bus} alt="" />
            </div>
            {/* Add the cog icon */}
            <div className="mr-4">
              <img className="h-6" src={search} alt="" />
            </div>
            <div>
              <input
                readOnly
                className="text-black rounded-full ps-3 outline outline-yellow-400 w-[50%]"
                value={`${balance - ticketCost} tk`}
                type="text"
              />
            </div>
          </div>
          <div className="flex-grow relative"></div>
          <div className="ml-4 flex items-center">
            <button className="mr-4" onClick={handleNotificationClick}>
              <div className="relative">
                <img className="h-6" src={bell} alt="" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1">
                    {notificationCount}
                  </span>
                )}
              </div>
            </button>
            <div
              className="flex flex-col items-center py-4 relative"
              onClick={toggleDropdown}
            >
              {/* Add your user profile image */}
              <Link to="/settingb">
                {" "}
                <img
                  className="rounded-full h-6 w-6"
                  src={user?.photoURL}
                  alt=""
                />
              </Link>
              {/* {showDropdown && (
                <div
                  className="absolute w-[80px] top-10 right-0 bg-rose-400 border shadow-lg rounded-md"
                  ref={dropdownRef}
                >
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-2 py-1 text-left hover:bg-red-500 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </header>

      <footer className="bg-[#9DDE2A] w-full  text-white">
        <div className="container mx-auto flex justify-around">
          <NavLink
            to="/myTicketb"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col bg-white  px-4 py-3  items-center cursor-pointer"
                : "flex flex-col  mt-1 py-2 items-center cursor-pointer"
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <img className="w-8 h-5" src={ticket2} alt="" />
                    <span className="text-green-600 mt-1">টিকিট</span>
                  </>
                ) : (
                  <>
                    <img className="w-8 h-5" src={ticket} alt="" />
                    <span className="mt-1">টিকিট</span>
                  </>
                )}
              </>
            )}
          </NavLink>
          <NavLink
            to="/rewardsb"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col bg-white  px-4 py-3  items-center cursor-pointer"
                : "flex flex-col  mt-1 items-center py-2 cursor-pointer"
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <img className="w-8 h-6" src={reward2} alt="" />
                    <span className=" text-green-600">আপনার গিফট</span>
                  </>
                ) : (
                  <>
                    <img className="w-8 h-6" src={reward} alt="" />
                    <span className="">আপনার গিফট</span>
                  </>
                )}
              </>
            )}
          </NavLink>
          <NavLink
            to="/donationb"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col bg-white  px-4 py-3  items-center cursor-pointer"
                : "flex flex-col  mt-1 items-center py-2 cursor-pointer"
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <img className="w-8 h-6" src={donate2} alt="" />
                    <span className=" text-green-600">ডোনেট</span>
                  </>
                ) : (
                  <>
                    <img className="w-8 h-6" src={donate} alt="" />
                    <span className="">ডোনেট</span>
                  </>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/moreb"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col bg-white  px-4 py-3  items-center cursor-pointer"
                : "flex flex-col  mt-1 items-center py-2 cursor-pointer"
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <img className="w-6 h-6" src={more2} alt="" />
                    <span className=" text-green-600">আরো</span>
                  </>
                ) : (
                  <>
                    <img className="w-6 h-6" src={more} alt="" />
                    <span className="">আরো</span>
                  </>
                )}
              </>
            )}
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default Navbarb;

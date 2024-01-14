import React, { useContext, useState, useRef } from "react";
import { FaBell, FaChartLine, FaSearch, FaUser } from "react-icons/fa";
import { FaGear, FaHandHoldingDollar, FaGift } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
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
import { useEffect } from "react";

const DriverNav = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const url = `https://e-wallet-server.vercel.app/driverBalance?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const balance = data.map((bal) => setBalance(bal?.balance));
        refetch();
      });
  }, [user]);

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        toast.success("You have logged out");
        navigate("/login2");
      })
      .catch((error) => console.log(error));
  };

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <>
      <header className="bg-[#04A83F] w-full px-3 text-white pt-1">
        <div className="container mx-auto flex items-center">
          <div className="flex">
            <div className="mr-4">
              <img className="h-6" src={bus} alt="" />
            </div>

            <div className="mr-4">
              <img className="h-6" src={search} alt="" />
            </div>
          </div>
          <div className="flex-grow relative"></div>
          <div className="ml-4 flex items-center">
            <input
              readOnly
              className="text-black text-center rounded-full ps-3 outline outline-yellow-400 mr-3 cursor-pointer"
              onClick={toggleBalanceVisibility}
              value={isBalanceVisible ? `${balance} BDT` : "Balance"}
              type="text"
            />
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
              <img
                className="rounded-full h-6 w-6"
                src={user?.photoURL}
                alt=""
              />
              {showDropdown && (
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
              )}
            </div>
          </div>
        </div>
      </header>

      <footer className="bg-[#9DDE2A] w-full  text-white">
        <div className="container mx-auto flex justify-around">
          <NavLink
            to="/trip"
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
                    <span className="text-green-600 mt-1">Trips</span>
                  </>
                ) : (
                  <>
                    <img className="w-8 h-5" src={ticket} alt="" />
                    <span className="mt-1">Trips</span>
                  </>
                )}
              </>
            )}
          </NavLink>
          <NavLink
            to="/driverReward"
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
                    <span className=" text-green-600">Your Gift</span>
                  </>
                ) : (
                  <>
                    <img className="w-8 h-6" src={reward} alt="" />
                    <span className="">Your Gift</span>
                  </>
                )}
              </>
            )}
          </NavLink>
          <NavLink
            to="/driverDonate"
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
                    <span className=" text-green-600">Donate</span>
                  </>
                ) : (
                  <>
                    <img className="w-8 h-6" src={donate} alt="" />
                    <span className="">Donate</span>
                  </>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/driverMore"
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
                    <span className=" text-green-600">More</span>
                  </>
                ) : (
                  <>
                    <img className="w-6 h-6" src={more} alt="" />
                    <span className="">More</span>
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

export default DriverNav;

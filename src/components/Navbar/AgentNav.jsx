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

const AgentNav = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [balance, setBalance] = useState(0);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const url = `https://e-wallet-server.vercel.app/agentBalance?email=${user?.email}`;
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
        navigate("/agent");
      })
      .catch((error) => console.log(error));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
            {/* Add the user icon */}
            <div className="mr-4">
              <img className="h-6" src={bus} alt="" />
            </div>
            {/* Add the cog icon */}
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
            <button className="mr-4">
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
              <Link to="">
                <img
                  onClick={toggleDropdown}
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
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AgentNav;

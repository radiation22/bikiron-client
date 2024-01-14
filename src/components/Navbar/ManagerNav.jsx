import React, { useContext, useEffect, useState } from "react";
import { FaBell, FaChartLine, FaSearch, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManagerNav = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Add state for the dropdown
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch data from the URL
    fetch("https://e-wallet-server.vercel.app/trips")
      .then((response) => response.json())
      .then((data) => {
        const notificationLength = data.filter(
          (noti) => noti.status === "Pending"
        );
        console.log();
        setNotificationCount(notificationLength?.length);
        setTrips(notificationLength);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleApprove = (id) => {
    const reviews = {
      status: "Approved",
    };

    const url = `https://e-wallet-server.vercel.app/adminApprove/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviews),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        toast.success("Trip Confirm");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        toast.success("You have logged out");
        navigate("/admin");
      })
      .catch((error) => console.log(error));
  };

  const toggleSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNotificationClick = () => {
    // Toggle the dropdown when notification icon is clicked
    toggleDropdown();
  };

  return (
    <>
      <header className="bg-[#BF1B21] w-full text-white p-4">
        <div className="container mx-auto flex items-center">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 text-gray-900 placeholder-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <FaSearch className="text-2xl text-gray-400" />
            </div>
          </div>
          <div className="ml-4 flex items-center">
            <button className="mr-4" onClick={handleNotificationClick}>
              <div className="relative">
                <FaBell className="text-2xl" /> {/* Notification icon */}
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1">
                    {notificationCount}
                  </span>
                )}
              </div>
              {/* Dropdown menu for notifications */}
              {showDropdown && notificationCount > 0 && (
                <div className="absolute top-12 right-5 bg-white text-black w-[200px] shadow-md rounded-md">
                  <table className="border-collapse border">
                    <tbody>
                      {trips
                        .slice()
                        .reverse()
                        .map((trip) => (
                          <tr key={trip._id} className="text-center">
                            <td className="border p-2">Trip: 0{trip.trip}</td>
                            <td className="border p-2">Bus: 0{trip.busNo}</td>
                            <td className="border p-2">
                              <button
                                onClick={() => handleApprove(trip._id)}
                                className="bg-red-500 px-2  py-1 rounded-md text-white"
                              >
                                Approve
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </button>
            <div className="flex flex-col items-center">
              <FaUser
                className="text-2xl cursor-pointer"
                onClick={toggleSignOut}
              />
              {/* User icon */}
              <span className="ml-2 text-lg">{user?.displayName}</span>
              {/* Display user's name */}
            </div>
            {/* User icon */}
            {showSignOut && (
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default ManagerNav;

import React, { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaGear, FaHandHoldingDollar, FaGift } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import CartDropdown from "./CartDropdown";

const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);
  // const [cartItems, setCartItems] = useState([]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  // Define the query key
  const queryKey = ["tickets", user?.email];

  // Use the useQuery hook to fetch data
  const { data: cartItems = [], refetch } = useQuery(
    queryKey,
    async () => {
      const url = `https://bikiron-server.vercel.app/cart`;
      const res = await fetch(url);
      const data = await res.json();
      const myCart = data.filter((d) => d?.email === user?.email);
      setLoading(false);
      return myCart;
    },
    {
      enabled: !!user?.email, // Only fetch data when user.email is available
    }
  );

  return (
    <>
      <header className="bg-[#50AE2A] w-full px-3 text-white pt-1">
        <div className="container mx-auto flex items-center justify-between">
          <div></div>

          <div className="ml-4 flex items-center">
            <button className="mr-4">
              <div className="relative">
                <FaShoppingCart onClick={toggleDropdown} className="text-2xl" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1">
                    {notificationCount}
                  </span>
                )}
              </div>
            </button>
            <div className="flex flex-col items-center py-4 relative">
              {/* Add your user profile image */}
              <Link to="/setting">
                {" "}
                <img
                  className="rounded-full h-6 w-6"
                  src={user?.photoURL}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
        {showDropdown && (
          <CartDropdown
            loading={loading}
            cartItems={cartItems}
            refetch={refetch}
            onClose={closeDropdown}
          />
        )}
      </header>
    </>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Map2 from "./Map2";
import { useNavigate } from "react-router-dom";
import busIcon from "../../assets/busIcon.png";
import icon1 from "../../assets/mapBus.png";
import Navbarb from "../Navbar/Navbarb";
import Footerb from "../Footer/Footerb";

const Locationb = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBus, setSelectedBus] = useState("");
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();
  const url = `https://e-wallet-server.vercel.app/drivers`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDrivers(data));
    console.log(drivers);
  }, []);

  const handleChooseBusClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleBusSelect = (value) => {
    setSelectedBus(value);
    setShowDropdown(false);
    navigate(`/chooseBusb/${value}`);
  };

  const busOptions = [
    { value: "bus1", label: "Bus 1" },
    { value: "bus2", label: "Bus 2" },
    { value: "bus3", label: "Bus 3" },
    { value: "bus4", label: "Bus 4" },
    // Add more bus options here
  ];

  return (
    <>
      <Navbarb />
      <div>
        <div className="bg-[#48BA72] text-center text-white p-4">
          <h2 className="text-2xl font-bold">
            আপনার জন্য 4টি বাস অপেক্ষা করছে{" "}
          </h2>
          <p>Please choose your bus according to your expected route</p>
        </div>
        <div className="relative">
          <Map2 />
        </div>
        <div className="absolute bottom-[100px] left-[30%] flex flex-col items-center text-center justify-center">
          {showDropdown ? null : (
            <>
              <img className="h-[50px] mb-[-10px] z-40" src={busIcon} alt="" />
            </>
          )}
          <button
            className="bg-[#04A83F] px-5 py-2 z-0  rounded-full font-bold text-white uppercase text-lg"
            onClick={handleChooseBusClick}
          >
            বাস সিলেক্ট
          </button>
          {showDropdown && (
            <ul className="absolute top-[-140px] z-0  left-[9%] border shadow-lg rounded-xl bg-[#9DDE2A]">
              {busOptions.map((option) => (
                <li
                  // key={option._id}
                  onClick={() => handleBusSelect(option.label)}
                  className="cursor-pointer w-[125px] py-1 border px-8 hover:bg-gray-200"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
          <div>
            <img
              className="h-6 absolute bottom-[180px] left-[-100px]"
              src={icon1}
              alt=""
            />
            <img
              className="h-6 absolute bottom-[180px] left-[100px]"
              src={icon1}
              alt=""
            />
          </div>
        </div>
      </div>
      <Footerb />
    </>
  );
};

export default Locationb;

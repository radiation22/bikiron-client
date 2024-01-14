import React, { useContext, useEffect, useState } from "react";
import user from "../../assets/user2.png";
import lang from "../../assets/lang.png";
import mode from "../../assets/night.png";
import notification from "../../assets/noti2.png";
import help from "../../assets/help.png";
import sign from "../../assets/signout.png";
import { FaAngleRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import icon from "../../assets/left2.png";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Setting = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  const [library, setLibrary] = useState([]);
  const [member, setMember] = useState({});
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        toast.success("You have logged out");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Fetch data from the URL
    fetch("https://bikiron-server.vercel.app/member")
      .then((response) => response.json())
      .then((data) => {
        const myLibrary = data.find((d) => d?.email === user?.email);
        setMember(myLibrary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [library]);

  useEffect(() => {
    // Fetch data from the URL
    fetch("https://bikiron-server.vercel.app/library")
      .then((response) => response.json())
      .then((data) => {
        const myLibrary = data.find((d) => d?.email === user?.email);
        setLibrary(myLibrary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [library]);

  return (
    <>
      <Navbar></Navbar>
      <div>
        <Link to="/allLibrary">
          {" "}
          <img className="h-10 pl-6 mt-10" src={icon} alt="" />
        </Link>
        {member?.status === "pending" ? (
          <p className="text-center font-bold">
            Membership: <span className="uppercase">Pending</span>
          </p>
        ) : (
          <p className="text-center text-[#F5438E] font-bold">
            Membership:{" "}
            <span className="uppercase">
              {member?.selectedMembership} Package
            </span>
          </p>
        )}
        <p className="mx-6 mt-6 text-[#4d5155]">Account</p>
        <Link to="/profile">
          <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                <img className="h-6" src={user} alt="" />
                <p>My Profile</p>
              </div>
              <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
            </div>
          </div>
        </Link>
        {library && (
          <Link to="/myLibrary">
            <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-3">
              <div className="flex justify-between items-center">
                <div className="flex gap-5">
                  <img className="h-6" src={user} alt="" />
                  <p>My Library</p>
                </div>
                <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
              </div>
            </div>
          </Link>
        )}
        <p className="mx-6 mt-6 mb-3 text-[#4d5155]">Setting</p>
        <div className="bg-white mx-6 rounded-lg py-3 px-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <img className="h-6" src={mode} alt="" />
              <p>Night Mode</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        {/* <Link to="/notification">
          <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                <img className="h-6" src={notification} alt="" />
                <p>Notification</p>
              </div>
              <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
            </div>
          </div>
        </Link> */}
        <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <img className="h-6" src={lang} alt="" />
              <p>Language</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        {/* <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <img className="h-6" src={help} alt="" />
              <p>Help</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div> */}
        <div
          onClick={handleSignOut}
          className="bg-white mx-6 rounded-lg py-3 px-5 mt-1"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <img className="h-6" src={sign} alt="" />
              <p>Sign Out</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Setting;

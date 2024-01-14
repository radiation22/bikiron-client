import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/2nd logo.png";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
const UserAccount = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-[#50AE2A] h-screen">
        <div className="px-3 py-8">
          <div className="w-full">
            <Link to="/allPackage">
              <div className="bg-[#F7F210] flex justify-center rounded items-center h-[150px]">
                <div>
                  <p className="text-black text-2xl font-bold text-center">
                    গিফট প্যাকেজ
                  </p>
                  <p className="text-black text-center">(Gift Package)</p>
                </div>
              </div>
            </Link>
            <Link to={`/fullLibrary/${email}`}>
              <div className="bg-[#F7F210] mt-5 rounded flex justify-center items-center h-[150px]">
                <div>
                  <p className="text-black text-2xl font-bold text-center">
                    সমগ্র লাইব্রেরি
                  </p>
                  <p className="text-black text-center">(Whole Library)</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default UserAccount;

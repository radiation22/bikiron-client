import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import bg from "../../assets/signbg.jpg";
import logo from "../../assets/bikironlog.png";
import icon from "../../assets/leftarrow.png";
import { toast } from "react-toastify";
import { FaAngleRight, FaEnvelope, FaLock } from "react-icons/fa";
import userPlus from "../../assets/userplus.png";
import question from "../../assets/question.png";
import Loader from "../Loader/Loader";
import gmail from "../../assets/gmail.png";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import Footer from "../Footer/Footer";
const UserWelcome = () => {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Sign In
  const [selectedFile, setSelectedFile] = useState(null); // Track the selected image file
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        toast.success("Login Successfully");
        navigate("/location");
        window.reload();
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <Link to="/account">
        <div>
          <img className="h-12 pt-4 pl-4" src={icon} alt="" />
        </div>
      </Link>
      <div className="flex justify-center pt-12 pb-12 ">
        <img className="h-20" src={logo} alt="" />
      </div>
      <div className="flex justify-center w-[85%] mx-auto  items-center">
        <div className="flex w-full flex-col py-10 px-8 shadow  bg-white rounded-[25px] sm:p-10  text-gray-900">
          <div>
            <h2 className=" text-4xl text-center  uppercase text-[#0B9C74]">
              Welcome!
            </h2>
            <p className="text-center text-[#A8B5C3] mt-5 text-sm mb-3">
              Already a member?
            </p>
          </div>
          <div>
            <Link to="/login">
              {" "}
              <button
                type="submit"
                className="w-full px-8 py-4 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
              >
                Sign In
              </button>
            </Link>
          </div>
          <div>
            <p className="text-center text-[#A8B5C3] mt-7 text-sm mb-4">
              New for this app?
            </p>
          </div>
          <div>
            <Link to="/register">
              <button
                type="submit"
                className="w-full px-8 py-4 drop-shadow-xl rounded-full border border-[#58BA9F]  text-[#58BA9F]"
              >
                New Registration
              </button>
            </Link>
          </div>
          <div className="flex items-center mt-8">
            <div className="w-[20%] bg-[#A8B5C3] h-[1px]"></div>
            <p className="text-[#A8B5C3] px-2 text-sm">or connect using</p>
            <div className="w-[20%] bg-[#A8B5C3] h-[1px]"></div>
          </div>
          <div>
            <img
              onClick={handleGoogleSignIn}
              className="h-8 mx-auto mt-5"
              src={gmail}
              alt=""
            />
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default UserWelcome;

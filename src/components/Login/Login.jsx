import React, { useRef, useState } from "react";
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
import ForgotPassword from "./ForgotPassword";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebase/firebase.init";
import Footer from "../Footer/Footer";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Sign In
  const [selectedFile, setSelectedFile] = useState(null); // Track the selected image file
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth(app);
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile, signIn } = useContext(AuthContext);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [email, setEmail] = useState("");

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };
  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    console.log(newEmail); // Log the new email value
    setEmail(newEmail); // Update the email state
  };

  const handleForgotPassword = (data) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("check inbox");
        // ..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    closeForgotPasswordModal();
  };

  const handleSignIn = (data) => {
    setIsLoading(true); // Set loading to true when starting the authentication process
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setLoginError("");
        toast.success("Login Successfully");
        navigate(from, { replace: true });
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when the process is complete
      });
  };

  return (
    <div className="bg-[#50AE2A]">
      <Link to="/welcome">
        <div>
          <img className="h-12 pt-4 pl-4" src={icon} alt="" />
        </div>
      </Link>
      <div className="flex justify-center pt-8 pb-8 ">
        <img className="h-20" src={logo} alt="" />
      </div>
      <div className="flex justify-center w-[85%] mx-auto pb-20 items-center">
        <div className="flex w-full flex-col py-10 px-8 shadow  bg-white rounded-[25px] sm:p-10  text-gray-900">
          {/* Loading indicator */}
          {isLoading && <Loader></Loader>}

          {/* Form */}

          {/* Rest of the form */}
          {!isLoading && (
            <form
              onSubmit={handleSubmit(handleSignIn)}
              noValidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="   Enter Your Email"
                  className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                  data-temp-mail-org="0"
                />

                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FaEnvelope className="text-[#A7B4C2] ml-3"></FaEnvelope>
                </span>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="   Password"
                  className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                />

                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FaLock className="text-[#A7B4C2] ml-3"></FaLock>
                </span>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* Error message */}
          <div>
            <p className="text-red-600">{loginError}</p>
          </div>

          {/* Additional UI */}
          {!isSignUp && (
            <div onClick={openForgotPasswordModal} className="py-4">
              <p className="text-sm text-center  text-[#54C27D]">
                Forgot password?
              </p>
            </div>
          )}
          {isForgotPasswordModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white w-[400px] p-6 rounded-lg">
                {/* Add your forgot password form here */}
                <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email} // Bind the input value to the email state
                      onChange={handleEmailChange}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                      onClick={closeForgotPasswordModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="flex items-cen	pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <p className="px-6 text-sm text-center text-[#B0BDC9]">
            <i>Do not have an account?</i>
            <Link to="/register">
              <button className="hover:underline  font-bold text-[#A7E142]">
                Sign Up
              </button>
            </Link>
          </p>
        </div>
      </div>
      {isSignUp && (
        <>
          <div className="bg-white mx-6 rounded-full py-3 px-5 mt-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <img className="h-6" src={userPlus} alt="" />
                <p>Invite a friend</p>
              </div>
              <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
            </div>
          </div>
          <div className="bg-white mx-6 rounded-full py-3 px-5 mt-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <img className="h-6" src={question} alt="" />
                <p>Help</p>
              </div>
              <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
            </div>
          </div>
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Login;

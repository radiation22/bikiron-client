import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import bg from "../../assets/signbg.jpg";
import logo from "../../assets/logo.png";
import icon from "../../assets/leftarrow.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Loader from "../Loader/Loader";

const Agent = () => {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Sign In
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile, signIn, loading } =
    useContext(AuthContext);
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");

  const handleSignIn = async (data) => {
    setIsLoading(true); // Set loading to true at the beginning

    try {
      // Fetch user role based on email from your server
      const response = await fetch(
        `https://e-wallet-server.vercel.app/validateAgentRole?email=${data.email}`
      );
      const userData = await response.json();

      // Check the user's role here
      if (userData && userData.userRole === "agent") {
        // If the user's role is "driver", sign in and navigate to the next screen
        await signIn(data.email, data.password);
        setLoginError("");
        toast.success("login successfully");
        navigate("/recharge");
        // window.reload();
      } else {
        // If the user's role is not "driver", show an error message
        setError("You are not authorized to access this page.");
      }
    } catch (error) {
      setError(error.message);
      setLoginError(error.message);
    } finally {
      setIsLoading(false); // Set loading to false when the operation is completed (whether success or error)
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        width: "100%",
        backgroundRepeat: "no-repeat",
        height: "500px",
      }}
      className=""
    >
      <Link to="/account">
        <div>
          <img className="h-12 pt-4 pl-4" src={icon} alt="" />
        </div>
      </Link>
      <div className="flex justify-center pt-16 pb-16 ">
        <img className="h-20" src={logo} alt="" />
      </div>
      <div className="flex justify-center w-[85%] mx-auto  items-center">
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
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>
          )}

          {/* Error message */}
          <div>
            <p className="text-red-600">{loginError}</p>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;

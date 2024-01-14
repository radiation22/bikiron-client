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

const Login2b = () => {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Sign In
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]); // Track the selected image files
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile, signIn, loading } =
    useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  // Additional state for user role
  const [userRole, setUserRole] = useState("driver");
  const [selectedFile, setSelectedFile] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");
  const url = `https://e-wallet-server.vercel.app/drivers`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDrivers(data));
  }, []);

  const handleSignIn = async (data) => {
    setIsLoading(true); // Set loading to true at the beginning

    try {
      // Fetch user role based on email from your server
      const response = await fetch(
        `https://e-wallet-server.vercel.app/validateUserRole?email=${data.email}`
      );
      const userData = await response.json();

      // Check the user's role here
      if (userData && userData.userRole === "driver") {
        // If the user's role is "driver", sign in and navigate to the next screen
        await signIn(data.email, data.password);
        setLoginError("");
        toast.success("login successfully");
        navigate("/dashboardb");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const uploadImageToImgBB = async (imageFile) => {
    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", imageFile);

      // Your ImgBB API key
      const apiKey = "8c45a65277afef5acc89d1665e868e9c";

      // Make a POST request to the ImgBB API endpoint
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if the request was successful (status code 200)
      if (response.ok) {
        const data = await response.json();
        // The uploaded image URL is available in data.data.url
        return data.data.url;
      } else {
        // Handle the error if the request fails
        throw new Error("Image upload failed");
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSignUp = async (data) => {
    setIsSignUpLoading(true); // Set loading to true when starting the sign-up process
    try {
      const imageUrl = await uploadImageToImgBB(selectedFile);
      console.log(imageUrl);

      const result = await createUser(data.email, data.password);
      const user = result.user;
      // console.log(user);

      await handleUpdateUser(data.name, data.email, imageUrl);
      saveUser(
        data.name,
        data.email,
        userRole,
        drivers?.length + 1,
        imageUrl,
        0
      );

      toast.success("Successfully registered");
      navigate("/dashboardb");
    } catch (error) {
      console.error("Image upload or user creation failed:", error);
    } finally {
      setIsSignUpLoading(false); // Set loading to false when the sign-up process is complete
    }
  };

  const saveUser = (name, email, userRole, busNo, imageUrl, balance) => {
    const user = { name, email, userRole, busNo, imageUrl, balance };
    fetch("https://e-wallet-server.vercel.app/drivers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (loading) {
          return <Loader></Loader>;
        }
        setCreatedUserEmail(email);
      });
  };

  const handleUpdateUser = async (name, email, photoURL) => {
    const profile = {
      displayName: name,
      email,
      photoURL, // Include the uploaded image URL in the user's profile
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => {
        // console.error(error);
      });
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp); // Toggle between Sign In and Sign Up
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
      <Link to="/accountb">
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
              onSubmit={
                isSignUp
                  ? handleSubmit(handleSignUp)
                  : handleSubmit(handleSignIn)
              }
              noValidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              {isSignUp && (
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="        Enter Your Name"
                    className="w-full px-3 py-3 drop-shadow-xl border-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                  />
                </div>
              )}
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
                {!isSignUp && (
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaEnvelope className="text-[#A7B4C2] ml-3"></FaEnvelope>
                  </span>
                )}
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
                {!isSignUp && (
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FaLock className="text-[#A7B4C2] ml-3"></FaLock>
                  </span>
                )}
              </div>

              {isSignUp && (
                <div>
                  <select
                    {...register("busNo")}
                    name="busNo"
                    id="busNo"
                    required
                    className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                  >
                    <option value={drivers?.length + 1}>
                      Bus {drivers?.length + 1}
                    </option>
                  </select>
                </div>
              )}

              {isSignUp && (
                <div>
                  <label htmlFor="photo" className="text-gray-600">
                    Profile Photo:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    id="photo"
                    required
                    placeholder="Profile Photo"
                    onChange={handleFileChange}
                    // onChange={(e) => handleFileChange(e, 0)}
                    className="w-full px-3 py-3 drop-shadow-xl  border-2 file:bg-[#9DDE2A] file:rounded-full file:border-0 file:text-white file:px-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-400"
                  />
                </div>
              )}
              {isSignUp && (
                <div>
                  <label htmlFor="photo" className="text-gray-600">
                    Tax Token Photo:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    id="photo"
                    placeholder="Profile Photo"
                    // onChange={(e) => handleFileChange(e, 1)}
                    className="w-full px-3 py-3 drop-shadow-xl  border-2 file:bg-[#9DDE2A] file:rounded-full file:border-0 file:text-white file:px-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-400"
                  />
                </div>
              )}
              {isSignUp && (
                <div>
                  <label htmlFor="photo" className="text-gray-600">
                    Driving License Photo:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    id="photo"
                    placeholder="Profile Photo"
                    // onChange={(e) => handleFileChange(e, 2)}
                    className="w-full px-3 py-3 drop-shadow-xl  border-2 file:bg-[#9DDE2A] file:rounded-full file:border-0 file:text-white file:px-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-400"
                  />
                </div>
              )}

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

          {/* Additional UI */}
          {!isSignUp && (
            <div className="py-4">
              <p className="text-sm text-center  text-[#54C27D]">
                Forgot password?
              </p>
            </div>
          )}
          <div className="flex items-cen	pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <p className="px-6 text-sm text-center text-[#B0BDC9]">
            <i>
              {isSignUp
                ? "Already have an account? "
                : "Do not have an account? "}
            </i>
            <button
              onClick={toggleSignUp}
              className="hover:underline  font-bold text-[#A7E142]"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login2b;

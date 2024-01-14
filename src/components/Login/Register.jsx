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
import Loader from "../Loader/Loader"; // Import the Loader component

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Sign In
  const [selectedFile, setSelectedFile] = useState(null); // Track the selected image file
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile, signIn } = useContext(AuthContext);
  const [selectedCity, setSelectedCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [selectedMembership, setSelectedMembership] = useState("basic");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 11) {
      setPhoneNumberError(""); // No error
      return true;
    } else {
      setPhoneNumberError("Phone number must be 11 characters");
      return false;
    }
  };

  const handleMembershipChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  console.log(selectedMembership);

  const handleCityChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === cities[0].value) {
      setSelectedCity(selectedValue);
    } else {
      // Show a pop-up or handle the error here
      toast.error("Not available now In your City. We are Coming soon.");
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", imageFile);

      // Your ImgBB API key
      const apiKey = "8ddaa6c8df804bd79444e3f5ea2c7fd5";

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
      setLoginError("Error uploading image:", error);
      throw error;
    }
  };

  const handleSignUp = async (data) => {
    setIsSignUpLoading(true); // Set loading to true when starting the sign-up process
    try {
      const imageUrl = await uploadImageToImgBB(selectedFile);

      const result = await createUser(data.email, data.password);
      const user = result.user;

      await handleUpdateUser(data.name, data.email, imageUrl, data.phoneNumber);
      saveUser(
        data.name,
        data.email,
        phoneNumber,
        selectedMembership,
        transactionId,
        selectedPayment
      );

      toast.success("Successfully registered");
      navigate("/allLibrary");
    } catch (error) {
      setLoginError("Image upload or user creation failed:", error);
    } finally {
      setIsSignUpLoading(false); // Set loading to false when the sign-up process is complete
    }
  };

  const saveUser = (
    name,
    email,
    phoneNumber,
    selectedMembership,
    transactionId,
    selectedPayment
  ) => {
    const user = {
      name,
      email,
      phoneNumber,
      selectedMembership,
      transactionId,
      selectedPayment,
      status: "pending",
    };
    fetch("https://bikiron-server.vercel.app/addUsers", {
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

  const handleUpdateUser = async (name, email, photoURL, phoneNumber) => {
    const profile = {
      displayName: name,
      email,
      photoURL,
      phoneNumber,
      // Include the uploaded image URL in the user's profile
    };

    try {
      await updateUserProfile(profile);
    } catch (error) {
      setLoginError("Error updating user profile:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="bg-[#50AE2A]">
      <Link to="/welcome">
        <div>
          <img className="h-12 pt-4 pl-4" src={icon} alt="" />
        </div>
      </Link>
      <div className="flex justify-center pb-8">
        <img className="h-20" src={logo} alt="" />
      </div>
      <div className="flex justify-center w-[85%] mx-auto  items-center">
        <div className="flex w-full flex-col py-10 px-8 shadow  bg-white rounded-[25px] sm:p-10  text-gray-900">
          {/* Loading indicator */}
          {isSignUpLoading && <Loader />}

          {/* Form */}
          {!isSignUpLoading && (
            <form
              onSubmit={handleSubmit(handleSignUp)}
              noValidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter Your Name"
                  className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                />
              </div>

              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email"
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
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  placeholder="Your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => validatePhoneNumber(phoneNumber)}
                  className={`w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900 ${
                    phoneNumberError ? "border-red-500" : ""
                  }`}
                />
                {phoneNumberError && (
                  <p className="text-red-500">{phoneNumberError}</p>
                )}
              </div>

              <div>
                <label htmlFor="">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  placeholder="Profile Photo"
                  onChange={handleFileChange}
                  className="w-full px-3 py-3 drop-shadow-xl  border-2 file:bg-[#9DDE2A] file:rounded-full file:border-0 file:text-white file:px-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-400"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="membership">
                  Membership{" "}
                  <Link to="/membership">
                    <small className="text-[#F5438E]">(See Plan)</small>
                  </Link>
                </label>
                <select
                  name="membership"
                  id="membership"
                  onChange={handleMembershipChange} // Add your membership change handler function
                  className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                >
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="mt-2">
                <p>Payment method</p>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="bKash"
                    checked={selectedPayment === "bKash"}
                    onChange={handlePaymentChange}
                  />
                  <span className="ps-2">BKash</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="Nagad"
                    checked={selectedPayment === "Nagad"}
                    onChange={handlePaymentChange}
                  />
                  <span className="ps-2">Nagad</span>
                </label>
              </div>
              <div>
                <p>Payment your fees for Select membership plan.</p>
                <p>Bkash/Nagad: +8801636850551</p>
              </div>

              {selectedPayment === "bKash" || selectedPayment === "Nagad" ? (
                <div className="w-full pt-5 px-2 mb-1 lg:mb-0">
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                    id="transactionId"
                    placeholder="Transaction ID"
                    required
                  />
                </div>
              ) : null}

              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}

          {/* Error message */}
          <div>
            <p className="text-red-600">{loginError}</p>
          </div>

          <div className="flex items-cen	pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <p className="px-6 text-sm text-center text-[#B0BDC9]">
            <i>"Already have an account? "</i>
            <Link to="/login">
              {" "}
              <button className="hover:underline  font-bold text-[#A7E142]">
                Sign In
              </button>
            </Link>
          </p>
        </div>
      </div>

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
    </div>
  );
};

export default Register;

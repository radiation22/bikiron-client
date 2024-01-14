import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import logo from "../../assets/bikironlog.png";
import icon from "../../assets/leftarrow.png";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader"; // Import the Loader component

const AddLibrary = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState(null); // Track the selected image file
  const [isSignUpLoading, setIsSignUpLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 11) {
      setPhoneNumberError(""); // No error
      return true;
    } else {
      setPhoneNumberError("Phone number must be 11 characters");
      return false;
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
      await saveUser(data.name, imageUrl, phoneNumber, user?.email);
      toast.success("Successfully account create");
      navigate("/myLibrary");
    } catch (error) {
      setLoginError("Image upload or user creation failed:", error);
    } finally {
      setIsSignUpLoading(false); // Set loading to false when the sign-up process is complete
    }
  };

  const saveUser = (name, profile, phoneNumber, email) => {
    const user = { name, profile, phoneNumber, email, followers: [] };
    fetch("https://bikiron-server.vercel.app/CreateLibrary", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="bg-[#50AE2A] h-screen">
      <Link to="/account">
        <div>
          <img className="h-12 pt-4 pl-4" src={icon} alt="" />
        </div>
      </Link>
      <div className="flex justify-center pb-16 ">
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
                  placeholder="লাইব্রেরির নাম "
                  className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                />
              </div>

              <div>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  placeholder="আপনার নাম্বার"
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
                <label htmlFor="">Library Profile</label>
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

              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
                >
                  লাইব্রেরি খুলুন
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLibrary;

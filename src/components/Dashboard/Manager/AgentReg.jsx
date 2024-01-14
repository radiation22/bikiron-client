import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const AgentReg = ({ details }) => {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { createUser, updateUserProfile, signIn, loading } =
    useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  // Additional state for user role
  const [userRole, setUserRole] = useState("agent");
  const [selectedFile, setSelectedFile] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState("");
  const url = `https://e-wallet-server.vercel.app/agents`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAgents(data));
  }, []);

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

      const result = await createUser(data.email, data.password);
      const user = result.user;
      // console.log(user);

      await handleUpdateUser(data.name, data.email, imageUrl);
      saveUser(data.name, data.email, userRole, imageUrl, 0);

      toast.success("Successfully registered");
      navigate("/manager");
    } catch (error) {
      console.error("Image upload or user creation failed:", error);
    } finally {
      setIsSignUpLoading(false); // Set loading to false when the sign-up process is complete
    }
  };

  const saveUser = (name, email, userRole, imageUrl, balance) => {
    const user = { name, email, userRole, imageUrl, balance };
    fetch("https://e-wallet-server.vercel.app/agents", {
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

  return (
    <div className="w-full flex">
      <div className="flex justify-center w-[90%] mx-auto items-center">
        <div className="flex w-full flex-col py-10 px-8 shadow  bg-white rounded-[25px] sm:p-10  text-gray-900">
          {/* Loading indicator */}
          {isLoading && <Loader></Loader>}

          {/* Form */}

          {/* Rest of the form */}
          {!isLoading && (
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
                  placeholder="        Enter Your Name"
                  className="w-full px-3 py-3 drop-shadow-xl border-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                />
              </div>

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
              </div>

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

              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
                >
                  Register
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

export default AgentReg;

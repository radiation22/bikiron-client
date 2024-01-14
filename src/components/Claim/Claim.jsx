import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import sun from "../../assets/sun.png";
import star from "../../assets/star.png";
import { FaAngleRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import Footerb from "../Footer/Footerb";
import Navbarb from "../Navbar/Navbarb";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Claim = () => {
  const { user } = useContext(AuthContext);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [claim, setClaims] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { register, handleSubmit } = useForm();
  const [secret, setSecret] = useState(null);
  useEffect(() => {
    // Fetch data from the URL
    const url = `https://e-wallet-server.vercel.app/claims?email=${user?.email}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        console.log(data);
        setClaims(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user?.email]);

  // Define the query key
  const queryKey = ["tickets", user?.email];

  // Use the useQuery hook to fetch data
  const { data: tickets = [], refetch } = useQuery(
    queryKey,
    async () => {
      const url = `https://nirapode-server.vercel.app/myTicket?email=${user?.email}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    {
      enabled: !!user?.email, // Only fetch data when user.email is available
    }
  );

  const points = 10 + 5 * tickets.length; // Replace with the actual points
  const totalPointsGoal = 200; // Replace with your total points goal

  // Calculate the progress percentage
  const progressPercentage = (points / totalPointsGoal) * 100;

  // Calculate the width of the progress bar based on the progress percentage
  const progressBarWidth = `${progressPercentage}%`;

  // Define whether each reward is enabled based on points
  const isCashBackEnabled = points >= 100;
  const isFreeRideEnabled = points >= 200;
  const claims = {
    status: "Pending",
    email: user?.email,
  };
  const handleCollectButtonClick = (id) => {
    setSecret(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    const reviews = {
      status: "checked",
    };
    if (data.passenger == 111000) {
      const url = `https://nirapode-server.vercel.app/claim/${secret}`;

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviews),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);

          toast.success("Claim collect");
          setIsModalOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      toast.error("Not Match");
    }
  };
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="pt-10 pb-28">
        <div className="text-center">
          <p className="text-xl font-bold text-center px-4">
            Don't Click Anywhere Just Show it Supervisor when you want to use
          </p>
          <button
            onClick={refreshPage}
            className=" ml-2 px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3"
          >
            Refresh
          </button>
        </div>
        <div className="bg-white p-4 rounded-2xl mt-5 mx-5">
          <div className="flex justify-between">
            <h1 className="text-[#0DAB46]">রিওয়ার্ডস</h1>
            <p className="text-[#9DDE2A]">সব দেখুন</p>
          </div>
          <hr className="mt-2 mb-4" />
          {/* Render Cash Back reward if enabled */}

          {claim?.map((c) => (
            <div
              key={c._id}
              className="flex gap-3 items-center justify-between"
            >
              <div className="w-[20%]">
                <div
                  style={{
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    background: "#9DDE2A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="text-white text-sm">
                    Gift: <br />
                    No {claim?.length}
                  </p>
                </div>
              </div>

              <p className="w-[60%] text-sm text-[#96A6B6]">
                {user?.displayName} Collect your Claim from supervisor
              </p>

              {c.status === "Pending" ? (
                <>
                  <button
                    className="bg-[#96A6B6] py-2 px-4 rounded-full"
                    onClick={() => handleCollectButtonClick(c._id)}
                  >
                    Collect
                  </button>
                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="modal-overlay" onClick={closeModal}></div>
                      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                          <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold"></p>
                            <button
                              className="modal-close-button rounded-full cursor-pointer z-50 bg-red-400 px-3 py-1 text-white"
                              onClick={closeModal}
                            >
                              X
                            </button>
                          </div>
                          <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                                <input
                                  {...register("passenger")}
                                  className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                                  id="numPeople"
                                  type="number"
                                  required
                                  placeholder="Secret Number"
                                />
                              </div>

                              <button className=" ml-2 px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3">
                                Confirm
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    disabled
                    className="bg-[#96A6B6] py-2 px-4 rounded-full"
                  >
                    Collected
                  </button>
                </>
              )}
            </div>
          ))}

          {/* ... (render other rewards if needed) */}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Claim;

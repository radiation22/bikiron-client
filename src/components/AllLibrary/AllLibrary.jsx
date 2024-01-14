import React, { useContext } from "react";
import logo from "../../assets/bikironlog.png";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Footer from "../Footer/Footer";

const AllLibrary = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryKey = ["library"];

  // Use the useQuery hook to fetch data
  const { data: librarys = [], refetch } = useQuery(queryKey, async () => {
    const url = `https://bikiron-server.vercel.app/library`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  });

  const handleFollow = async (id) => {
    if (!user?.email) {
      return navigate("/login");
    }
    const info = {
      email: user?.email,
      id: id,
    };

    try {
      const putResponse = await fetch(
        "https://bikiron-server.vercel.app/addFollow",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      // Update the UI or handle the response from the PUT request
      refetch();

      const putData = await putResponse.json();
      console.log("PUT request response:", putData);
    } catch (error) {
      console.error("Error sending follow data to the server:", error);
    }
  };

  return (
    <>
      <div className="px-3 pt-8 pb-20">
        {librarys.map((library) => (
          <div className="bg-[#50AE2A] mt-2 px-5 py-20 flex justify-between">
            <Link key={library._id} to={`/userAccount/${library?.email}`}>
              <div className="flex  gap-8 justify-center items-center ">
                <div>
                  <img
                    className="rounded-full h-10 w-10"
                    src={library.profile}
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-2xl text-white font-bold">
                    {library.name}
                  </h1>
                  <p className="text-white">
                    Members: {library?.followers?.length}
                  </p>
                </div>
              </div>
            </Link>
            <button
              onClick={() => handleFollow(library._id)}
              className="px-4 py-1 text-white rounded bg-[#F5438E]"
            >
              Join
            </button>
          </div>
        ))}

        <Link to="/addLibrary">
          {" "}
          <div className="text-center flex justify-center flex-col text-white bg-[#50AE2A] mt-2 py-10  px-5">
            <p className="text-center flex justify-center">
              <FaPlus className="text-white text-xl" />
            </p>
            <p>Add Your Own Library</p>
          </div>
        </Link>
        <Link to="/addLibrary">
          {" "}
          <div className="text-center flex justify-center flex-col text-white bg-[#50AE2A] mt-2 py-10  px-5">
            <p className="text-center flex justify-center">
              <FaPlus className="text-white text-xl" />
            </p>
            <p>Add Your Own Library</p>
          </div>
        </Link>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AllLibrary;

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import nirapode from "../../assets/nirapode.png";
const Message = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // Fetch messages from the database when the component mounts
    const fetchMessagesFromDatabase = async () => {
      try {
        const response = await fetch(
          "https://e-wallet-server.vercel.app/message"
        );
        if (response.ok) {
          const data = await response.json();

          // Filter messages for user.email and admin senders
          const filteredMessages = data.filter(
            (message) => message.targetEmail === "all"
            // message.sender === "Admin"
          );

          setMessages(filteredMessages);
        }
      } catch (error) {
        console.error("Error fetching messages from the database:", error);
      }
    };

    fetchMessagesFromDatabase(); // Call the function to fetch messages

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, messages]);
  const handleApprove = (id) => {
    const reviews = {
      status: "seen",
    };

    const url = `https://e-wallet-server.vercel.app/addSeen/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviews),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="py-14">
        {messages
          .slice()
          .reverse()
          .map((message) => (
            <div
              onClick={() => handleApprove(message._id)}
              key={message._id}
              className={`${
                message.status === "unseen" ? "bg-white" : "bg-gray-300"
              } mx-6 rounded-2xl mb-3 py-3 px-4`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-[100px]">
                    <img
                      className="h-14 w-14 rounded-full"
                      src={nirapode}
                      alt=""
                    />
                  </div>
                  <div className="w-">
                    <p className="font-bold">Team Nirapode</p>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-[#A0B1C6] text-sm ">{message.date}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Link to="/inbox">
        <div className="mx-6">
          <button className="bg-[#05A83F] w-full py-2 rounded-full text-white text-lg">
            Contact Us
          </button>
        </div>
      </Link>
      <Footer></Footer>
    </>
  );
};

export default Message;

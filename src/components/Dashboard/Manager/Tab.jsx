import React, { useContext, useEffect, useState } from "react";
import Message from "./../../Message/Message";
import io from "socket.io-client";
import { AuthContext } from "../../context/AuthProvider";
import MessageAdmin from "./MessageAdmin";
import { useNavigate } from "react-router-dom";
import Recharge from "../../Recharge/Recharge";
import WalletAdmin from "../../WalletAdmin/WalletAdmin";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("London");
  const [tickets, setTickets] = useState([]);
  const [trips, setTrips] = useState([]);
  const { user } = useContext(AuthContext);
  // const socket = io.connect("https://nirapode-server.vercel.app");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch messages from the database when the component mounts
    const fetchMessagesFromDatabase = async () => {
      try {
        const response = await fetch(
          "https://e-wallet-server.vercel.app/message"
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages from the database:", error);
      }
    };

    fetchMessagesFromDatabase(); // Call the function to fetch messages

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, messages]);

  useEffect(() => {
    // Fetch data from the URL
    fetch("https://e-wallet-server.vercel.app/trips")
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setTrips(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    // Fetch data from the URL
    fetch("https://e-wallet-server.vercel.app/ticket")
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setTickets(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const formattedToday = `${dd}/${mm}/${yyyy}`;

  // Filter the tickets array to only include tickets with today's date
  const todayTickets = tickets.filter(
    (ticket) => ticket.formattedDate === formattedToday
  );

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-center">Managers Dashboard</h2>

      <div className="flex space-x-2 mt-8">
        <button
          className={`py-2 px-4 bg-gray-300 hover:bg-gray-400 ${
            activeTab === "London" ? "bg-gray-400" : ""
          }`}
          onClick={() => openTab("London")}
        >
          Supervisor
        </button>
        <button
          className={`py-2 px-4 bg-gray-300 hover:bg-gray-400 ${
            activeTab === "Paris" ? "bg-gray-400" : ""
          }`}
          onClick={() => openTab("Paris")}
        >
          All Tickets
        </button>
        <button
          className={`py-2 px-4 bg-gray-300 hover:bg-gray-400 ${
            activeTab === "today" ? "bg-gray-400" : ""
          }`}
          onClick={() => openTab("today")}
        >
          Todays Ticket
        </button>
        <button
          className={`py-2 px-4 bg-gray-300 hover:bg-gray-400 ${
            activeTab === "message" ? "bg-gray-400" : ""
          }`}
          onClick={() => openTab("message")}
        >
          Message
        </button>
        <button
          className={`py-2 px-4 bg-gray-300 hover:bg-gray-400 ${
            activeTab === "recharge" ? "bg-gray-400" : ""
          }`}
          onClick={() => openTab("recharge")}
        >
          E-Wallet
        </button>
        <button
          onClick={refreshPage}
          className=" ml-2 px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3"
        >
          Refresh
        </button>
      </div>

      <div className="mt-4">
        <div
          id="London"
          className={`${
            activeTab === "London" ? "block" : "hidden"
          } bg-white border p-4 rounded-lg`}
        >
          <div className="w-full">
            <table className="w-[95%] mx-auto  border-collapse border">
              <caption className="text-lg font-bold mb-4">
                All of Your Supervisor Trips
              </caption>
              <thead className="bg-gray-400">
                <tr>
                  <th className=" border p-2">Date</th>
                  <th className=" border p-2">Trip No</th>
                  <th className=" border p-2">Bus NO</th>
                  <th className=" border p-2">Total Ticket</th>

                  <th className=" border p-2">Total Cost</th>
                  <th className=" border p-2">Confirmation</th>
                </tr>
              </thead>
              <tbody>
                {trips
                  .slice()
                  .reverse()
                  .map((trip) => (
                    <tr key={trip._id} className="text-center">
                      <td className="border p-2">0{trip.formattedDate}</td>
                      <td className="border p-2">0{trip.trip}</td>
                      <td className="border p-2">0{trip.busNo}</td>
                      <td className="border p-2">{trip.ticketNo}</td>
                      <td className="border p-2">{trip.totalCostSum} BDT</td>
                      <td className="border p-2">
                        <button className="bg-red-500 px-5 py-2 rounded-full text-white">
                          {trip.status}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* this part is for recharge */}

        <div
          id="recharge"
          className={`${
            activeTab === "recharge" ? "block" : "hidden"
          } bg-white border p-4 rounded-lg`}
        >
          <WalletAdmin></WalletAdmin>
        </div>

        {/* this part is for message */}

        <div
          id="message"
          className={`${
            activeTab === "message" ? "block" : "hidden"
          } bg-white border p-4 rounded-lg`}
        >
          <MessageAdmin messages={messages}></MessageAdmin>
        </div>

        <div
          id="Paris"
          className={`${
            activeTab === "Paris" ? "block" : "hidden"
          } bg-white border p-4 rounded-lg`}
        >
          <div>
            <h2>All User Tickets</h2>
            {tickets
              .slice()
              .reverse() // Create a copy of the array to avoid modifying the original array
              .sort((a, b) => {
                const startPointA = a.startPoint.toLowerCase(); // Convert to lowercase for case-insensitive sorting
                const startPointB = b.startPoint.toLowerCase();
                const dateA = new Date(a?.formattedDate);
                const dateB = new Date(b?.formattedDate);

                // First, compare by startPoint in descending order
                if (startPointB !== startPointA) {
                  return startPointB.localeCompare(startPointA);
                }

                // If the startPoints are the same, compare by formattedDate in descending order
                return dateB - dateA;
              })
              .map((ticket, idx) => (
                <div className="p-2" key={idx}>
                  <div
                    className={`border ${
                      ticket.status === "checked"
                        ? "bg-stone-300  p-6 rounded-xl shadow-lg flex justify-between"
                        : "border p-6 rounded-xl shadow-lg flex justify-between"
                    }`}
                  >
                    <div>
                      <p className="font-bold">
                        StartPoint: {ticket?.startPoint}
                      </p>
                      <p className="font-bold">
                        Destination: {ticket.destination}
                      </p>
                      <p className="font-bold">Date: {ticket.formattedDate}</p>
                    </div>
                    <div>
                      <p>Total Cost: </p>
                      <p>{ticket.totalCost} BDT</p>

                      <button className="bg-black mt-3 text-white px-3 py-1 rounded">
                        {ticket.status}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div
          id="today"
          className={`${
            activeTab === "today" ? "block" : "hidden"
          } bg-white border p-4 rounded-lg`}
        >
          {todayTickets
            .slice()
            .reverse()
            .map((ticket, idx) => (
              <div className="p-2" key={idx}>
                <div
                  className={`border ${
                    ticket.status === "checked"
                      ? "bg-stone-300  p-6 rounded-xl shadow-lg flex justify-between"
                      : "border p-6 rounded-xl shadow-lg flex justify-between"
                  }`}
                >
                  <div>
                    <p className="font-bold">
                      StartPoint: {ticket?.startPoint}
                    </p>
                    <p className="font-bold">
                      Destination: {ticket.destination}
                    </p>
                    <p className="font-bold">Date: {ticket.formattedDate}</p>
                  </div>
                  <div>
                    <p>Total Cost: </p>
                    <p>{ticket.totalCost} BDT</p>
                    {ticket.status === "checked" ? (
                      <button className="bg-black text-white px-3 py-1 rounded">
                        Checked
                      </button>
                    ) : (
                      <button className="bg-black mt-3 text-white px-3 py-1 rounded">
                        Pending
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import Navbarb from "../Navbar/Navbarb";
import Footerb from "../Footer/Footerb";

function Inboxb() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessage = (e) => {
    if (newMessage.trim() === "") return;

    // Update the client's message state
    const userMessage = { text: newMessage, sender: user?.email };
    fetch("https://e-wallet-server.vercel.app/addMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userMessage),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          console.log("success");
          setNewMessage("");
        }
      });
  };

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
            (message) =>
              message.sender === user.email ||
              message.targetEmail === user.email
            // message.sender === "Admin"
          );
          console.log(filteredMessages);

          setMessages(filteredMessages);
        }
      } catch (error) {
        console.error("Error fetching messages from the database:", error);
      }
    };

    fetchMessagesFromDatabase(); // Call the function to fetch messages

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, messages]);

  return (
    <>
      <Navbarb />
      <div className="flex flex-col bg-gray-100">
        <div className="flex-1  p-4">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.sender === "Admin" ? "text-left" : "text-right"
              }`}
            >
              <span
                className={`px-3 py-1 rounded-lg inline-block ${
                  message.sender === "Admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4">
          <input
            type="text"
            className="w-full px-3 py-4 border border-gray-300 rounded-lg"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleMessage();
              }
            }}
          />
          <button
            className="mt-2 mb-20 px-4 py-3 w-full bg-[#05A83F] text-white rounded-full"
            onClick={handleMessage}
          >
            Send Message
          </button>
        </div>
      </div>
      <Footerb />
    </>
  );
}

export default Inboxb;

import React, { useState, useEffect } from "react";

const MessageAdmin = ({ messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedSender, setSelectedSender] = useState("");
  // Store the selected sender

  const handleMessage = (e) => {
    if (newMessage?.trim() === "") return;

    // Get the current date in "YYYY-MM-DD" format
    const currentDate = new Date().toISOString().split("T")[0];

    const userMessage = {
      text: newMessage,
      sender: "Admin",
      targetEmail: selectedSender,
      date: currentDate,
      status: "unseen", // Add the current date to the message
    };

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

  return (
    <div>
      <div className="w-full">
        <h2>All the Message</h2>
        {/* Select input to choose sender */}

        <div className="flex flex-col bg-gray-100">
          <div className="flex-1 overflow-y-scroll p-4">
            {messages?.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message?.sender === "Admin" ? "text-left" : "text-right"
                }`}
              >
                <span
                  className={`px-3 py-1 rounded-lg inline-block ${
                    message?.sender === "Admin"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {message?.text}=by
                  {message?.sender}
                </span>
              </div>
            ))}
          </div>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            onChange={(e) => setSelectedSender(e.target.value)}
          >
            <option value="">Select Sender</option>
            <option value="all">All</option>
            {messages?.map((message, index) => (
              <option key={index} value={message.sender}>
                {message.sender}
              </option>
            ))}
          </select>
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
              className="mt-2 px-4 py-3 w-full bg-[#05A83F] text-white rounded-full"
              onClick={handleMessage}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageAdmin;

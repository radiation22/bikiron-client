import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import circle from "../../assets/style2.png";
import dashed from "../../assets/dashed.png";

const TicketInfo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Define the query key
  const queryKey = ["tickets", user?.email];

  // Use the useQuery hook to fetch data
  const { data: tickets = [], refetch } = useQuery(
    queryKey,
    async () => {
      const url = `https://e-wallet-server.vercel.app/myTicket?email=${user?.email}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    {
      enabled: !!user?.email, // Only fetch data when user.email is available
    }
  );

  // Get today's date in the same format as formattedDate
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const formattedToday = `${dd}/${mm}/${yyyy}`;

  const showTicket = (id) => {
    navigate(`/ticket/${id}`);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="px-4">
        <Link to="/ticket">
          <button className="bg-[#9DDE2A] rounded-full text-white px-6 mt-5 py-1 ">
            Last Ticket
          </button>
        </Link>
      </div>
      <div className="pb-20">
        {tickets
          .slice()
          .reverse()
          .map((ticket, idx) => (
            <div key={ticket._id} className="px-4 py-3">
              <div
                onClick={() => showTicket(ticket._id)}
                className="
                bg-white  px-2 py-6 rounded-3xl  flex justify-between"
              >
                <div className="flex">
                  <div>
                    <img src={circle} alt="" />
                  </div>
                  <div>
                    <p className="text-sm text-black">
                      Date: {ticket.formattedDate}
                    </p>
                    <p className="text-sm">From</p>
                    <p className="text-[#99A8B8] text-lg">
                      {ticket?.startPoint}
                    </p>
                    <hr className="w-full mt-1" />
                    <p className="text-sm">To</p>
                    <p className="text-[#99A8B8] text-lg">
                      {ticket?.destination}
                    </p>
                    <hr className="w-full mt-1" />
                    <p className="text-[#05A83F] mt-3 font-bold">
                      Ticket No: {ticket.ticketNo}
                    </p>
                  </div>
                </div>
                <div>
                  <img className="h-[150px]" src={dashed} alt="" />
                </div>
                <div>
                  <div className="space-y-2">
                    <p className="font-bold">{ticket.formattedTime}</p>
                    <p className="font-bold text-lg uppercase text-[#05A83F]">
                      Bus NO: {ticket.busNo}
                    </p>
                    <p className="text-[#05A83F] font-bold">
                      Price:{" "}
                      <span className="text-white px-3 text-sm rounded-full py-1 bg-[#05A83F]">
                        {ticket.totalCost} BDT
                      </span>
                    </p>
                  </div>
                  {ticket.status === "checked" ? (
                    <button className="bg-[#9DDE2A] rounded-full text-white px-6 mt-5 py-1 ">
                      Checked
                    </button>
                  ) : (
                    <button className="bg-[#C1282D] mt-5 text-white  px-9 py-1 rounded-full">
                      Active
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <Footer></Footer>
    </>
  );
};

export default TicketInfo;

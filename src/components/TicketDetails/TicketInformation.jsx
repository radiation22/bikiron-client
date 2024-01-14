import React, { useContext, useState } from "react";
import icon from "../../assets/icon-removebg-preview.png";
import Scanner from "../Scanner/Scanner";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-hot-toast";
import danger from "../../assets/danger.png";
import { AuthContext } from "../context/AuthProvider";
import circle from "../../assets/style.png";
const TicketInformation = ({ ticket, refetch }) => {
  const [secret, setSecret] = useState("");
  const [item, setItem] = useState(null);
  const [item2, setItem2] = useState(null);
  const { user, logOut } = useContext(AuthContext);

  const [tickets, setTickets] = useState(0);
  const [isInputVisible, setInputVisible] = useState(false);

  const {
    startPoint,
    destination,
    donation,
    totalCost,
    formattedDate,
    busNo,
    status,
    formattedTime,
    ticketNo,
    passenger,
  } = ticket;

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const formattedDate1 = `${dd}/${mm}/${yyyy}`;
  const ticketDate = formattedDate;
  const isDateExpired = ticketDate < formattedDate1;

  const url = `https://e-wallet-server.vercel.app/ticket`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => setTickets(data));

  const handleSecret = (e) => {
    const reviews = {
      status: "checked",
      secret: e.target.value,
    };
    if (
      e.target.value == 19990 ||
      e.target.value == 28880 ||
      e.target.value == 35550 ||
      e.target.value == 41110
    ) {
      const url = `https://e-wallet-server.vercel.app/myticket/${item}`;

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
          refetch();
          toast.success("Ticket Confirm");
          document.getElementById("secret").style.display = "none";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setSecret("Not match");
    }
  };

  const confirmTicket = (id) => {
    setItem(id);
    setInputVisible(true);
  };
  const confirmTicket2 = (id) => {
    setItem2(id);
    setInputVisible(true);
  };

  return (
    <div>
      <div className="flex justify-between px-2 lg:px-3 py-4  items-center">
        <div>
          {status === "Pending" ? (
            <img className="w-[35px]" src={danger} alt="" />
          ) : (
            <img className="w-[35px]" src={icon} alt="" />
          )}
        </div>
        <div>
          <h1 className="text-xl uppercase font-bold text-center text-[#32B662]">
            Congrats!
          </h1>
          {status === "Pending" ? (
            <p className="text-center text-[#AAB6C4]">
              Your Ticket has been successfully{" "}
              <span className="text-[#BF1C23] font-bold">Purchased</span>
            </p>
          ) : (
            <p className="text-center text-[#AAB6C4]">
              Your Ticket has been successfully{" "}
              <span className="text-green-600 font-bold">Activated</span>
            </p>
          )}
        </div>
      </div>
      <div className=" px-2 pt-2 pb-20 mx-3  rounded-md">
        <div className="bg-[#05A83F] rounded-t-xl py-2">
          <h1 className="text-center pt-1 text-white">{user?.displayName}</h1>
        </div>
        <div className="bg-white pb-8 px-5 rounded-b-xl ">
          <div>
            <img src={circle} alt="" />
          </div>
          <div className="flex justify-between  px-10">
            <h1 className=" uppercase text-xs text-[#A3A3A3]">From</h1>

            <h1 className=" uppercase text-xs text-[#A3A3A3]">To</h1>
          </div>
          <div className="flex items-center px-10 justify-between">
            <h1 className=" text-[#41200B] text-sm uppercase">{startPoint}</h1>
            <FaArrowRight></FaArrowRight>

            <h1 className=" text-[#41200B] text-sm uppercase">{destination}</h1>
          </div>

          <div className="flex py-1 px-10 justify-between">
            <div>
              <p className="text-xs text-[#05A83F] font-bold uppercase">
                Valid Till
              </p>
              <p className="text-[#743628] text-xs">{formattedDate}</p>
            </div>
            <div>
              <p className="text-xs text-[#05A83F] font-bold uppercase text-right">
                Purchase Time
              </p>
              <p className=" text-[#743628] text-right text-xs ">
                {formattedTime}
              </p>
            </div>
          </div>
          <div className="border-[1.5px] border-[#839BB6] border-dashed my-3"></div>

          <div className="flex justify-between px-10 mt-4">
            <div className="">
              <h1 className="font-bold text-[#A3B5C9] uppercase">Ticket No</h1>
              <p className=" text-[#593C29] font-bold ">{ticketNo}</p>
            </div>
            <div>
              <h1 className="font-bold uppercase text-[#A3B5C9] pl-10">
                Bus No
              </h1>
              <p className=" text-[#593C29] pl-[45px] font-bold">0{busNo}</p>
            </div>
            {/* <div>
              <p className="font-bold uppercase text-right">Purchase Time</p>
              <p className=" text-[#743628] text-right font-bold ">
                {formattedTime}
              </p>
            </div> */}
          </div>

          <div className="flex py-1 px-10 justify-between">
            <div className="">
              <h1 className="text-[#A3B5C9] font-bold uppercase">Total</h1>
              <p className=" text-[#593C29] font-bold">
                {totalCost + donation} tk/{passenger}
                <span className="text-xs">(Person)</span>
              </p>
            </div>
            <div className="">
              <div>
                <h1 className="text-[#A3B5C9] font-bold uppercase">Donate</h1>
                <p className=" text-[#593C29] font-bold ">{donation} tk</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-10">
            <div>
              <p className="font-bold uppercase text-[#A3B5C9] ">Status</p>
              {status == "Pending" ? (
                <p className=" text-[#D26064] font-bold uppercase">{status}</p>
              ) : (
                <p className=" text-green-600 font-bold uppercase">{status}</p>
              )}
            </div>
            <div className="">
              <Scanner ticket={ticket}></Scanner>
            </div>
          </div>
          <div className="border-[1.5px] border-[#839BB6] border-dashed my-4"></div>
          <div className="text-center">
            <p className="text-[#9EB1C5] text-sm">
              This area used by supervisor only. Please wait!
            </p>
            <p className="text-[#9EB1C5] text-sm">
              A supervisor will check your ticket confirmation
            </p>
            {isDateExpired && (
              <p className="text-center text-red-500 font-bold">
                This ticket has expired!
              </p>
            )}
            {isInputVisible ? (
              <div id="secret" className="flex  mt-2 justify-center gap-4 pt-4">
                <input
                  onChange={handleSecret}
                  className="rounded-full border border-black"
                  type="number"
                  name=""
                />
                <p className="text-red-500">{secret}</p>
              </div>
            ) : (
              <>
                {status === "checked" || isDateExpired ? (
                  <></>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          confirmTicket(ticket?._id);
                          confirmTicket2(ticket?._id);
                        }}
                        className="bg-[#C1282D] text-white px-20 mt-1 rounded-full py-1"
                      >
                        Confirm
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInformation;

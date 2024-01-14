import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import DriverNav from "../Navbar/DriverNav";
import DriverFooter from "../Footer/DriverFooter";

const SuperTicket = ({ tickets }) => {
  const { user } = useContext(AuthContext);
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    // Fetch data from the URL
    fetch(`https://e-wallet-server.vercel.app/myTrip?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setTrip(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <DriverNav></DriverNav>
      <div className="w-full">
        <table className="w-[95%] mx-auto  border-collapse border">
          <caption className="text-lg font-bold mb-4">All of Your Trip</caption>
          <thead>
            <tr>
              <th className=" border p-2">Date</th>
              <th className=" border p-2">Total Ticket</th>
              <th className=" border p-2">Total Passenger</th>
              <th className=" border p-2">Total Cost</th>
              <th className=" border p-2">Trip No</th>
              {/* <th className=" border p-2">Total Cost</th>
              <th className=" border p-2">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {trip
              .slice()
              .reverse()
              .map((ticket) => (
                <tr key={ticket._id} className="text-center">
                  <td className="border p-2">{ticket?.formattedDate}</td>
                  <td className="border p-2">{ticket?.ticketNo}</td>
                  <td className="border p-2">{ticket.totalPassengerSum}</td>
                  <td className="border p-2">{ticket.totalCostSum}tk</td>
                  <td className="border p-2">{ticket.trip}</td>
                  {/* <td className="border p-2">{ticket.totalCost} tk</td>
                <td className="border p-2">
                  <button
                    //   onClick={() => confirmTicket(ticket?._id)}
                    className="bg-black text-white px-3 py-1 rounded"
                  >
                    {ticket.status}
                  </button>
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <DriverFooter></DriverFooter>
    </>
  );
};

export default SuperTicket;

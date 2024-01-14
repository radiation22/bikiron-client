import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Delivered = () => {
  const [tickets, setTickets] = useState([]);
  const [totalCostSum, setTotalCostSum] = useState(0);
  const [totalPassengerSum, setTotalPassengerSum] = useState(0);

  useEffect(() => {
    const url = "https://e-wallet-server.vercel.app/ticket";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);

        // Calculate the total sum of totalCost and passenger separately
        const costSum = data.reduce((sum, ticket) => sum + ticket.totalCost, 0);
        const passengerSum = data.reduce(
          (sum, ticket) => sum + ticket.passenger,
          0
        );

        // Set the total sums in separate state variables
        setTotalCostSum(costSum);
        setTotalPassengerSum(passengerSum);
      });
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="text-white text-center py-8 h-screen bg-[#951317]">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p>[Supervisor - 2]</p>
        <p className="text-xl mt-4">Good Afternoon Mr. Moslem</p>

        <div className="bg-[#FA0F11] space-y-3 mt-20 rounded-lg mx-4 my-5 text-white text-center p-5">
          <h1 className="text-lg uppercase">Thanks for Delivering</h1>
          <h1 className="text-3xl font-bold">{totalCostSum} BDT</h1>
          <p>Total</p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Delivered;

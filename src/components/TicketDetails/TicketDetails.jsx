import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query"; // Import from the correct module
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../context/AuthProvider";
import TicketInformation from "./TicketInformation";
import Loader from "../Loader/Loader";

const TicketDetails = () => {
  const { user } = useContext(AuthContext);

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

  return (
    <>
      <Navbar></Navbar>
      {tickets ? (
        tickets
          .slice(-1)
          .map((ticket) => (
            <TicketInformation
              key={ticket._id}
              refetch={refetch}
              ticket={ticket}
            ></TicketInformation>
          ))
      ) : (
        <Loader></Loader> // Replace 'LoadingIndicator' with your loading component
      )}
      <Footer></Footer>
    </>
  );
};

export default TicketDetails;

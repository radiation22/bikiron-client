import React, { useContext, useEffect, useState } from "react";
import bus from "../../assets/Asset 30.png";
import { useForm } from "react-hook-form";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";
import style2 from "../../assets/style2-removebg-preview.png";
import Navbarb from "../Navbar/Navbarb";
import Footerb from "../Footer/Footerb";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ChooseBusb = () => {
  const { busNumber } = useParams();
  const [ticket, setTicket] = useState(0);
  const [balance, setBalance] = useState(0);
  const [ticketCost, setTicketCost] = useState(0);
  const busNo = parseInt(busNumber.match(/\d+/)[0]);
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}/${mm}/${yyyy}`;

  const status = "Pending";
  const calculateCost = (startPoint, destination) => {
    // Define the cost for different routes
    const costMap = {
      RastarMatha: {
        Pokorpar: 13,
        Bohoddarhat: 13,
        MuradPur: 15,
        DuiNogate: 17,
        GEC: 20,
        Washa: 22,
        Lalkhan: 22,
        TigerPass: 22,
        Dewanhat: 25, // Cost from Muradpur to GEC
        Agrabad: 27,
        BarekBuilding: 30,
        Fokirhat: 33,
        Custom: 35,
        Crossing: 37,
        LinerMatha: 40,
        FreePort: 42,
        Bandhar: 45,
        Hospital: 47,
        StillMill: 50,
        Khalpar: 52,
        Katghor: 55,
        Potenga: 60,
      },
      Pokorpar: {
        RastarMatha: 13,
        Bohoddarhat: 13,
        MuradPur: 13,
        DuiNogate: 15,
        GEC: 18,
        Washa: 20,
        Lalkhan: 23,
        TigerPass: 23,
        Dewanhat: 25, // Cost from Muradpur to GEC
        Agrabad: 27,
        BarekBuilding: 30,
        Fokirhat: 33,
        Bissoroad: 35,
        Custom: 37,
        Crossing: 40,
        LinerMatha: 40,
        FreePort: 42,
        Bandhar: 45,
        Hospital: 45,
        StillMill: 47,
        Khalpar: 50,
        Katghor: 55,
        Potenga: 60,
      },
      Bohoddarhat: {
        Pokorpar: 13,
        RastarMatha: 13,
        MuradPur: 13,
        DuiNogate: 13,
        GEC: 15,
        Washa: 17,
        Lalkhan: 20,
        TigerPass: 20,
        Dewanhat: 22, // Cost from Muradpur to GEC
        Agrabad: 25,
        BarekBuilding: 27,
        Fokirhat: 30,
        Bissoroad: 30,
        Custom: 33,
        Crossing: 35,
        LinerMatha: 35,
        FreePort: 38,
        Bandhar: 40,
        Hospital: 42,
        StillMill: 45,
        Khalpar: 47,
        Katghor: 50,
        Potenga: 53,
      },
      MuradPur: {
        RastarMatha: 15,
        Pokorpar: 13,
        Bohoddarhat: 13,
        DuiNogate: 13,
        GEC: 13,
        Washa: 15,
        TigerPass: 15,
        Lalkhan: 18,
        Dewanhat: 20,
        Agrabad: 22,
        BarekBuilding: 25,
        Fokirhat: 27,
        Bissoroad: 30,
        Custom: 32,
        Crossing: 32,
        LinerMatha: 35,
        FreePort: 37,
        Bandhar: 40,
        Hospital: 42,
        StillMill: 45,
        Khalpar: 45,
        Katghor: 47,
        Potenga: 50,
      },
      DuiNogate: {
        MuradPur: 13,
        Bohoddarhat: 13,
        RastarMatha: 17,
        Pokorpar: 15,
        GEC: 13,
        Washa: 13,
        Lalkhan: 15,
        TigerPass: 15,
        Dewanhat: 18,
        Agrabad: 20,
        BarekBuilding: 23,
        Fokirhat: 25,
        Bissoroad: 27,
        Custom: 30,
        Crossing: 32,
        LinerMatha: 35,
        FreePort: 37,
        Bandhar: 40,
        Hospital: 42,
        StillMill: 45,
        Khalpar: 45,
        Katghor: 47,
        Potenga: 50,
      },
      GEC: {
        DuiNogate: 13,
        MuradPur: 13,
        Bohoddarhat: 15,
        RastarMatha: 20,
        Pokorpar: 18,
        Washa: 13,
        Lalkhan: 13,
        TigerPass: 15,
        Dewanhat: 18,
        Agrabad: 20,
        BarekBuilding: 23,
        Fokirhat: 25,
        Bissoroad: 27,
        Custom: 30,
        Crossing: 32,
        LinerMatha: 35,
        FreePort: 37,
        Bandhar: 40,
        Hospital: 42,
        StillMill: 45,
        Khalpar: 45,
        Katghor: 47,
        Potenga: 50,
      },
      Washa: {
        GEC: 13,
        DuiNogate: 13,
        MuradPur: 15,
        Bohoddarhat: 17,
        RastarMatha: 22,
        Pokorpar: 20,
        Lalkhan: 13,
        TigerPass: 13,
        Dewanhat: 15,
        Agrabad: 18,
        BarekBuilding: 20,
        Fokirhat: 22,
        Bissoroad: 25,
        Custom: 27,
        Crossing: 30,
        LinerMatha: 32,
        FreePort: 35,
        Bandhar: 37,
        Hospital: 40,
        StillMill: 42,
        Khalpar: 45,
        Katghor: 47,
        Potenga: 50,
      },

      Lalkhan: {
        GEC: 13,
        DuiNogate: 15,
        MuradPur: 18,
        Bohoddarhat: 20,
        RastarMatha: 22,
        Pokorpar: 23,
        Washa: 13,
        TigerPass: 13,
        Dewanhat: 13,
        Agrabad: 15,
        BarekBuilding: 17,
        Fokirhat: 20,
        Bissoroad: 22,
        Custom: 25,
        Crossing: 27,
        LinerMatha: 30,
        FreePort: 32,
        Bandhar: 35,
        Hospital: 37,
        StillMill: 40,
        Khalpar: 42,
        Katghor: 45,
        Potenga: 47,
      },
      TigerPass: {
        RastarMatha: 22,
        Pokorpar: 23,
        Bohoddarhat: 20,
        MuradPur: 15,
        DuiNogate: 15,
        GEC: 15,
        Washa: 13,
        Lalkhan: 13,
        Dewanhat: 13,
        Agrabad: 13,
        BarekBuilding: 15,
        Fokirhat: 18,
        Bissoroad: 20,
        Custom: 22,
        Crossing: 25,
        LinerMatha: 27,
        FreePort: 30,
        Bandhar: 32,
        Hospital: 35,
        StillMill: 37,
        Khalpar: 40,
        Katghor: 42,
        Potenga: 45,
      },
      Dewanhat: {
        RastarMatha: 25,
        Pokorpar: 27,
        Bohoddarhat: 22,
        MuradPur: 20,
        DuiNogate: 18,
        GEC: 18,
        Washa: 15,
        Lalkhan: 13,
        TigerPass: 13,
        Agrabad: 13,
        BarekBuilding: 13,
        Fokirhat: 15,
        Bissoroad: 17,
        Custom: 20,
        Crossing: 22,
        LinerMatha: 25,
        FreePort: 28,
        Bandhar: 30,
        Hospital: 32,
        StillMill: 35,
        Khalpar: 37,
        Katghor: 40,
        Potenga: 42,
      },
      Agrabad: {
        RastarMatha: 27,
        Pokorpar: 27,
        Bohoddarhat: 25,
        MuradPur: 22,
        DuiNogate: 20,
        GEC: 20,
        Washa: 18,
        Lalkhan: 15,
        TigerPass: 13,
        Dewanhat: 13,
        BarekBuilding: 13,
        Fokirhat: 13,
        Bissoroad: 15,
        Custom: 17,
        Crossing: 20,
        LinerMatha: 22,
        FreePort: 25,
        Bandhar: 27,
        Hospital: 30,
        StillMill: 32,
        Khalpar: 35,
        Katghor: 37,
        Potenga: 40,
      },
      BarekBuilding: {
        RastarMatha: 30,
        Pokorpar: 30,
        Bohoddarhat: 27,
        MuradPur: 25,
        DuiNogate: 23,
        GEC: 23,
        Washa: 20,
        Lalkhan: 17,
        TigerPass: 15,
        Dewanhat: 13,
        Agrabad: 13,
        Fokirhat: 13,
        Bissoroad: 13,
        Custom: 15,
        Crossing: 17,
        LinerMatha: 20,
        FreePort: 22,
        Bandhar: 25,
        Hospital: 27,
        StillMill: 30,
        Khalpar: 32,
        Katghor: 35,
        Potenga: 37,
      },
      Fokirhat: {
        RastarMatha: 33,
        Pokorpar: 33,
        Bohoddarhat: 30,
        MuradPur: 27,
        DuiNogate: 25,
        GEC: 25,
        Washa: 22,
        Lalkhan: 20,
        TigerPass: 18,
        Dewanhat: 15,
        Agrabad: 13,
        BarekBuilding: 13,
        Bissoroad: 13,
        Custom: 13,
        Crossing: 15,
        LinerMatha: 18,
        FreePort: 20,
        Bandhar: 23,
        Hospital: 25,
        StillMill: 28,
        Khalpar: 30,
        Katghor: 32,
        Potenga: 35,
      },
      Bissoroad: {
        RastarMatha: 32,
        Pokorpar: 35,
        Bohoddarhat: 30,
        MuradPur: 30,
        DuiNogate: 27,
        GEC: 27,
        Washa: 25,
        Lalkhan: 22,
        TigerPass: 20,
        Dewanhat: 17,
        Agrabad: 15,
        BarekBuilding: 13,
        Fokirhat: 13,
        Custom: 13,
        Crossing: 13,
        LinerMatha: 15,
        FreePort: 17,
        Bandhar: 20,
        Hospital: 22,
        StillMill: 25,
        Khalpar: 27,

        Katghor: 30,
        Potenga: 32,
      },
      Custom: {
        RastarMatha: 35,
        Pokorpar: 37,
        Bohoddarhat: 33,
        MuradPur: 32,
        DuiNogate: 30,
        GEC: 30,
        Washa: 27,
        Lalkhan: 25,
        TigerPass: 22,
        Dewanhat: 20,
        Agrabad: 17,
        BarekBuilding: 15,
        Fokirhat: 13,
        Bissoroad: 13,
        Crossing: 13,
        LinerMatha: 13,
        FreePort: 15,
        Bandhar: 17,
        Hospital: 20,
        StillMill: 22,
        Khalpar: 25,

        Katghor: 27,
        Potenga: 30,
      },

      Crossing: {
        RastarMatha: 37,
        Pokorpar: 40,
        Bohoddarhat: 35,
        MuradPur: 32,
        DuiNogate: 32,
        GEC: 32,
        Washa: 30,
        Lalkhan: 27,
        TigerPass: 25,
        Dewanhat: 22,
        Agrabad: 20,
        BarekBuilding: 17,
        Fokirhat: 15,
        Bissoroad: 13,
        Custom: 13,
        LinerMatha: 13,
        FreePort: 13,
        Bandhar: 15,
        Hospital: 17,
        StillMill: 20,
        Khalpar: 22,

        Katghor: 25,
        Potenga: 27,
      },
      LinerMatha: {
        RastarMatha: 40,
        Pokorpar: 40,
        Bohoddarhat: 35,
        MuradPur: 35,
        DuiNogate: 35,
        GEC: 35,
        Washa: 32,
        Lalkhan: 30,
        TigerPass: 27,
        Dewanhat: 25,
        Agrabad: 22,
        BarekBuilding: 20,
        Fokirhat: 18,
        Bissoroad: 15,
        Custom: 13,
        Crossing: 13,
        FreePort: 13,
        Bandhar: 13,
        Hospital: 15,
        StillMill: 17,
        Khalpar: 20,

        Katghor: 22,
        Potenga: 25,
      },
      FreePort: {
        RastarMatha: 42,
        Pokorpar: 42,
        Bohoddarhat: 38,
        MuradPur: 37,
        DuiNogate: 37,
        GEC: 37,
        Washa: 35,
        Lalkhan: 32,
        TigerPass: 30,
        Dewanhat: 28,
        Agrabad: 25,
        BarekBuilding: 22,
        Fokirhat: 20,
        Bissoroad: 17,
        Custom: 15,
        Crossing: 13,
        LinerMatha: 13,
        Bandhar: 13,
        Hospital: 13,
        StillMill: 15,
        Khalpar: 17,

        Katghor: 20,
        Potenga: 22,
      },
      Bandhar: {
        RastarMatha: 45,
        Pokorpar: 45,
        Bohoddarhat: 40,
        MuradPur: 40,
        DuiNogate: 40,
        GEC: 40,
        Washa: 37,
        Lalkhan: 35,
        TigerPass: 32,
        Dewanhat: 30,
        Agrabad: 27,
        BarekBuilding: 25,
        Fokirhat: 23,
        Bissoroad: 20,
        Custom: 17,
        Crossing: 15,
        LinerMatha: 13,
        FreePort: 13,
        Hospital: 13,
        StillMill: 13,
        Khalpar: 15,
        Katghor: 17,
        Potenga: 20,
      },
      Hospital: {
        RastarMatha: 47,
        Pokorpar: 45,
        Bohoddarhat: 42,
        MuradPur: 42,
        DuiNogate: 42,
        GEC: 42,
        Washa: 40,
        Lalkhan: 37,
        TigerPass: 35,
        Dewanhat: 32,
        Agrabad: 30,
        BarekBuilding: 27,
        Fokirhat: 25,
        Bissoroad: 22,
        Custom: 20,
        Crossing: 17,
        LinerMatha: 15,
        FreePort: 13,
        Bandhar: 13,
        StillMill: 13,
        Khalpar: 13,
        Katghor: 15,
        Potenga: 17,
      },
      StillMill: {
        RastarMatha: 50,
        Pokorpar: 47,
        Bohoddarhat: 45,
        MuradPur: 45,
        DuiNogate: 45,
        GEC: 45,
        Washa: 42,
        Lalkhan: 40,
        TigerPass: 37,
        Dewanhat: 35,
        Agrabad: 32,
        BarekBuilding: 30,
        Fokirhat: 28,
        Bissoroad: 25,
        Custom: 22,
        Crossing: 20,
        LinerMatha: 17,
        FreePort: 15,
        Bandhar: 13,
        Hospital: 13,
        Khalpar: 13,

        Katghor: 13,
        Potenga: 15,
      },
      Khalpar: {
        RastarMatha: 52,
        Pokorpar: 50,
        Bohoddarhat: 47,
        MuradPur: 45,
        DuiNogate: 45,
        GEC: 45,
        Washa: 45,
        Lalkhan: 42,
        TigerPass: 40,
        Dewanhat: 37,
        Agrabad: 35,
        BarekBuilding: 32,
        Fokirhat: 30,
        Bissoroad: 27,
        Custom: 25,
        Crossing: 22,
        LinerMatha: 20,
        FreePort: 17,
        Bandhar: 15,
        Hospital: 13,
        StillMill: 13,
        Katghor: 13,
        Potenga: 13,
      },

      Katghor: {
        RastarMatha: 55,
        Pokorpar: 55,
        Bohoddarhat: 50,
        MuradPur: 47,
        DuiNogate: 47,
        GEC: 47,
        Washa: 47,
        Lalkhan: 45,
        TigerPass: 42,
        Dewanhat: 40,
        Agrabad: 37,
        BarekBuilding: 35,
        Fokirhat: 32,
        Bissoroad: 30,
        Custom: 27,
        Crossing: 25,
        LinerMatha: 22,
        FreePort: 20,
        Bandhar: 17,
        Hospital: 15,
        StillMill: 13,
        Khalpar: 13,

        Potenga: 13,
      },
      Potenga: {
        RastarMatha: 60,
        Pokorpar: 60,
        Bohoddarhat: 53,
        MuradPur: 50,
        DuiNogate: 50,
        GEC: 50,
        Washa: 50,
        Lalkhan: 47,
        TigerPass: 45,
        Dewanhat: 42,
        Agrabad: 40,
        BarekBuilding: 37,
        Fokirhat: 35,
        Bissoroad: 32,
        Custom: 30,
        Crossing: 27,
        LinerMatha: 25,
        FreePort: 22,
        Bandhar: 20,
        Hospital: 17,
        StillMill: 15,
        Khalpar: 13,
        Katghor: 13,
      },
    };

    // Check if the start point and destination are in the cost map
    if (costMap[startPoint] && costMap[startPoint][destination]) {
      return costMap[startPoint][destination];
    }

    // Default cost if no matching route is found
    return 0; // You can set a default cost here
  };

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

  useEffect(() => {
    const totalTicketCost = tickets.reduce(
      (total, ticket) => total + ticket.totalCost,
      0
    );

    // Update the ticketCost state with the calculated total cost
    setTicketCost(totalTicketCost);
    refetch();
  }, [tickets, ticketCost]);
  useEffect(() => {
    const url = `https://e-wallet-server.vercel.app/myBalance?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const balance = data.map((bal) => setBalance(bal.balance));

        refetch();
      });
  }, [user.email]);

  useEffect(() => {
    const url = `https://e-wallet-server.vercel.app/ticket`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, [user]);

  const onSubmit = (data) => {
    console.log(data);
    const startPoint = data.startPoint;
    const destination = data.destination;
    const passenger = parseFloat(data.passenger);
    const donation = data.donation ? parseFloat(data.donation) : 0;
    const email = user?.email;

    // Get the current time
    const currentTime = new Date();

    // Format the time as needed (e.g., HH:MM AM/PM)
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;

    // Calculate the cost based on the selected start point and destination
    const cost = calculateCost(startPoint, destination);

    // Calculate the total cost (including donation)
    const totalCost = cost * passenger;
    if (totalCost > balance - ticketCost) {
      return toast.error("You have not enough balance");
    }
    const tickets = {
      startPoint,
      destination,
      passenger,
      donation,
      email,
      totalCost,
      formattedDate,
      formattedTime, // Add the formatted time here
      busNo,
      status,
      ticketNo: ticket?.length,
    };

    fetch("https://e-wallet-server.vercel.app/addTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tickets),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Ticket Confirmed");
          navigate("/ticketb");
        }
      });
  };

  return (
    <>
      <Navbarb></Navbarb>
      <div className="py-2 w-[80%] mx-auto">
        <div>
          <div className="flex justify-center">
            <img className="h-[120px]" src={bus} alt="" />
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" rounded px-3 pt-2 pb-8"
            >
              <h1 className="uppercase rounded-full w-[70%] mx-auto text-center bg-[#05A83F] text-white   font-bold py-1">
                BUS {busNo}
              </h1>
              <div className="flex flex-wrap mt-4 -mx-2 mb-4">
                <div className="w-full flex">
                  <div>
                    <img src={style2} alt="" />
                  </div>
                  <div className="w-full">
                    <div className="w-full  px-2 mb-4 lg:mb-0">
                      <label
                        className="block text-[#373738] text-xs  mb-1"
                        htmlFor="packageRequested"
                      >
                        From
                      </label>
                      <select
                        style={{
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                          borderBottom: "1px solid #B6C5D3",
                        }}
                        {...register("startPoint")}
                        className="  bg-[#F2F3F5] w-full py-3  text-[#A5B1C0]   focus:outline-none "
                        id="packageRequested"
                      >
                        <option value="Muradpur">আমার যাত্রা শুরু</option>
                        <option value="RastarMatha">রাস্তার মাথা</option>
                        <option value="Pokorpar">পুকুর পাড়</option>
                        <option value="Bohoddarhat"> বহদ্দারহাট</option>
                        <option value="MuradPur">মুরাদপুর</option>
                        <option value="DuiNogate">২ নং গেইট</option>
                        <option value="GEC"> জি.ই.সি</option>
                        <option value="Washa">ওয়াসা</option>
                        <option value="Lalkhan">লালখান বাজার</option>
                        <option value="TigerPass">টাইগার পাস</option>
                        <option value="Dewanhat">দেওয়ানহাট</option>
                        <option value="Agrabad">আগ্রাবাদ</option>
                        <option value="BarekBuilding">বারেকবিল্ডিং</option>
                        <option value="Fokirhat">ফকিরহাট</option>
                        <option value="Bissoroad">বিশ্ব রোড</option>
                        <option value="Custom">কাস্টম</option>
                        <option value="Crossing">ক্রসিং</option>
                        <option value="LinerMatha">মাইলের মাথা</option>
                        <option value="FreePort">ফ্রীপোর্ট/সিপিজেড</option>
                        <option value="Bandhar">বন্দর টিলা</option>
                        <option value="Hospital">হাসপাতাল গেইট</option>
                        <option value="StillMill">স্টিল মিল</option>
                        <option value="Khalpar">খাল পাড়</option>

                        <option value="Katghor">কাটগড়</option>
                        <option value="Potenga">পতেঙ্গা</option>
                      </select>
                    </div>
                    <div className="w-full  px-2 mb-1 lg:mb-0">
                      <label
                        className="block text-[#373738] text-xs  mb-1"
                        htmlFor="packageRequested"
                      >
                        To
                      </label>
                      <select
                        style={{
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                          borderBottom: "1px solid #B6C5D3",
                        }}
                        {...register("destination")}
                        className="  bg-[#F2F3F5] w-full py-3  text-[#A5B1C0]   focus:outline-none "
                        id="packageRequested"
                      >
                        <option value="Muradpur">আমার গন্তব্য</option>
                        <option value="RastarMatha">রাস্তার মাথা</option>
                        <option value="Pokorpar">পুকুর পাড়</option>
                        <option value="Bohoddarhat"> বহদ্দারহাট</option>
                        <option value="MuradPur">মুরাদপুর</option>
                        <option value="DuiNogate">২ নং গেইট</option>
                        <option value="GEC"> জি.ই.সি</option>
                        <option value="Washa">ওয়াসা</option>
                        <option value="Lalkhan">লালখান বাজার</option>
                        <option value="TigerPass">টাইগার পাস</option>
                        <option value="Dewanhat">দেওয়ানহাট</option>
                        <option value="Agrabad">আগ্রাবাদ</option>
                        <option value="BarekBuilding">বারেকবিল্ডিং</option>
                        <option value="Fokirhat">ফকিরহাট</option>
                        <option value="Bissoroad">বিশ্ব রোড</option>
                        <option value="Custom">কাস্টম</option>
                        <option value="Crossing">ক্রসিং</option>
                        <option value="LinerMatha">মাইলের মাথা</option>
                        <option value="FreePort">ফ্রীপোর্ট/সিপিজেড</option>
                        <option value="Bandhar">বন্দর টিলা</option>
                        <option value="Hospital">হাসপাতাল গেইট</option>
                        <option value="StillMill">স্টিল মিল</option>
                        <option value="Khalpar">খাল পাড়</option>

                        <option value="Katghor">কাটগড়</option>
                        <option value="Potenga">পতেঙ্গা</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                  <input
                    {...register("passenger")}
                    className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                    id="numPeople"
                    type="number"
                    required
                    placeholder="    নাম্বার অফ প্যাসেঞ্জার"
                    min="1"
                  />
                </div>
                <div className="w-full pt-3  px-2 mb-1 lg:mb-0">
                  <input
                    {...register("donation")}
                    className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                    id="numPeople"
                    type="number"
                    placeholder="    অনুদান (optional)"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mb-10">
                <button
                  className="w-full px-8 py-2 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
                  type="submit"
                >
                  কনফার্ম টিকিট
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footerb></Footerb>
    </>
  );
};

export default ChooseBusb;

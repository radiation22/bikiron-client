import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AgentReg from "../Dashboard/Manager/AgentReg";

const WalletAdmin = () => {
  const [selectedTab, setSelectedTab] = useState("driver");
  const [drivers, setDrivers] = useState([]);
  const [singleDriver, setSingleDriver] = useState({});
  const [selectedDriverEmail, setSelectedDriverEmail] = useState("");
  const [selectedAgentEmail, setSelectedAgentEmail] = useState("");
  const { handleSubmit, control, errors, register, reset } = useForm();
  const [agents, setAgents] = useState([]);
  const [details, setDetails] = useState("");

  useEffect(() => {
    fetch(`https://e-wallet-server.vercel.app/agents`)
      .then((res) => res.json())
      .then((data) => setAgents(data));
  }, [agents]);

  useEffect(() => {
    fetch(`https://e-wallet-server.vercel.app/agents`)
      .then((res) => res.json())
      .then((data) => {
        const singleAgent = data.find((d) => d.email === selectedAgentEmail);
        setDetails(singleAgent);
      });
  }, [selectedAgentEmail]);

  const url = `https://e-wallet-server.vercel.app/drivers`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDrivers(data);
        const singleDriver = data.find((d) => d.email === selectedDriverEmail);
        console.log(singleDriver);
        setSingleDriver(singleDriver);
      });
  }, [drivers]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const onSubmit = (data) => {
    if (data.balance > 300) {
      return toast.error("Driver cannot recharge more than 300 tk");
    }

    const details = {
      email: data.email,
      balance: data.balance,
    };

    // Define the URL for your server endpoint
    const url = `https://e-wallet-server.vercel.app/driverBalance`;

    // Send a PUT request to update the balance
    fetch(url, {
      method: "PUT", // Use the PUT method for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details), // Send the details as JSON in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        // You can check if the update was successful and show a success message
        if (data.success) {
          toast.success("Recharge Success");
          reset();
          //   window.location.reload();
        } else {
          toast.error("Recharge Failed"); // Show an error message if the update failed
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Recharge Failed"); // Show an error message if there was a network error
      });
  };

  const onSubmit2 = (data) => {
    const details = {
      email: data.email,
      balance: data.balance,
    };

    // Define the URL for your server endpoint
    const url = `https://e-wallet-server.vercel.app/agentBalance`;

    // Send a PUT request to update the balance
    fetch(url, {
      method: "PUT", // Use the PUT method for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details), // Send the details as JSON in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        // You can check if the update was successful and show a success message
        if (data.success) {
          toast.success("Recharge Success");
          reset();

          //   window.location.reload();
        } else {
          toast.error("Recharge Failed"); // Show an error message if the update failed
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Recharge Failed"); // Show an error message if there was a network error
      });
  };

  return (
    <div>
      <div className="flex justify-center gap-5 p-10 border">
        <div className="">
          <div
            className={`${
              selectedTab === "driver" ? "bg-rose-600" : "bg-gray-300"
            } text-white rounded-full cursor-pointer h-[130px] w-[130px] text-center flex items-center justify-center`}
            onClick={() => handleTabChange("driver")}
          >
            <p>
              {" "}
              Driver <br /> Recharge
            </p>
          </div>
        </div>
        <div className="">
          <div
            className={`${
              selectedTab === "agent" ? "bg-pink-600" : "bg-gray-300"
            } text-white  rounded-full cursor-pointer h-[130px] w-[130px] text-center flex items-center justify-center`}
            onClick={() => handleTabChange("agent")}
          >
            <p>
              {" "}
              Agent <br /> Recharge
            </p>
          </div>
        </div>
      </div>

      {selectedTab === "driver" && (
        <div>
          <p className="text-2xl font-bold text-center mt-5">
            Give Driver Recharge:
          </p>
          <div className="mt-5 flex">
            <div className="w-[60%]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <select
                  {...register("email")}
                  value={selectedDriverEmail}
                  className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                  onChange={(e) => setSelectedDriverEmail(e.target.value)}
                >
                  <option value="">Select Driver</option>
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver.email}>
                      {driver.email}
                    </option>
                  ))}
                </select>
                <input
                  {...register("balance")}
                  type="number"
                  name="balance"
                  id="balance"
                  required
                  placeholder="   Balance"
                  className="w-full pl-10 py-3 mt-4 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                  data-temp-mail-org="0"
                />
                <button
                  className="w-full mt-5 px-8 py-3 font-semibold drop-shadow-xl rounded-full bg-[#77ad18] hover:text-white text-gray-100"
                  type="submit"
                >
                  Send Recharge
                </button>
              </form>
            </div>
            <div className="w-[40%] text-center p-10">
              <div className="">
                <h1>Here is Driver data</h1>
                <div>
                  <img
                    className="h-28 w-28 mx-auto rounded-full"
                    src={singleDriver?.imageUrl}
                    alt=""
                  />
                  <p>Name: {singleDriver?.name}</p>
                  <p>Email: {singleDriver?.email}</p>

                  <p>Balance: {singleDriver?.balance} tk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "agent" && (
        <div>
          <div>
            <p className="text-center">Agent Registration Form</p>
            <AgentReg details={details}></AgentReg>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <p>Select a agent:</p>
              <form onSubmit={handleSubmit(onSubmit2)}>
                <select
                  {...register("email")}
                  value={selectedAgentEmail}
                  className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                  onChange={(e) => setSelectedAgentEmail(e.target.value)}
                >
                  <option value="">Select Agent</option>
                  {agents.map((driver) => (
                    <option
                      onClick={() => handleDetails(driver._id)}
                      key={driver._id}
                      value={driver.email}
                    >
                      {driver.email}
                    </option>
                  ))}
                </select>
                <input
                  {...register("balance")}
                  type="number"
                  name="balance"
                  id="balance"
                  required
                  placeholder="   Balance"
                  className="w-full pl-10 py-3 mt-4 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                  data-temp-mail-org="0"
                />
                <button
                  className="w-full mt-5 px-8 py-3 font-semibold drop-shadow-xl rounded-full bg-[#77af17] hover:text-white text-gray-100"
                  type="submit"
                >
                  Send Recharge
                </button>
              </form>
            </div>

            <div className="w-1/2 mx-auto text-center p-10">
              <div className="">
                <h1>Here is Your data</h1>
                <div>
                  <img
                    className="h-28 w-28 mx-auto rounded-full"
                    src={details?.imageUrl}
                    alt=""
                  />
                  <p>Name: {details?.name}</p>
                  <p>Email: {details?.email}</p>

                  <p>Balance: {details?.balance} tk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletAdmin;

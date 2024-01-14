import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import AgentNav from "../Navbar/AgentNav";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import RechargeHome from "./RechargeHome";

const Recharge = () => {
  const { handleSubmit, control, errors, register } = useForm();
  const { user, logOut } = useContext(AuthContext);
  const [number, setNumber] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [balances, setBalance] = useState(0);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(""); // Added state to hold the selected phone number

  const url = `https://e-wallet-server.vercel.app/walletUsers`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setNumber(data));
  }, []);

  useEffect(() => {
    const url = `https://e-wallet-server.vercel.app/agentBalance?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const balance = data.map((bal) => setBalance(bal?.balance));
      });
  }, [user]);

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    setPhoneNumber(inputPhoneNumber); // Update the input value in state

    const filtered = number.filter((entry) => {
      if (entry.phoneNumber) {
        return entry.phoneNumber.includes(inputPhoneNumber);
      }
      return false;
    });
    console.log(filtered);

    setFilteredNumbers(filtered);
  };

  const handlePhoneNumberSelect = (selectedPhoneNumber) => {
    setPhoneNumber(selectedPhoneNumber); // Set the selected phone number in the input
    setSelectedPhoneNumber(selectedPhoneNumber); // Save the selected phone number in state
    setFilteredNumbers([]); // Clear the filtered list
  };

  const onSubmit = (data) => {
    const balance = data.balance;
    if (balances <= balance) {
      return toast.error("You have not enough balance");
    }
    const details = {
      phoneNumber: selectedPhoneNumber, // Use the selected phone number
      balance: balance,
    };

    const url = `https://e-wallet-server.vercel.app/addBalance`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // First PUT request succeeded, now send the second PUT request
          const secondDetails = {
            email: user?.email,
            balance: balance,
          };

          const secondUrl = `https://e-wallet-server.vercel.app/decreaseAgent`;

          return fetch(secondUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(secondDetails),
          });
        } else {
          // First PUT request failed
          toast.error("Recharge Failed");
        }
      })
      .then((secondResponse) => secondResponse.json())
      .then((secondData) => {
        if (secondData.success) {
          toast.success("Recharge Success");
          window.location.reload();
        } else {
          toast.error("Recharge Failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Recharge Failed");
      });
  };

  return (
    <>
      <div className="px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Phone Number</label>
            <div className="relative">
              <input
                {...register("phoneNumber")}
                type="number"
                name="phoneNumber"
                id="email"
                required
                placeholder="   Phone Number"
                className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                data-temp-mail-org="0"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <ul>
                {filteredNumbers.map((filteredNumber) => (
                  <li
                    key={filteredNumber.id}
                    onClick={() =>
                      handlePhoneNumberSelect(filteredNumber.phoneNumber)
                    } // Handle the selection of phone number
                  >
                    {filteredNumber.phoneNumber}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <label>Balance</label>
            <div className="relative">
              <input
                {...register("balance")}
                type="number"
                name="balance"
                id="balance"
                required
                placeholder="   Balance"
                className="w-full pl-10 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
          </div>

          <button
            className="w-full mt-5 px-8 py-3 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
            type="submit"
          >
            Sent Recharge
          </button>
        </form>
      </div>
    </>
  );
};

export default Recharge;

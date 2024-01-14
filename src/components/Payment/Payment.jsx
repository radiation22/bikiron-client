import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { register, handleSubmit } = useForm();
  const [selectedMembership, setSelectedMembership] = useState("basic");
  const navigate = useNavigate();
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  const handleMembershipChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  const onSubmit = (data) => {
    const email = user?.email;
    const paymentMethod = selectedPayment;
    const phoneNumber = data.phoneNumber;

    const orderDetails = {
      email,
      phoneNumber,
      paymentMethod,
      selectedMembership,
      status: "pending",
      transactionId, // Add the formatted time here
    };

    fetch("https://bikiron-server.vercel.app/addMember", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Sent request.Wait for Confirmation");
          navigate("/allLibrary");
        }
      });
  };
  return (
    <div className="py-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
          <input
            {...register("email")}
            className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
            id="numPeople"
            type="email"
            defaultValue={user?.email}
            required
            disabled
            placeholder="  Email"
          />
        </div>

        <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
          <input
            {...register("phoneNumber")}
            className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
            id="numPeople"
            type="number"
            //   defaultValue={user?.phoneNumber}
            required
            placeholder="Phone Number"
          />
        </div>
        <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
          <label htmlFor="membership">Membership</label>
          <select
            name="membership"
            id="membership"
            onChange={handleMembershipChange} // Add your membership change handler function
            className="w-full pl-10 py-2 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
          >
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div className="mt-2">
          <label>
            <input
              type="radio"
              name="payment"
              value="bKash"
              checked={selectedPayment === "bKash"}
              onChange={handlePaymentChange}
            />
            <span className="ps-2">BKash</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="Nagad"
              checked={selectedPayment === "Nagad"}
              onChange={handlePaymentChange}
            />
            <span className="ps-2">Nagad</span>
          </label>
        </div>

        {selectedPayment === "bKash" || selectedPayment === "Nagad" ? (
          <div className="w-full pt-5 px-2 mb-1 lg:mb-0">
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
              id="transactionId"
              placeholder="Transaction ID"
              required
            />
          </div>
        ) : null}

        <button className=" ml-2 px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3">
          Request Membership
        </button>
      </form>
      <div className="px-2">
        <h1>Payment Procedure:</h1>
        <p></p>
        <p>
          Go to bkash/nagad app . Then select Payment. Use this number:
          +8801636850551
        </p>
        <p>
          After Completing bkash copy the transactionId. Put it in the apps
          transaction input.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Payment;

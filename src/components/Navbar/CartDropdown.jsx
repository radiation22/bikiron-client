import React, { useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Aos from "aos";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const CartDropdown = ({ cartItems, onClose, refetch, loading }) => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedBook, setSelectedBook] = useState({});
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  Aos.init();
  const handleDeleteBook = (id) => {
    const agree = window.confirm("Are you sure want to Remove?");
    if (agree) {
      fetch(`https://bikiron-server.vercel.app/deleteBookCart/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Remove successfully");
            refetch();
          }
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (book) => {
    if (!user?.email) {
      return navigate("/login");
    }
    setSelectedBook(book);
    setIsModalOpen(true);
    console.log(selectedBook);
  };
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  const onSubmit = (data) => {
    const email = user?.email;
    const name = user?.displayName;
    const paymentMethod = selectedPayment;
    const phoneNumber = data.phoneNumber;
    const address = data.address;
    const price = data.price;
    const packageName = data.packageName;
    // Get the current time
    const currentTime = new Date();
    // Format the time as needed (e.g., HH:MM AM/PM)
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;

    const orderDetails = {
      email,
      phoneNumber,
      paymentMethod,
      name,
      address,
      price,
      packageName,
      formattedDate,
      formattedTime,
      transactionId, // Add the formatted time here
    };

    fetch("https://bikiron-server.vercel.app/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Order Confirmed");
          navigate("/allPackage");
        }
      });
  };

  return (
    <div
      className="cart-dropdown  fixed overflow-scroll z-10 bg-white inset-0 transform ease-in-out"
      data-aos="fade-left"
    >
      <div className="lg:w-screen max-w-lg right-0 absolute shadow-xl rounded-xl">
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll">
          <button
            type="button"
            className="inline-flex p-2 text-red-600 w-10 transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-200"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-8 bg-white">
            {loading ? (
              <p>Loading ...</p>
            ) : (
              <>
                {cartItems.map((cartItem) => (
                  <div className="border mt-1 shadow px-5 py-1 mx-4">
                    <div className="flex justify-between items-center">
                      <img className="h-10" src={cartItem?.bookImg} alt="" />
                      <div className="">
                        <p className="text-black">
                          <small>Name:{cartItem?.bookName}</small>
                        </p>
                        <p className="text-black">
                          <small>Price: {cartItem?.price}</small>
                        </p>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => openModal(cartItem)}
                          className="bg-[#F5438E] px-1 py-1 rounded-full"
                        >
                          Order
                        </button>
                        <button
                          onClick={() => handleDeleteBook(cartItem._id)}
                          className="bg-[#F5438E] px-1 py-1 rounded-full ms-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </article>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold"></p>
                  <button
                    className="modal-close-button rounded-full cursor-pointer z-50 bg-red-400 px-3 py-1 text-white"
                    onClick={closeModal}
                  >
                    X
                  </button>
                </div>
                <div>
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
                        {...register("packageName")}
                        className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        id="numPeople"
                        type="text"
                        required
                        value={selectedBook?.bookName}
                        placeholder="Package Name"
                      />
                    </div>
                    <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                      <input
                        {...register("price")}
                        className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        id="numPeople"
                        type="text"
                        required
                        value={selectedBook?.price}
                        placeholder="Package Name"
                      />
                    </div>
                    <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                      <input
                        {...register("address")}
                        className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        id="numPeople"
                        type="text"
                        // value={1}
                        required
                        placeholder=" Your Address"
                      />
                    </div>
                    <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                      <input
                        {...register("phoneNumber")}
                        className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        id="numPeople"
                        type="number"
                        defaultValue={user?.phoneNumber}
                        required
                        placeholder="   Phone Number"
                      />
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
                        <span className="ps-2 text-black">BKash</span>
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
                        <span className="ps-2 text-black">Nagad</span>
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          className=""
                          type="radio"
                          name="payment"
                          value="CashOnDelivery"
                          checked={selectedPayment === "CashOnDelivery"}
                          onChange={handlePaymentChange}
                        />
                        <span className="ps-2 text-black">
                          Cash On Delivery
                        </span>
                      </label>
                    </div>
                    {selectedPayment === "bKash" ? <p>bkash</p> : <></>}
                    {selectedPayment === "Nagad" ? <p>nagad</p> : <></>}

                    {selectedPayment === "bKash" ||
                    selectedPayment === "Nagad" ? (
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
                      Confirm Order
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;

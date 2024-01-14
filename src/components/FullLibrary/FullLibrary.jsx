import React, { useState } from "react";
import book1 from "../../assets/book1.jpg";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";

const FullLibrary = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedBook, setSelectedBook] = useState({});
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(true);
  const queryKey = ["packages"];
  const navigate = useNavigate();

  const { email } = useParams();

  // Use the useQuery hook to fetch data
  const { data: books = [], refetch } = useQuery(queryKey, async () => {
    const url = `https://bikiron-server.vercel.app/allBooks`;
    const res = await fetch(url);
    const data = await res.json();
    const filterBook = data.filter((d) => d?.email === email);
    setLoading(false);
    return filterBook;
  });

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
  const addToCart = (book) => {
    if (!user?.email) {
      return navigate("/login");
    }

    const bookName = book.title;
    const bookImg = book.imageUrl;
    const price = book.price;
    const writer = book.writer;

    const cart = {
      bookName,
      bookImg,
      price,
      writer,
      email: user?.email,
    };

    fetch("https://bikiron-server.vercel.app/addCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Cart Added Successfully");
        }
      });
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
    <>
      <Navbar></Navbar>
      <div className="px-2 py-8">
        <h1 className="text-2xl text-center">সমগ্র লাইব্রেরি</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p className="text-center">Loading ..</p>
          ) : (
            <>
              {books.map((book) => (
                <div
                  key={book._id}
                  className="flex justify-between items-center border rounded border-gray-600 p-3"
                >
                  <div>
                    <img className="h-28" src={book.imageUrl} alt="" />
                  </div>
                  <div className="ps-4">
                    <p>{book.title}</p>
                    <p>Writer: {book.writer}</p>
                    <p>Price: {book.price}</p>
                    <p>Owner: {book.library}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => addToCart(book)}
                      className="bg-[#F5438E]  text-white px-5 py-1 rounded-lg"
                    >
                      Add to cart
                    </button>
                    <br />
                    <button
                      onClick={() => openModal(book)}
                      className="bg-[#F5438E] mt-2 text-white px-5 py-1 rounded-lg"
                    >
                      অর্ডার করুন
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

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
                          value={selectedBook?.title}
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
                          <span className="ps-2">Cash On Delivery</span>
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
      <Footer></Footer>
    </>
  );
};

export default FullLibrary;

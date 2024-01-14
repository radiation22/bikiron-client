import React, { useState, useEffect, useContext } from "react";
import book from "../../assets/book1.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import Navbar from "./../Navbar/Navbar";

const ShowDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}/${mm}/${yyyy}`;

  const queryKey = ["products"];

  useEffect(() => {
    // Fetch data from the URL
    fetch(`https://bikiron-server.vercel.app/singlePackages`)
      .then((response) => response.json())
      .then((data) => {
        const packageData = data.find((pack) => pack.name === id);

        // Update the state with the fetched data
        setDetails(packageData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const onSubmit = (data) => {
    const email = user?.email;
    const name = user?.displayName;
    const paymentMethod = selectedPayment;
    const phoneNumber = data.phoneNumber;
    const address = data.address;
    const price = data.price;
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
      price,
      address,
      formattedDate,
      formattedTime,
      transactionId, // Add the formatted time here
    };
    console.log(orderDetails);
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

  const addToCart = (book) => {
    console.log(book);
    if (!user?.email) {
      return navigate("/login");
    }

    const bookName = book.name;
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

    fetch("https://bikiron-server.vercel.app/addCar", {
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

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    if (!user?.email) {
      return navigate("/login");
    }
    setIsModalOpen(true);
  };
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="px-2 py-8">
        <div>
          <div className="flex items-center">
            <div className="w-[50%] md:px-10">
              <img
                className="p-5 w-full h-[280px] md:h-[500px]"
                src={details.imageUrl}
                alt=""
              />
            </div>
            <div className="py-5 w-[50%]">
              <div className="py-5 space-y-2">
                <h1 className="md:text-lg font-bold">
                  Price: {details?.price}
                </h1>
                <p className="font-bold md:text-lg">
                  Writer:{" "}
                  <span className="text-gray-500">{details?.writer}</span>
                </p>
                <p className="font-bold text-lg">
                  Package: <span className="text-gray-500">{details.name}</span>
                  <span className="text-gray-500">{details?.category}</span>
                </p>
                {/* <p className="font-bold text-lg">
                Delivery Charge:
                <span className="text-gray-500">{details?.deliveryCharge}</span>
              </p> */}
              </div>

              <button
                className="bg-[#F5438E] text-white uppercase mt-4 ms-2 rounded px-5 py-2"
                onClick={openModal}
              >
                Order Now
              </button>
              <button
                onClick={() => addToCart(details)}
                className="bg-[#F5438E] text-white rounded uppercase mt-4 ms-2 px-5 py-2"
              >
                Add To Cart
              </button>
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
                              defaultValue={details.name}
                              disabled
                              required
                              placeholder="   Package Name"
                            />
                          </div>
                          <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                            <input
                              {...register("price")}
                              className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                              id="numPeople"
                              type="text"
                              defaultValue={details?.price}
                              disabled
                              required
                              placeholder="Price"
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
                                onChange={(e) =>
                                  setTransactionId(e.target.value)
                                }
                                className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                                id="transactionId"
                                placeholder="Transaction ID"
                                required
                              />
                            </div>
                          ) : null}

                          <button className=" ml-2 px-4 bg-[#F5438E] text-white uppercase py-2 rounded-lg my-3">
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

          <h1 className="mt-5 text-lg font-bold">Description</h1>
          <p className="py-3">{details?.description}</p>
          <p>Thank You So Much</p>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-lg flex items-center gap-3">
            More On Same Category
            <FaArrowCircleRight />
          </h2>
          {/* <div className="grid gap-6 grid-cols-1 md:grid-cols-2 py-5">
          {products.map((product) => (
            <div
              className="flex border border-gray-400 shadow-lg p-2 rounded"
              key={product.id}
            >
              <img
                className="w-[40%] rounded-md"
                src={product.imageUrl}
                alt=""
              />
              <div className="p-4">
                <h1 className="text-black font-bold text-xl">
                  {product.title}
                </h1>
                <div className="py-4">
                  <p>Price: {product.price}</p>
                  <p>SKU: {product.weight}</p>
                  <p>Delivery Charge: {product.deliveryCharge}</p>
                </div>
                <button className="bg-[#069036] text-white uppercase px-5 py-2">
                  Add To Cart
                </button>
                <button className="bg-[#069036] text-white uppercase px-5 py-2">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div> */}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ShowDetails;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const MyLibrary = () => {
  const { user } = useContext(AuthContext);
  const { handleSubmit, control, reset, register } = useForm();
  const [library, setLibrary] = useState({});
  const [packages, setPackages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const queryKey = ["packages"];

  // Use the useQuery hook to fetch data
  const { data: books = [], refetch } = useQuery(queryKey, async () => {
    const url = `https://bikiron-server.vercel.app/allBooks`;
    const res = await fetch(url);
    const data = await res.json();
    const myBook = data.filter((d) => d?.email === user?.email);
    setLoading(false);
    return myBook;
  });

  useEffect(() => {
    // Fetch data from the URL
    fetch("https://bikiron-server.vercel.app/allBooksPackage")
      .then((response) => response.json())
      .then((data) => {
        const myLibrary = data.filter((d) => d?.email === user?.email);
        setLoading(false);
        setPackages(myLibrary);
        refetch();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [packages]);

  useEffect(() => {
    // Fetch data from the URL
    fetch("https://bikiron-server.vercel.app/library")
      .then((response) => response.json())
      .then((data) => {
        const myLibrary = data.find((d) => d?.email === user?.email);
        setLibrary(myLibrary);
        refetch();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [library]);

  const uploadImageToImgBB = async (imageFile) => {
    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", imageFile);

      // Your ImgBB API key
      const apiKey = "8ddaa6c8df804bd79444e3f5ea2c7fd5";

      // Make a POST request to the ImgBB API endpoint
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if the request was successful (status code 200)
      if (response.ok) {
        const data = await response.json();
        // The uploaded image URL is available in data.data.url
        return data.data.url;
      } else {
        // Handle the error if the request fails
        throw new Error("Image upload failed");
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPackageModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openPackageModal = () => {
    setIsPackageModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (data) => {
    const imageUrl = await uploadImageToImgBB(selectedFile);

    const title = data.title;
    const writer = data.writer;
    const saleType = data.saleType;
    console.log(saleType);
    // Assuming you've added saleType to the form data

    // Set a default or placeholder value for the price based on the saleType
    let price;
    if (saleType === "price") {
      price = data.price;
    } else {
      // Set a default or placeholder value for the price when not for sale or for rent
      price = saleType === "notForSale" ? "Not for Sale" : "For Rent";
    }

    console.log(price);

    const property = {
      title,
      writer,
      imageUrl,
      price,
      library: library.name,
      email: user?.email,
      date: new Date().toLocaleDateString(), // Format the date as desired
    };

    fetch("https://bikiron-server.vercel.app/addBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Book Added Successfully");
          navigate(`/fullLibrary/${user?.email}`);
        }
      });
  };

  const onSubmit2 = async (data) => {
    const imageUrl = await uploadImageToImgBB(selectedFile);

    const title = data.title;
    const writer = data.writer;
    const saleType = data.saleType;
    console.log(saleType);
    // Assuming you've added saleType to the form data

    // Set a default or placeholder value for the price based on the saleType
    let price;
    if (saleType === "price") {
      price = data.price;
    } else {
      // Set a default or placeholder value for the price when not for sale or for rent
      price = saleType === "notForSale" ? "Not for Sale" : "For Rent";
    }

    const property = {
      title,
      writer,
      imageUrl,
      price,
      library: library.name,
      email: user?.email,
      date: new Date().toLocaleDateString(), // Format the date as desired
    };

    fetch("https://bikiron-server.vercel.app/addPackage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Book Added Successfully");
          navigate(`/fullLibrary/${user?.email}`);
        }
      });
  };

  const handleDeleteBook = (id) => {
    const agree = window.confirm("Are you sure want to Remove?");
    if (agree) {
      fetch(`https://bikiron-server.vercel.app/deleteBook/${id}`, {
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
  const handleDeletePackage = (id) => {
    const agree = window.confirm("Are you sure want to Remove?");
    if (agree) {
      fetch(`https://bikiron-server.vercel.app/deletePackage/${id}`, {
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

  const [saleType, setSaleType] = useState("price"); // Default sale type is 'price'

  const handleSaleTypeChange = (event) => {
    setSaleType(event.target.value);
  };

  return (
    <div>
      <h1 className="text-center text-2xl">Welcome to {library?.name}</h1>
      <p className="text-center">
        <small>Its your Library</small>
      </p>

      <div className="mt-8">
        <h1 className="text-center">Your Books Summary</h1>
        <div className="text-center">
          <h1>Your Published Book No: {books?.length}</h1>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={openModal}
          className="px-5 py-2 bg-[#F5438E] text-white rounded-xl"
        >
          Add Single Book
        </button>
        <button
          onClick={openPackageModal}
          className="px-5 py-2 bg-[#F5438E] text-white rounded-xl"
        >
          Add Book Package
        </button>
      </div>

      <div className="px-4 mt-8">
        <h1 className="text-center">All of my Books</h1>
        <div>
          <h1>Single Books:</h1>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading...</p>
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
                    </div>
                    <div>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="bg-[#F5438E] mt-2 text-white px-5 py-1 rounded-lg"
                      >
                        Remove Book
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
                      <div className="border p-5">
                        <h1 className="text-center">Add Your Single Book</h1>
                        <div>
                          <div className="container mx-auto p-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="mb-4">
                                <label
                                  htmlFor="title"
                                  className="block font-medium text-gray-700"
                                >
                                  Book Name
                                </label>
                                <Controller
                                  name="title"
                                  control={control}
                                  defaultValue=""
                                  render={({ field }) => (
                                    <input
                                      required
                                      {...field}
                                      type="text"
                                      id="title"
                                      className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                      placeholder="Enter title"
                                    />
                                  )}
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="title"
                                  className="block font-medium text-gray-700"
                                >
                                  Writer Name
                                </label>
                                <Controller
                                  name="writer"
                                  control={control}
                                  defaultValue=""
                                  render={({ field }) => (
                                    <input
                                      required
                                      {...field}
                                      type="text"
                                      id="writer"
                                      className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                      placeholder="Enter title"
                                    />
                                  )}
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="saleType"
                                  className="block font-medium text-gray-700"
                                >
                                  Sale Type
                                </label>
                                <Controller
                                  name="saleType"
                                  control={control}
                                  defaultValue="price"
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      id="saleType"
                                      className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleSaleTypeChange(e);
                                      }}
                                    >
                                      <option value="price">For Sale</option>
                                      <option value="rent">For Rent</option>
                                      <option value="notForSale">
                                        Not for Sale
                                      </option>
                                    </select>
                                  )}
                                />
                              </div>

                              {saleType === "price" && (
                                <div className="mb-4">
                                  <label
                                    htmlFor="price"
                                    className="block font-medium text-gray-700"
                                  >
                                    Price
                                  </label>
                                  <Controller
                                    name="price"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                      <input
                                        required
                                        {...field}
                                        type="text"
                                        id="price"
                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                        placeholder="Enter price"
                                      />
                                    )}
                                  />
                                </div>
                              )}

                              <div className="mb-4">
                                <label
                                  htmlFor="photo"
                                  className="block font-medium text-gray-700"
                                >
                                  Photo
                                </label>
                                <Controller
                                  name="photo"
                                  control={control}
                                  defaultValue={null}
                                  render={({ field }) => (
                                    <input
                                      required
                                      {...field}
                                      type="file"
                                      id="photo"
                                      onChange={handleFileChange}
                                      accept="image/*"
                                      className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                    />
                                  )}
                                />
                              </div>
                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                                >
                                  Add Book
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isPackageModalOpen && (
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
                      <div className="border p-5">
                        <h1 className="text-center">Add Your Package Book</h1>
                        <div>
                          <div className="container mx-auto p-4">
                            <form onSubmit={handleSubmit(onSubmit2)}>
                              <div className="mb-4">
                                <label
                                  htmlFor="title"
                                  className="block font-medium text-gray-700"
                                >
                                  Package Name
                                </label>
                                <Controller
                                  name="title"
                                  control={control}
                                  defaultValue=""
                                  render={({ field }) => (
                                    <input
                                      required
                                      {...field}
                                      type="text"
                                      id="title"
                                      className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                      placeholder="Enter title"
                                    />
                                  )}
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="saleType"
                                  className="block font-medium text-gray-700"
                                >
                                  Sale Type
                                </label>
                                <Controller
                                  name="saleType"
                                  control={control}
                                  defaultValue="price"
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      id="saleType"
                                      className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleSaleTypeChange(e);
                                      }}
                                    >
                                      <option value="price">For Sale</option>
                                      <option value="rent">For Rent</option>
                                      <option value="notForSale">
                                        Not for Sale
                                      </option>
                                    </select>
                                  )}
                                />
                              </div>

                              {saleType === "price" && (
                                <div className="mb-4">
                                  <label
                                    htmlFor="price"
                                    className="block font-medium text-gray-700"
                                  >
                                    Price
                                  </label>
                                  <Controller
                                    name="price"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                      <input
                                        required
                                        {...field}
                                        type="text"
                                        id="price"
                                        className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                        placeholder="Enter price"
                                      />
                                    )}
                                  />
                                </div>
                              )}

                              <div className="mb-4">
                                <label
                                  htmlFor="photo"
                                  className="block font-medium text-gray-700"
                                >
                                  Photo
                                </label>
                                <Controller
                                  name="photo"
                                  control={control}
                                  defaultValue={null}
                                  render={({ field }) => (
                                    <input
                                      required
                                      {...field}
                                      type="file"
                                      id="photo"
                                      onChange={handleFileChange}
                                      accept="image/*"
                                      className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                    />
                                  )}
                                />
                              </div>
                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                                >
                                  Add Book
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <h1 className="mt-8">Packages Book</h1>
        <div className="mt-8 mb-20">
          {loading ? (
            <p>Loading ...</p>
          ) : (
            <>
              {packages.map((book) => (
                <div
                  key={book._id}
                  className="flex justify-between items-center border rounded border-gray-600 p-3"
                >
                  <div>
                    <img className="h-28" src={book.imageUrl} alt="" />
                  </div>
                  <div className="ps-4">
                    <p>{book.title}</p>
                    <p>Price: {book.price}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDeletePackage(book._id)}
                      className="bg-[#F5438E] mt-2 text-white px-5 py-1 rounded-lg"
                    >
                      Remove Book
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyLibrary;

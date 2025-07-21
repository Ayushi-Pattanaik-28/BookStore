import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BsCart3 } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, addToCart } from '../store/auth';

const ViewBookDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [error, setError] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (err) {
        setError("Failed to load book data.");
        console.error("Error fetching book data:", err);
      }
    };
    fetchBook();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourites = async () => {
    try {
      if (!isLoggedIn) return alert("Please log in first");

      const response = await axios.put(
        "http://localhost:1000/api/add-book-to-favourite",
        { bookId: id },
        { headers }
      );

      alert(response.data.message || "Added to wishlist");
      dispatch(addToWishlist(Data));
    } catch (err) {
      console.log("Error adding to favourites:", err.response || err.message);
      alert("Error occurred while adding to wishlist.");
    }
  };

  const handleCart = async () => {
    try {
      if (!isLoggedIn) return alert("Please log in first");

      const response = await axios.put(
        "http://localhost:1000/api/add-to-cart",
        { bookId: Data._id },
        { headers }
      );

      alert(response.data.message || "Added to cart");
      dispatch(addToCart(Data));
    } catch (err) {
      console.error("Error adding book to cart:", err);
      alert("Failed to add book to cart.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete("http://localhost:1000/api/delete-book", { headers });

      if (response.status === 200) {
        alert(response.data.message);
        navigate('/');
      } else {
        alert('Failed to delete the book');
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Error occurred while deleting the book.");
    }
  };

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <>
      {Data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start text-white'>
          {/* Left Section */}
          <div className='w-full lg:w-3/6'>
            <div className='flex flex-col items-center bg-zinc-800 p-6 rounded shadow-lg'>
              <img
                src={Data.url}
                alt="Book cover"
                className='h-[50vh] lg:h-[70vh] rounded object-cover mb-6'
              />

              {/* User Buttons (Icons Only) */}
              {isLoggedIn && role === "user" && (
                <div className="flex gap-6 mt-4">
                  <button
                    onClick={handleFavourites}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
                    title="Add to Wishlist"
                  >
                    <IoHeartOutline className="text-2xl" />
                  </button>

                  <button
                    onClick={handleCart}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-3 rounded-full shadow-md transition transform hover:scale-110"
                    title="Add to Cart"
                  >
                    <BsCart3 className="text-2xl" />
                  </button>
                </div>
              )}

              {/* Admin Buttons */}
              {isLoggedIn && role === "admin" && (
                <div className="flex flex-col gap-4 w-full mt-6">
                  <Link
                    to={`/editProduct/${id}`}
                    className="flex items-center justify-center bg-yellow-500 text-white py-3 px-6 rounded-full shadow-md transition transform hover:scale-105 hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <Link
                    to={"/addBook"}
                    className="flex items-center justify-center bg-green-500 text-white py-3 px-6 rounded-full shadow-md transition transform hover:scale-105 hover:bg-green-600"
                  >
                    Add Book
                  </Link>

                  <button
                    onClick={handleDelete}
                    className='flex items-center justify-center bg-red-500 text-white py-3 px-6 rounded-full shadow-md transition transform hover:scale-105 hover:bg-red-600'
                  >
                    Delete Book
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-3/6">
            <h1 className="text-3xl font-bold mb-2">{Data.title}</h1>
            <p className="text-lg text-zinc-300 mb-1">by {Data.author}</p>
            <p className="text-sm text-zinc-400 mb-4">{Data.language}</p>
            <p className="mb-6">{Data.description}</p>
            <p className="text-2xl font-bold text-green-400">₹ {Data.price}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;

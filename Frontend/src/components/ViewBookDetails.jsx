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
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-10 text-white'>
          {/* Left Section */}
          <div className='w-full lg:w-1/2'>
            <div className='bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col items-center'>
              <img
                src={Data.url}
                alt="Book cover"
                className='h-[50vh] lg:h-[60vh] object-cover rounded mb-6'
              />

              {isLoggedIn && role === "user" && (
                <div className="flex gap-4">
                  <button
                    onClick={handleFavourites}
                    className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-full shadow-md transition"
                    title="Add to Wishlist"
                  >
                    <IoHeartOutline className="text-xl" />
                  </button>
                  <button
                    onClick={handleCart}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition"
                    title="Add to Cart"
                  >
                    <BsCart3 className="text-xl" />
                  </button>
                </div>
              )}

              {/* Admin Actions */}
              {isLoggedIn && role === "admin" && (
                <div className="flex flex-wrap gap-2 mt-6">
                  <Link
                    to={`/editProduct/${id}`}
                    className="bg-slate-500 hover:bg-slate-400 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png"
                      alt="Edit"
                      className="w-4 h-4"
                    />
                    
                  </Link>

                  <Link
                    to="/addBook"
                    className="bg-slate-500 hover:bg-slate-400 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4683/4683439.png"
                      alt="Add"
                      className="w-4 h-4"
                    />
                    
                  </Link>

                  <button
                    onClick={handleDelete}
                    className="bg-slate-500 hover:bg-slate-400 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                  >
                    <img
                      src="https://www.freeiconspng.com/thumbs/delete-button-png/blue-delete-button-png-29.png"
                      alt="Delete"
                      className="w-4 h-4"
                    />
                    
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{Data.title}</h1>
            <p className="text-lg text-zinc-300 mb-1">by {Data.author}</p>
            <p className="text-sm text-zinc-400 mb-4">{Data.language}</p>
            <p className="mb-6 leading-relaxed text-zinc-200">{Data.description}</p>
            <p className="text-2xl font-semibold text-green-400">₹ {Data.price}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;

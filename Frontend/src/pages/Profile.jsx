import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/auth';
import { BsCart3 } from 'react-icons/bs';
import { IoHeartOutline } from 'react-icons/io5';
import axios from 'axios';

const Profile = () => {
  const reduxUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUser(reduxUser || storedUser);
      fetchCart();
      fetchWishlist();
    }
  }, [reduxUser, navigate]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/get-user-cart", { headers });
      setCartItems(res.data.data || []);
    } catch (err) {
      console.error("Cart fetch failed:", err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/get-favourite-books", { headers });
      setWishlistItems(res.data.data || []);
    } catch (err) {
      console.error("Wishlist fetch failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/login');
  };

  const handleRemoveFromCart = async (bookId) => {
    try {
      await axios.put(`http://localhost:1000/api/remove-from-cart/${bookId}`, {}, { headers });
      setCartItems((prev) => prev.filter(item => item._id !== bookId));
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      await axios.put(`http://localhost:1000/api/remove-from-wishlist/${bookId}`, {}, { headers });
      setWishlistItems((prev) => prev.filter(item => item._id !== bookId));
    } catch (err) {
      console.error("Remove from wishlist failed:", err);
    }
  };

  if (!user) return <div className="text-center text-[#4b3d2a] font-serif mt-10">Loading user data...</div>;

  return (
    <div className="min-h-screen bg-[#c49a6c] px-6 py-12 sm:px-12 lg:px-24 text-[#4b3d2a] font-serif">
      {/* Profile Info */}
      <div className="w-full max-w-3xl mx-auto bg-[#f9efe2] border border-[#e0d2b8] p-10 rounded-xl shadow-lg mb-12">
        <h1 className="text-3xl font-bold text-center text-[#7b4a32] mb-6 border-b pb-2 border-[#c49a6c]">User Profile</h1>
        <div className="space-y-3 text-lg">
          <p><span className="font-semibold">Username:</span> {user.username}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Role:</span> {user.role}</p>
          <p><span className="font-semibold">Address:</span> {user.address || 'N/A'}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Wishlist */}
      <div className="w-full max-w-3xl mx-auto bg-[#f9efe2] border border-[#e0d2b8] p-8 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-5 text-[#5e3b1c]">
          <IoHeartOutline className="text-[#8b5e3c] text-2xl" />
          Wishlist ({wishlistItems.length})
        </h2>
        {wishlistItems.length === 0 ? (
          <p className="text-[#6e5843] opacity-80">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {wishlistItems.map((book) => (
              <div key={book._id} className="bg-[#fffaf1] border border-[#e0d2b8] p-5 rounded shadow hover:shadow-md">
                <h3 className="text-lg font-semibold text-[#4b3d2a]">{book.title}</h3>
                <p className="text-sm text-[#6e5843] italic">{book.author}</p>
                <p className="text-green-700 font-bold">₹{book.price}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(book._id)}
                  className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="w-full max-w-3xl mx-auto bg-[#f9efe2] border border-[#e0d2b8] p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-5 text-[#5e3b1c]">
          <BsCart3 className="text-[#4b3d2a] text-2xl" />
          Cart ({cartItems.length})
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-[#6e5843] opacity-80">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cartItems.map((book) => (
                <div key={book._id} className="bg-[#fffaf1] border border-[#e0d2b8] p-5 rounded shadow hover:shadow-md">
                  <h3 className="text-lg font-semibold text-[#4b3d2a]">{book.title}</h3>
                  <p className="text-sm text-[#6e5843] italic">{book.author}</p>
                  <p className="text-green-700 font-bold">₹{book.price}</p>
                  <button
                    onClick={() => handleRemoveFromCart(book._id)}
                    className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

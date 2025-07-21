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
      const res = await axios.get("http://localhost:1000/api/get-user-wishlist", { headers });
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

  const handleCheckout = async () => {
  try {
    const payload = {
      order: cartItems, // Assuming cartItems is an array of { _id } objects
    };

    await axios.post("http://localhost:1000/api/place-order", payload, { headers });

    alert("Order placed successfully!");
    setCartItems([]);
  } catch (err) {
    console.error("Checkout failed:", err.response?.data || err.message);
    alert("Order failed");
  }
};


  if (!user) return <div className="text-white text-center mt-10">Loading user data...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4 py-10">
      {/* Profile Info */}
      <div className="w-full max-w-3xl bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500 p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">User Profile</h1>
        <div className="text-black font-medium space-y-4">
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
      <div className="w-full max-w-3xl bg-zinc-800 p-6 rounded-lg mb-6 shadow-md">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <IoHeartOutline className="text-pink-400 text-2xl" />
          Wishlist ({wishlistItems.length})
        </h2>
        {wishlistItems.length === 0 ? (
          <p className="text-zinc-400">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistItems.map((book) => (
              <div key={book._id} className="bg-zinc-700 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-zinc-400">{book.author}</p>
                <p className="text-green-400 font-bold">₹{book.price}</p>
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
      <div className="w-full max-w-3xl bg-zinc-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <BsCart3 className="text-cyan-400 text-2xl" />
          Cart ({cartItems.length})
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-zinc-400">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cartItems.map((book) => (
                <div key={book._id} className="bg-zinc-700 p-4 rounded shadow">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-zinc-400">{book.author}</p>
                  <p className="text-green-400 font-bold">₹{book.price}</p>
                  <button
                    onClick={() => handleRemoveFromCart(book._id)}
                    className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

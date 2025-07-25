import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/get-user-cart", { headers });
        setCart(res.data.data);

        const totalAmount = res.data.data.reduce((acc, item) => {
          const price = parseFloat(item.price);
          const quantity = parseInt(item.quantity) || 1;
          return !isNaN(price) ? acc + (price * quantity) : acc;
        }, 0);

        setTotal(totalAmount);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveItem = async (bookId) => {
    if (!bookId) return;

    try {
      const response = await axios.put(
        `http://localhost:1000/api/remove-from-cart`,
        {},
        {
          headers: {
            ...headers,
            bookid: bookId, // add bookid to headers
          },
        }
      );

      alert(response.data.message);

      setCart((prevCart) => {
        const updatedCart = prevCart.filter(item => item.id !== bookId && item._id !== bookId);
        const updatedTotal = updatedCart.reduce((acc, item) => {
          const price = parseFloat(item.price);
          const quantity = parseInt(item.quantity) || 1;
          return !isNaN(price) ? acc + (price * quantity) : acc;
        }, 0);
        setTotal(updatedTotal);
        return updatedCart;
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      }

      if (error.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
        navigate("/login");
      } else {
        alert("Error removing item from cart.");
      }
    }

  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {orderPlaced ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold text-center mb-4">Thank you for your order!</h2>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
              alt="Order placed"
              className="w-72 h-72 object-contain"
            />
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
              alt="Empty cart"
              className="w-72 h-72 object-contain"
            />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="grid grid-cols-1 gap-5">
              {cart.map((item) => {
                const price = parseFloat(item.price);
                const quantity = parseInt(item.quantity) || 1;
                const totalPrice = isNaN(price) ? 0 : price * quantity;

                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md border border-gray-700"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">Qty: {quantity}</p>
                        <p className="text-green-400 font-medium mt-1">Rs. {totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

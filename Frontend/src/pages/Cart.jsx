import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
            bookid: bookId,
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
      if (error.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
        navigate("/login");
      } else {
        alert("Error removing item from cart.");
      }
    }
  };

  return (
    <div className='bg-[#c49a6c]'>
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cream-dust.png')] bg-repeat text-[#3e2c1c] px-4 py-10 font-serif">
      <div className="max-w-4xl mx-auto border-2 border-[#c4a484] bg-[#fdf6e3] p-8 rounded-lg shadow-lg">

        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="border-4 border-[#c4a484] border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-[#7d5a3a]">Loading your cart...</p>
            </div>
          </div>
        ) : orderPlaced ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold mb-4">Thank you for your order!</h2>
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
            <h1 className="text-4xl font-bold mb-8 border-b-2 border-[#c4a484] pb-2"></h1>
            <div className="grid grid-cols-1 gap-6">
              {cart.map((item) => {
                const price = parseFloat(item.price);
                const quantity = parseInt(item.quantity) || 1;
                const totalPrice = isNaN(price) ? 0 : price * quantity;

                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-[#f5e9d3] border border-[#c4a484] p-4 rounded-md shadow-inner"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md border border-[#b08d57]"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-[#6b4c2e]">Qty: {quantity}</p>
                        <p className="text-[#2b542c] font-medium mt-1">Rs. {totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="bg-[#8b2e2e] hover:bg-[#a84242] text-white px-4 py-2 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-right">
              <h2 className="text-xl font-bold border-t pt-4 border-[#c4a484]">Total: Rs. {total.toFixed(2)}</h2>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default Cart;

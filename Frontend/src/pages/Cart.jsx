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
          if (!isNaN(price)) {
            return acc + (price * quantity);
          }
          return acc;
        }, 0);

        setTotal(totalAmount);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveItem = async (bookId) => {
    if (!bookId) {
      console.error("Invalid book ID:", bookId);
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

  
      const response = await axios.put(`http://localhost:1000/api/remove-from-cart/${bookId}`, {}, { headers });
      alert(response.data.message);
  
      setCart((prevCart) => {
        const updatedCart = prevCart.filter(item => item.id !== bookId && item._id !== bookId);
        const updatedTotal = updatedCart.reduce((acc, item) => {
          const price = parseFloat(item.price);
          const quantity = parseInt(item.quantity) || 1;
          if (!isNaN(price)) {
            return acc + (price * quantity);
          }
          return acc;
        
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
    const x = localStorage.getItem("true");
    console.log(x, "fsdljbkfjds" )
  };
  

  const handleCheckout = () => {
    alert("Thank you for ordering! Your cart is now empty.");
    setCart([]);
    setTotal(0);
    setOrderPlaced(true);
  };

  return (
    <div className="bg-zinc-800 min-h-screen">
      {orderPlaced ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
          <h2 className="text-2xl font-semibold">Thank you for your order!</h2>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
            alt="Order placed"
            className="w-72 h-72 object-contain mt-4"
          />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-6 text-white">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
                alt="Empty cart"
                className="w-72 h-72 object-contain"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item ) => {
                const price = parseFloat(item.price);
                const quantity = parseInt(item.quantity) || 1;
                const totalPrice = isNaN(price) ? 0 : (price * quantity
              );
            

                return (
                  <div key={ item._id } className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                        <h3 className="text-gray-600">Rs. {totalPrice.toFixed(2)}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id || item._id)}
                      className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Remove
                    </button>
                 
                  </div>
                   
                );
              })}

            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800">Total: Rs. {(total).toFixed(2)}</h2>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;

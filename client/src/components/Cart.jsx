import React, { useState, useEffect } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setcartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://mobile-e-commerce-production-e6b9.up.railway.app/api/auth/get-cart-items", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {setcartItems(res.data.items)
    console.log("Fetched cart items:", res.data)
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, []);

  const removeFromCart = (productId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://mobile-e-commerce-production-e6b9.up.railway.app/api/auth/remove-from-cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setcartItems((prev) => prev.filter((item) => item._id !== productId)))
      .catch((err) => console.error(err));
  };

  const getOrder = (itemId) => {
    navigate(`/order-detail?productId=${itemId}`, { state: { type: "cart" } });
  };

  // const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="px-4 md:px-8 py-8  min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <FaShoppingCart className="text-2xl text-gray-800" />
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        {cartItems.length > 0 && (
          <span className="ml-1 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full">
            {cartItems.length}
          </span>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Items Grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="bg-[#f5f0e8] h-40 flex items-center justify-center p-3">
                  <img src={item.image} alt={item.model} className="h-full w-full object-contain" />
                </div>
                <div className="p-3.5">
                  <p className="font-bold text-gray-900 text-sm leading-snug">{item.model}</p>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">RAM: {item.ram}</span>
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">ROM: {item.rom}</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm mt-2">
                    Rs {Number(item.price).toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => getOrder(item._id)}
                      className="flex-1 bg-[#1a1a1a] text-white text-xs font-semibold py-2 rounded-xl hover:bg-gray-800 transition"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-50 text-red-500 border border-red-100 px-3 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
          
      ) : (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <FaShoppingCart className="text-6xl text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-1">Add some phones to get started!</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-[#1a1a1a] text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition text-sm"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
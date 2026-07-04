import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from './Navbar';

const Listproducts = () => {
  const { model } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [addedMap, setAddedMap] = useState({}); // har item ka alag added state

  useEffect(() => {
    fetchProducts();
  }, [model]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://mobile-e-commerce-production-e6b9.up.railway.app//api/ecommerce/product/${model}`);
      setProducts(res.data.phones || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (item) => {
    const token = localStorage.getItem("token");
    axios
      .post("https://mobile-e-commerce-production-e6b9.up.railway.app//api/auth/add-to-cart", { productId: item._id }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setAddedMap((prev) => ({ ...prev, [item._id]: true }));
        setTimeout(() => setAddedMap((prev) => ({ ...prev, [item._id]: false })), 2000);
      })
      .catch((err) => console.log("ERROR:", err.response?.data));
  };

  const getOrder = (item) => {
    navigate(`/order-detail?productId=${item._id}`, {
      state: { type: "single", productId: item._id },
    });
  };

  const goToDetails = (item) => {
    navigate(`/product-details/${item._id}`);
  };

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-8 py-8 bg-[#f5f0e8] min-h-screen">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Search results for <span className="text-yellow-500">"{model}"</span>
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                {/* Image */}
                <div
                  className="bg-[#f5f0e8] h-44 flex items-center justify-center p-4 cursor-pointer"
                  onClick={() => goToDetails(item)}
                >
                  <img
                    src={item.image}
                    alt={item.model}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <p
                    className="font-bold text-gray-900 text-sm leading-snug cursor-pointer"
                    onClick={() => goToDetails(item)}
                  >
                    {item.model}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{item.description}</p>

                  <div className="flex gap-2 mt-2">
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      RAM: {item.ram}
                    </span>
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      ROM: {item.rom}
                    </span>
                  </div>

                  <p className="font-bold text-gray-900 text-sm mt-3">
                    Rs {Number(item.price).toLocaleString()}
                  </p>

                  <div className="flex gap-2 mt-3">
                    {/* Buy Now */}
                    <button
                      onClick={() => getOrder(item)}
                      className="flex-1 flex items-center justify-center gap-1 bg-[#1a1a1a] text-white text-xs font-semibold py-2 rounded-xl hover:bg-gray-800 transition"
                    >
                      <FaBolt className="text-[10px]" /> Buy
                    </button>

                    {/* Add to Cart */}
                    <button
                      onClick={() => addToCart(item)}
                      className={`flex-1 flex items-center justify-center gap-1 border text-xs font-semibold py-2 rounded-xl transition ${
                        addedMap[item._id]
                          ? "bg-green-50 border-green-200 text-green-600"
                          : "bg-white border-gray-200 text-gray-800 hover:border-yellow-400"
                      }`}
                    >
                      <FaShoppingCart className="text-[10px]" />
                      {addedMap[item._id] ? "Added!" : "Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-base font-medium">No products found for "{model}"</p>
            <p className="text-gray-400 text-sm mt-1">Try searching with a different keyword</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Listproducts;
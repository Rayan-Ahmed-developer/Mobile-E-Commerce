import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Categoryitems = () => {
  const { name } = useParams();
  const [categoryItems, setCategoryItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://mobile-e-commerce-production-e6b9.up.railway.app//api/ecommerce/category/${name}`)
      .then((res) => {setCategoryItems(res.data.categoryItems)
      })

      .catch((err) => console.log("ERROR:", err.response?.data));
  }, [name]);

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-8 py-8  min-h-screen">

        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{name}</h1>
          <span className="text-sm text-gray-400">{categoryItems.length} products</span>
        </div>

        {categoryItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryItems.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product-details/${item._id}`)}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group"
              >
                <div className="bg-[#f5f0e8] h-44 flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.model}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-bold text-gray-900 text-sm leading-snug">{item.model}</p>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.title}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-gray-900 text-sm">
                      Rs {Number(item.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="text-5xl mb-4">📱</div>
            <p className="text-gray-500 font-medium">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categoryitems;
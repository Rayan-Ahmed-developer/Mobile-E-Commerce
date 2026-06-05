import React, { useContext } from "react";
import { productContext } from "../../Kontext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const HeroOrder = () => {
  const { phoneList } = useContext(productContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-8 py-8 bg-[#f5f0e8] min-h-screen">

        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <span className="text-sm text-gray-400">{phoneList?.length || 0} items</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {phoneList?.map((item) => (
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
                {item.brand && (
                  <span className="inline-block bg-amber-50 text-amber-700 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide mb-2">
                    {item.brand}
                  </span>
                )}
                <p className="font-bold text-gray-900 text-sm leading-snug">{item.model}</p>
                <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-gray-900 text-sm">
                    Rs {Number(item.price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroOrder;
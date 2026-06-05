import React, { useContext } from "react";
import { productContext } from "../../Kontext";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRight, FaThLarge } from "react-icons/fa";

const Items = () => {
  const { phoneList } = useContext(productContext);
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-5 pt-8 pb-4">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {phoneList?.slice(0, 20).map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product-details/${item._id}`)
          }
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group"
          >
            {/* Image */}
            <div className="bg-[#f5f0e8] h-44 flex items-center justify-center p-4 overflow-hidden">
              <img
                src={item.image}
                alt={item.model}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-3.5">
              {item.brand && (
                <span className="inline-block bg-amber-50 text-amber-700 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide mb-2">
                  {item.brand}
                </span>
              )}
              <p className="font-bold text-gray-900 text-sm leading-snug">{item.model}</p>
              {item.description && (
                <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.description}</p>
              )}
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-gray-900 text-sm">
                  Rs {Number(item.price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/hero-order"
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold px-7 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
        >
          <FaThLarge className="text-sm" />
          More Products
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
};

export default Items;
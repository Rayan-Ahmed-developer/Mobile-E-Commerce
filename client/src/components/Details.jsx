import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import { FaShoppingCart, FaBolt, FaChevronLeft } from 'react-icons/fa';

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setproductDetails] = useState(null);
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    if (!productDetails) return;
    const token = localStorage.getItem("token");
    axios
      .post("https://mobile-e-commerce-production-e6b9.up.railway.app/api/auth/add-to-cart", { productId: productDetails._id }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => { setAdded(true); setTimeout(() => setAdded(false), 2000); })
      .catch((err) => console.log("ERROR:", err.response?.data));
  };

  const getOrder = () => {
    navigate(`/order-detail?productId=${productDetails._id}`, {
      state: { type: "single", productId: productDetails._id },
    });
  };

  useEffect(() => {
    axios
      .get(`https://mobile-e-commerce-production-e6b9.up.railway.app/api/ecommerce/click-product/${id}`)

      .then((res) => {setproductDetails(res.data.product)
    console.log("Fetched product details:", res.data)
    console.log("Product ID from params:", id)
  })

      .catch((err) => console.log("ERROR:", err.response?.data));
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="bg-[#f5f0e8] min-h-screen px-4 md:px-8 py-8">
        {productDetails ? (
          <>
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition"
            >
              <FaChevronLeft className="text-xs" /> Back
            </button>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Image */}
              <div className="bg-white border border-gray-100 rounded-3xl flex items-center justify-center p-8 min-h-80">
                <img
                  src={productDetails.image}
                  alt={productDetails.model}
                  className="h-72 w-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col">
                {productDetails.brand && (
                  <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 w-fit">
                    {productDetails.brand}
                  </span>
                )}

                <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                  {productDetails.title}
                </h1>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {productDetails.description}
                </p>

                {/* Specs */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {productDetails.ram && (
                    <span className="bg-white border border-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-xl">
                      RAM: {productDetails.ram}
                    </span>
                  )}
                  {productDetails.rom && (
                    <span className="bg-white border border-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-xl">
                      ROM: {productDetails.rom}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-6">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Price</p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    Rs {Number(productDetails.price).toLocaleString()}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={getOrder}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1a] text-white font-bold py-3.5 rounded-2xl hover:bg-gray-800 transition text-sm"
                  >
                    <FaBolt /> Buy Now
                  </button>
                  <button
                    onClick={addToCart}
                    className={`flex-1 flex items-center justify-center gap-2 border font-bold py-3.5 rounded-2xl transition text-sm ${
                      added
                        ? "bg-green-50 border-green-200 text-green-600"
                        : "bg-white border-gray-200 text-gray-800 hover:border-yellow-400"
                    }`}
                  >
                    <FaShoppingCart />
                    {added ? "Added!" : "Add to Cart"}
                  </button>
                </div>

                {/* Trust badges */}
                <div className="flex gap-3 mt-5 flex-wrap">
                  {["Free Delivery", "Easy Returns", "Warranty Included"].map((t) => (
                    <span key={t} className="text-xs text-gray-400 flex items-center gap-1">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="text-5xl mb-4">📱</div>
            <p className="text-gray-500 font-medium">Something went wrong...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
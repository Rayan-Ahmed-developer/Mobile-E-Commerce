import React from "react";
import { Link } from "react-router-dom";

const Center = () => {
  return (
    <section className="mx-4 md:mx-5 mt-5 rounded-3xl bg-[#1a1a1a] px-8 md:px-14 py-14 md:py-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 min-h-[300px]">

      {/* Decorative blobs */}
      <div className="absolute w-96 h-96 rounded-full bg-yellow-400/10 -top-28 -right-16 pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full bg-yellow-400/5 -bottom-14 left-1/3 pointer-events-none" />

      {/* Left Content */}
      <div className="relative z-10 max-w-lg">
        <span className="inline-block bg-yellow-400/15 text-yellow-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase mb-5">
          ✦ Latest Mobiles At Cheap Prices
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
          Discover the <br />
          Future of{" "}
          <span className="text-yellow-400">Smartphones</span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed max-w-md">
          Latest phones, powerful performance, stunning design —
          unbeatable prices only at Sunny Mobile.
        </p>

        <div className="flex gap-3 mt-8 flex-wrap">
          <Link to="/hero-order">
            <button className="bg-yellow-400 text-black font-bold px-7 py-3 rounded-xl text-sm hover:bg-yellow-300 transition">
              Order Now →
            </button>
          </Link>
        </div>

        {/* Trust Pills */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {["Free Delivery", "Warranty Included", "Easy Returns"].map((t) => (
            <span
              key={t}
              className="bg-white/5 border border-[#2a2a2a] text-gray-500 text-xs px-3 py-1.5 rounded-full"
            >
              ✓ {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right Badges */}
      <div className="relative z-10 flex flex-row md:flex-col gap-3 shrink-0">
        {[
          { num: "500+", label: "Models in Stock" },
          { num: "7", label: "Top Brands" },
        ].map((b) => (
          <div
            key={b.label}
            className="bg-[#222] border border-[#333] rounded-2xl px-6 py-4 text-center"
          >
            <p className="text-yellow-400 text-3xl font-extrabold leading-none">{b.num}</p>
            <p className="text-gray-600 text-xs mt-1 uppercase tracking-wide">{b.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Center;
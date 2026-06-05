import React from "react";
import { Link } from "react-router-dom";
import { SiSamsung, SiVivo, SiOppo, SiOneplus, SiXiaomi, SiHuawei } from "react-icons/si";
import { FaApple } from "react-icons/fa";

const brands = [
  {
    name: "Samsung",
    slug: "samsung",
    icon: <SiSamsung className="text-3xl text-white" />,
    bg: "bg-[#1428A0]",
  },
  {
    name: "Apple",
    slug: "apple",
    icon: <FaApple className="text-3xl text-black" />,
    bg: "bg-gray-100",
  },
  {
    name: "Vivo",
    slug: "vivo",
    icon: <SiVivo className="text-3xl text-white" />,
    bg: "bg-[#415FFF]",
  },
  {
    name: "Oppo",
    slug: "oppo",
    icon: <SiOppo className="text-3xl text-white" />,
    bg: "bg-[#1D2226]",
  },
  {
    name: "OnePlus",
    slug: "oneplus",
    icon: <SiOneplus className="text-3xl text-white" />,
    bg: "bg-[#F50514]",
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    icon: <SiXiaomi className="text-3xl text-white" />,
    bg: "bg-[#FF6900]",
  },
  {
    name: "Huawei",
    slug: "huawei",
    icon: <SiHuawei className="text-3xl text-white" />,
    bg: "bg-[#CF0A2C]",
  },
];

const Category = () => {
  return (
    <div className="px-4 md:px-5 pt-8">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Shop by Brand</h2>
        <span className="text-sm text-gray-400">7 brands available</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
        {brands.map((brand) => (
          <Link key={brand.slug} to={`/Categoryitems/${brand.slug}`}>
            <div className="bg-white border border-gray-100 rounded-2xl p-3 md:p-4 flex flex-col items-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${brand.bg} flex items-center justify-center`}>
                {brand.icon}
              </div>
              <span className="text-xs text-gray-500 font-medium text-center leading-tight">
                {brand.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
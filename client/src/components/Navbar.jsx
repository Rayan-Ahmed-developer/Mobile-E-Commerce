import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchBar, setsearchBar] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const navigate = useNavigate();

  const searchMobile = async () => {
    if (!searchBar) {
      setsearchResult([]);
      return;
    }
    try {
      const res = await axios.get(`https://mobile-e-commerce-production.up.railway.app/api/ecommerce/search/${searchBar}`);
      setsearchResult(res.data.phones || []);
    } catch (error) {
      console.error("Error searching mobiles:", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      searchMobile();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchBar]);

  // Reusable Search Dropdown Component
  const SearchDropdown = () => (
    searchResult.length > 0 && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-[60]">
        {searchResult.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-amber-50 cursor-pointer transition"
            onClick={() => {
              navigate(`/product/${item.model}`);
              setsearchResult([]);
              setsearchBar("");
              setMenuOpen(false);
            }}
          >
            <FaSearch className="text-gray-400 text-xs" />
            <span className="text-sm text-gray-800">{item.model}</span>
          </div>
        ))}
      </div>
    )
  );

  return (
    <nav className="bg-[#1a1a1a] px-4 md:px-8 sticky top-0 z-50">
      <div className="flex items-center justify-between py-3 gap-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            Sunny <span className="text-yellow-400">Mobile</span>
          </h1>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-[#2a2a2a] border border-[#333] rounded-full px-4 py-2 gap-2 flex-1 max-w-sm relative">
          <FaSearch className="text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search mobiles..."
            className="bg-transparent outline-none text-white text-sm flex-1"
            value={searchBar}
            onChange={(e) => setsearchBar(e.target.value)}
          />
          <SearchDropdown />
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart" className="text-white hover:text-yellow-400 transition">
            <FaShoppingCart className="text-lg" />
          </Link>
          <Link to="/login" className="text-gray-400 text-sm hover:text-white px-3">Login</Link>
          <Link to="/signup" className="bg-yellow-400 text-black font-bold px-5 py-2 rounded-full text-sm hover:bg-yellow-300">
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="text-white"><FaShoppingCart /></Link>
          <button className="text-white text-xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden pb-3 relative">
        <div className="flex items-center bg-[#2a2a2a] border border-[#333] rounded-full px-4 py-2 gap-2">
          <FaSearch className="text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white text-sm w-full"
            value={searchBar}
            onChange={(e) => setsearchBar(e.target.value)}
          />
        </div>
        <SearchDropdown />
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-2 pb-4 animate-in fade-in slide-in-from-top-4">
          <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full text-center border border-[#444] text-gray-300 py-3 rounded-full text-sm">Login</Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)} className="w-full text-center bg-yellow-400 text-black font-bold py-3 rounded-full text-sm">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
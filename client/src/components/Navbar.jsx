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
    if (!searchBar) { setsearchResult([]); return; }
    try {
      const res = await axios.get(`http://localhost:5000/api/ecommerce/search/${searchBar}`);
      setsearchResult(res.data.phones || []);
    } catch (error) {
      console.error("Error searching mobiles:", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => { searchMobile(); }, 500);
    return () => clearTimeout(delay);
  }, [searchBar]);

  return (
    <nav className="bg-[#1a1a1a] px-5 md:px-8 sticky top-0 z-50">
      <div className="flex items-center justify-between py-3 gap-4">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-extrabold text-white whitespace-nowrap tracking-tight">
            Sunny <span className="text-yellow-400">Mobile</span>
          </h1>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-[#2a2a2a] border border-[#333] rounded-full px-4 py-2 gap-2 flex-1 max-w-sm relative">
          <FaSearch className="text-gray-500 text-sm shrink-0" />
          <input
            type="text"
            placeholder="Search mobiles, brands..."
            className="bg-transparent outline-none text-white text-sm flex-1 placeholder-gray-600 min-w-0"
            value={searchBar}
            onChange={(e) => setsearchBar(e.target.value)}
          />
          <Link to={`/product/${searchBar}`}>
            <button
              onClick={searchMobile}
              className="bg-yellow-400 text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-yellow-300 transition whitespace-nowrap"
            >
              Search
            </button>
          </Link>

          {/* Desktop Dropdown */}
          {searchResult.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-56 overflow-y-auto z-50">
              {searchResult.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 hover:bg-amber-50 cursor-pointer last:border-0"
                  onClick={() => { navigate(`/product/${item.model}`); setsearchResult([]); setsearchBar(""); }}
                >
                  <FaSearch className="text-gray-300 text-xs" />
                  <span className="text-sm text-gray-800">{item.model}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link to="/cart">
            <button className="border border-[#333] text-white rounded-full w-10 h-10 flex items-center justify-center hover:border-yellow-400 transition">
              <FaShoppingCart className="text-base" />
            </button>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <button className="border border-[#444] text-gray-400 px-4 py-2 rounded-full text-sm hover:border-gray-300 transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full text-sm hover:bg-yellow-300 transition">
                Sign Up
              </button>
            </Link>
          </div>
          <button
            className="md:hidden border border-[#333] text-white rounded-lg w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Search — relative ADD kiya, dropdown bhi add kiya */}
      <div className="md:hidden flex items-center bg-[#2a2a2a] border border-[#333] rounded-full px-4 py-2 gap-2 mb-3 relative">
        <FaSearch className="text-gray-500 text-sm shrink-0" />
        <input
          type="text"
          placeholder="Search mobiles..."
          className="bg-transparent outline-none text-white text-sm flex-1 placeholder-gray-600"
          value={searchBar}
          onChange={(e) => setsearchBar(e.target.value)}
        />
        <Link to={`/product/${searchBar}`}>
          <button onClick={searchMobile} className="bg-yellow-400 text-black text-xs font-bold px-4 py-1.5 rounded-full">
            Search
          </button>
        </Link>

        {/* Mobile Dropdown — yeh missing tha! */}
        {searchResult.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-56 overflow-y-auto z-50">
            {searchResult.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 hover:bg-amber-50 cursor-pointer last:border-0"
                onClick={() => { navigate(`/product/${item.model}`); setsearchResult([]); setsearchBar(""); }}
              >
                <FaSearch className="text-gray-300 text-xs" />
                <span className="text-sm text-gray-800">{item.model}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-2 pb-4">
          <Link to="/login">
            <button className="w-full border border-[#444] text-gray-400 py-2.5 rounded-full text-sm">Login</button>
          </Link>
          <Link to="/signup">
            <button className="w-full bg-yellow-400 text-black font-bold py-2.5 rounded-full text-sm">Sign Up</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
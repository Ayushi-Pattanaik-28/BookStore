import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-[#f3e5d0] text-[#3e2c1c] font-serif shadow-md border-b border-[#d5c3aa]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#5e3b1c] tracking-wider">
          BookHaven
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-[#a97455] transition">Home</Link>
          <Link to="/all-books" className="hover:text-[#a97455] transition">Books</Link>
          <Link to="/about-us" className="hover:text-[#a97455] transition">About</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-[#a97455]">Login</Link>
              <Link to="/signup" className="hover:text-[#a97455]">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:text-[#a97455]">{user?.username || 'Profile'}</Link>

              {!isAdmin && (
                <Link to="/cart" className="hover:text-[#a97455]">Cart</Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-[#a97455] text-white px-4 py-1 rounded-full hover:bg-[#8d5f41] transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#5e3b1c]">
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 text-[#3e2c1c] bg-[#e9d8b7] border-t border-[#d4bfa6]">
          <Link to="/" onClick={toggleMenu} className="hover:text-[#a97455]">Home</Link>
          <Link to="/all-books" onClick={toggleMenu} className="hover:text-[#a97455]">Books</Link>
          <Link to="/about-us" onClick={toggleMenu} className="hover:text-[#a97455]">About</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={toggleMenu} className="hover:text-[#a97455]">Login</Link>
              <Link to="/signup" onClick={toggleMenu} className="hover:text-[#a97455]">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={toggleMenu} className="hover:text-[#a97455]">{user?.username || 'Profile'}</Link>

              {!isAdmin && (
                <Link to="/cart" onClick={toggleMenu} className="hover:text-[#a97455]">Cart</Link>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-[#a97455] text-white px-4 py-1 rounded-full hover:bg-[#8d5f41] transition text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

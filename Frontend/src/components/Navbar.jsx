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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-400">
          BookVerse
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-white">
          <Link to="/" className="hover:text-pink-400">Home</Link>
          <Link to="/all-books" className="hover:text-pink-400">Books</Link>
          <Link to="/about-us" className="hover:text-pink-400">About</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-pink-400">Login</Link>
              <Link to="/signup" className="hover:text-pink-400">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:text-pink-400">{user?.username || 'Profile'}</Link>
              <Link to="/cart" className="hover:text-pink-400">Cart</Link>
              <Link to="/favourite" className="hover:text-pink-400">Wishlist</Link>
              <button
                onClick={handleLogout}
                className="bg-pink-500 text-black px-3 py-1 rounded hover:bg-pink-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 text-white bg-zinc-800">
          <Link to="/" onClick={toggleMenu} className="hover:text-pink-400">Home</Link>
          <Link to="/all-books" onClick={toggleMenu} className="hover:text-pink-400">Books</Link>
          <Link to="/about-us" onClick={toggleMenu} className="hover:text-pink-400">About</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={toggleMenu} className="hover:text-pink-400">Login</Link>
              <Link to="/signup" onClick={toggleMenu} className="hover:text-pink-400">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={toggleMenu} className="hover:text-pink-400">{user?.username || 'Profile'}</Link>
              <Link to="/cart" onClick={toggleMenu} className="hover:text-pink-400">Cart</Link>
              <Link to="/favourite" onClick={toggleMenu} className="hover:text-pink-400">Wishlist</Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-pink-500 text-black px-3 py-1 rounded hover:bg-pink-600 transition text-left"
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

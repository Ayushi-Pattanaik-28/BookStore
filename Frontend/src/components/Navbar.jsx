import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        { title: 'Home', link: "/" },
        { title: "About Us", link: "/about-us" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);  

    // Remove "Cart" link if admin is logged in, but keep "Profile" link
    if (isLoggedIn && role === 'admin') {
        const cartIndex = links.findIndex(link => link.title === 'Cart');
        if (cartIndex !== -1) {
            links.splice(cartIndex, 1);  // Removes the "Cart" link only
        }
    }

    const [MobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
                <Link to="/" className='flex items-center'>
                    <img className="h-10 me-4" src='' alt='logo' />
                    <h1 className='text-3xl font-bold'>Bookstore</h1>
                </Link>
                <div className='nav-links-bookstore block md:flex items-center gap-4'>
                    <div className='hidden md:flex gap-4'>
                        {links.map((items, i) => (
                            <Link 
                                to={items.link} 
                                className='hover:text-blue-400 transition-all duration-300' 
                                key={i}
                            >
                                {items.title}
                            </Link>
                        ))}
                    </div>
                    {isLoggedIn === false && (
                        <>
                            <Link to="/login" className="hover:text-blue-400 transition-all duration-300">Login</Link>
                            <Link to="/signup" className="hover:text-blue-400 transition-all duration-300">Sign Up</Link>
                        </>
                    )}
                    <button 
                        className='block md:hidden text-white text-2xl hover:text-zinc-400'
                        onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link 
                        to={items.link} 
                        className="text-white text-4xl mb-8 font-semibold hover:text-blue-400 transition-all duration-300" 
                        key={i}
                        onClick={() => setMobileNav("hidden")}
                    >
                        {items.title}
                    </Link>
                ))}
                {!isLoggedIn && (
                    <>
                        <Link 
                            to="/login" 
                            className="px-8 mb-8 text-3xl py-2 border border-blue-400 rounded text-white hover:bg-white hover:text-zinc-800"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup" 
                            className="px-8 mb-8 text-3xl py-2 bg-blue-400 rounded hover:bg-white hover:text-black"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}

export default Navbar;

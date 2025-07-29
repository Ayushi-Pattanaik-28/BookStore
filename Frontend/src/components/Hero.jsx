import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="h-[85vh] bg-[#f3e5d0] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 font-serif">
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold text-[#5e3b1c] leading-tight drop-shadow-sm">
          Rediscover the <span className="text-[#8b5e3c] italic">Joy of Reading</span>
        </h1>
        <p className="mt-6 text-lg lg:text-xl text-[#4b3d2a] opacity-80">
          Step into a world of timeless tales and forgotten classics. Vintage, rare, or beloved — explore your kind of story.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="bg-[#c49a6c] text-white font-semibold px-8 py-3 rounded-full text-lg shadow-md hover:bg-[#a97c50] transition duration-300"
          >
            Browse Collection
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:block w-full md:w-1/2 mt-10 md:mt-0">
        <img
          src="https://img.pikbest.com/ai/illus_our/20230414/70e479b7eb557c855024cef759fb758a.jpg!w700wp"
          alt="Vintage Books"
          className="w-full h-auto rounded-lg shadow-xl border border-[#d4bfa6]"
        />
      </div>
    </section>
  );
};

export default Hero;

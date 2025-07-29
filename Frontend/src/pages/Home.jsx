import React from 'react';
import Hero from '../components/Hero';
import RecentlyAdded from '../components/RecentlyAdded';

const Home = () => {
  return (
    <div className="bg-[#c49a6c] text-[#4b3621] font-serif px-6 md:px-12 py-10 min-h-screen">
      <Hero />
      <RecentlyAdded />
    </div>
  );
};

export default Home;

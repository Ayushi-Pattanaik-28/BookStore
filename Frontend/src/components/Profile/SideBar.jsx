import React from 'react';
import { Link } from 'react-router-dom';


const SideBar = ({ data, handleLogout }) => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-700 p-6 rounded-lg shadow-xl w-72 h-[75vh]">
      <div className="text-center mb-8">
        <img
          src={data.avatar}
          alt="User Avatar"
          className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-blue-500 transition-transform transform hover:scale-110"
        />
        <p className="text-white text-2xl font-semibold">{data.username}</p>
        <p className="text-white text-sm opacity-70">{data.email}</p>
      </div>



      <div className="text-center flex flex-col justify-center space-y-8">


        <Link
          to="/favourite"
          className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full sm:w-auto"
        >
          Favourite
        </Link>

        <Link
          to="/cart"
          className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full sm:w-auto"
        >
          Cart
        </Link>

        {/* Use handleLogout passed as prop */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full sm:w-auto"
        >
          Logout
        </button>
      </div>







    </div>

  );
};

export default SideBar;

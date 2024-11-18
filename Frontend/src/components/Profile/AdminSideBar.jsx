import React from 'react';


const AdminSideBar = ({ data, handleLogout }) => {
    return (
        <div className="bg-zinc-900 text-white w-full md:w-1/4 p-6 rounded-2xl shadow-lg flex flex-col justify-between h-full mx-auto my-6">
            {/* Box Around Content */}
            <div className="flex flex-col items-center justify-center bg-zinc-800 p-6 rounded-xl shadow-xl w-full">
                <div className="text-center mb-8 flex flex-col items-center">
                    <img
                        src={data.url}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-blue-500 mb-4 shadow-lg"
                    />
                    <h2 className="text-3xl font-bold text-blue-400">{data.username}</h2>
                    <p className="text-lg text-zinc-400">{data.email}</p>
                </div>
                <div className="flex flex-col items-center space-y-4 mt-auto">
                    
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full shadow-lg text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Logout
                    </button>
                    <p className="text-center text-sm text-zinc-500 mt-4">Admin Dashboard</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSideBar;

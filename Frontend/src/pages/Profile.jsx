import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/Profile/SideBar';
import AdminSideBar from '../components/Profile/AdminSideBar'; // Admin sidebar import

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null); // Add error state to capture errors

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected the authorization header
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Log the headers to ensure they are correct
                console.log("Headers:", headers);

                const response = await axios.get("http://localhost:1000/api/get-user-information", { headers });

                if (response.data) {
                    setProfileData(response.data);
                } else {
                    throw new Error("No data received from server.");
                }
            } catch (error) {
                // Log detailed error information
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    console.error("Error fetching user data - Response:", error.response);
                    setError(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("Error fetching user data - No response:", error.request);
                    setError("No response received from server.");
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error("Error fetching user data - General error:", error.message);
                    setError(`General error: ${error.message}`);
                }
            }
        };

        fetchUserData();
    }, [headers]);

    const handleLogout = () => {
        // Clear localStorage to remove user session
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        navigate('/login');
    };

    // Check if the logged-in user is an admin
    const isAdmin = profileData?.role === 'admin'; // Assuming 'role' is part of user data

    return (
        <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white'>
            {error && (
                <div className="bg-red-500 p-4 rounded-md mb-4">
                    <p className="text-white">{error}</p>
                </div>
            )}

            {!profileData ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {/* Sidebar based on user role */}
                    {isAdmin ? (
                        <AdminSideBar data={profileData} handleLogout={handleLogout} />
                    ) : (
                        <SideBar data={profileData} handleLogout={handleLogout} />
                    )}

                    <div className="flex-1 p-6">
                        {/* Add profile content here */}
                        <h2>Welcome, {profileData.name}</h2>
                        <p>Role: {profileData.role}</p>
                        {/* Add additional user profile content */}
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/Profile/SideBar';
import AdminSideBar from '../components/Profile/AdminSideBar'; // Admin sidebar import

const Profile = () => {
    const [profileData, setProfileData] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected the authorization header
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/get-user-information", { headers });
                setProfileData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

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
                    </div>
                </>
            )}

           
        </div>
    );
};

export default Profile;

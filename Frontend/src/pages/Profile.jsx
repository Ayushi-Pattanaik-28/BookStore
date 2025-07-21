import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/auth'; // ✅ Import logout action

const Profile = () => {
  const reduxUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUser(reduxUser || storedUser);
    }
  }, [reduxUser, navigate]);

  const handleLogout = () => {
    // ✅ Clear all stored user data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');

    // ✅ Dispatch redux logout action
    dispatch(logout());

    // ✅ Redirect to login page
    navigate('/login');
  };

  if (!user) {
    return <div className="text-white text-center mt-10">Loading user data...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">User Profile</h1>
        <div className="text-black font-medium space-y-4">
          <p><span className="font-semibold">Username:</span> {user.username || 'N/A'}</p>
          <p><span className="font-semibold">Email:</span> {user.email || 'N/A'}</p>
          <p><span className="font-semibold">Role:</span> {user.role || 'N/A'}</p>
          <p><span className="font-semibold">Address:</span> {user.address || 'N/A'}</p>
        </div>

        <button
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

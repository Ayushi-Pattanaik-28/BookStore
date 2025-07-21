import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>ID:</strong> {user.id || user._id}</p>
    </div>
  );
};

export default UserDetails;

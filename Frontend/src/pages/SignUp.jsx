import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { username, email, password, address } = Values;
      if (!username || !email || !password || !address) {
        alert("Please fill all fields.");
        return;
      }

      const response = await axios.post("http://localhost:1000/api/sign-up", Values);

      if (response.status === 200) {
        alert(response.data.message || "Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#c49a6c] min-h-screen flex items-center justify-center px-6 py-12 font-serif text-[#4b3d2a]">
      <div className="w-full max-w-md bg-[#f9efe2] border border-[#e0d2b8] p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#7b4a32] border-b pb-2 border-[#c49a6c]">
          Create Account
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={Values.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-3 py-2 text-sm rounded bg-[#fffaf1] border border-[#d6c4a4] focus:outline-none focus:ring-2 focus:ring-[#c49a6c]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={Values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm rounded bg-[#fffaf1] border border-[#d6c4a4] focus:outline-none focus:ring-2 focus:ring-[#c49a6c]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={Values.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-3 py-2 text-sm rounded bg-[#fffaf1] border border-[#d6c4a4] focus:outline-none focus:ring-2 focus:ring-[#c49a6c]"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={Values.address}
              onChange={handleChange}
              placeholder="Your address"
              className="w-full px-3 py-2 text-sm rounded bg-[#fffaf1] border border-[#d6c4a4] focus:outline-none focus:ring-2 focus:ring-[#c49a6c]"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-[#4b3d2a] hover:bg-[#3a2a1c] text-white text-sm font-semibold py-2.5 rounded transition-colors"
        >
          Sign Up
        </button>

        <p className="text-center text-xs mt-4 text-[#6e5843]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#8b5e3c] hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

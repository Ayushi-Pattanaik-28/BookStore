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
    <div className="bg-zinc-900 text-white px-10 py-8 min-h-[400px] flex items-center justify-center">
      <div className="w-[400px] bg-zinc-800 rounded-xl shadow-md p-5">
        <h2 className="text-xl font-bold mb-4 text-center text-pink-400">Sign Up</h2>

        <div className="space-y-3">
          <div>
            <label htmlFor="username" className="block text-xs font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={Values.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-2 py-1.5 text-sm rounded bg-zinc-700 border border-zinc-600 focus:ring-1 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={Values.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-2 py-1.5 text-sm rounded bg-zinc-700 border border-zinc-600 focus:ring-1 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={Values.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-2 py-1.5 text-sm rounded bg-zinc-700 border border-zinc-600 focus:ring-1 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-xs font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={Values.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-2 py-1.5 text-sm rounded bg-zinc-700 border border-zinc-600 focus:ring-1 focus:ring-pink-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 w-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 rounded transition"
        >
          Sign Up
        </button>

        <p className="text-center text-xs mt-3 text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

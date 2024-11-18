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

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const navigate = useNavigate();

  const submit = async () => {
    try {
      if (!Values.username || !Values.email || !Values.password || !Values.address) {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post("http://localhost:1000/api/sign-up", Values);
        alert(response.data.message);
        // Redirect to login page after successful signup
        if (response.status === 200) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800 flex-col">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">SignUp</h1>

        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-2 text-black font-medium">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={Values.username}
            onChange={change}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2 text-black font-medium">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={Values.email}
            onChange={change}
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-2 text-black font-medium">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={Values.password}
            onChange={change}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="address" className="mb-2 text-black font-medium">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={Values.address}
            onChange={change}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-black py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
          onClick={submit}
        >
          SignUp
        </button>
        <p className="font-semibold">
          Already have an account?{" "}
          <Link to="/login" className="text-zinc-800 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, changeRole, setUser } from '../store/auth';  // Correct action imports

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!values.username || !values.password) {
        alert('Please fill all the fields');
        return;
      }

      const response = await axios.post('http://localhost:1000/api/sign-in', values);

      if (response.status === 200) {
        dispatch(login());  // Dispatch the login action
        dispatch(changeRole(response.data.role));  // Dispatch changeRole with the received role
        dispatch(setUser(response.data.user));  // Dispatch setUser with the user data

        localStorage.setItem('id', response.data.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        console.log('Authorization Header:', `Bearer ${response.data.token}`);
        navigate('/');  // Redirect to profile page
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to log in.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800 flex-col">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">Login</h1>

        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-2 text-black font-medium">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={values.username}
            onChange={handleChange}
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
            value={values.password}
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-black py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className="font-semibold mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-zinc-800 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

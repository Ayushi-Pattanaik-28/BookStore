import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, setUser, changeRole } from '../store/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!values.username || !values.password) {
        alert('Please fill all the fields');
        return;
      }

      const response = await axios.post('http://localhost:1000/api/sign-in', values);

      if (response.status === 200) {
        const { token, user } = response.data;

        dispatch(login());
        dispatch(changeRole(user.role));
        dispatch(setUser(user));

        localStorage.setItem('id', user.id);
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('user', JSON.stringify(user));

        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to log in.');
    }
  };

  return (
    <div className="bg-zinc-900 text-white px-10 py-8 min-h-screen flex items-center justify-center">
      <div className="w-[300px] bg-zinc-800 rounded-xl shadow-md p-5">
        <h2 className="text-xl font-bold mb-4 text-center text-pink-400">Log In</h2>

        <div className="space-y-3">
          <div>
            <label htmlFor="username" className="block text-xs font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={(e) => setValues({ ...values, username: e.target.value })}
              placeholder="Username"
              className="w-full px-2 py-1.5 text-sm rounded bg-zinc-700 border border-zinc-600 focus:ring-1 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              placeholder="Password"
              className="w-full px-2 py-1.5 text-sm rounded bg-zinc-700 border border-zinc-600 focus:ring-1 focus:ring-pink-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 w-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 rounded transition"
        >
          Log In
        </button>

        <p className="text-center text-xs mt-3 text-zinc-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-pink-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

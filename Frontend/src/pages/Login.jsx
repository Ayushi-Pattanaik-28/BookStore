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
    <div className="bg-[#c49a6c] min-h-screen flex items-center justify-center px-6 py-12 font-serif text-[#4b3d2a]">
      <div className="w-full max-w-sm bg-[#f9efe2] border border-[#e0d2b8] p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#7b4a32] border-b pb-2 border-[#c49a6c]">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={(e) => setValues({ ...values, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full px-3 py-2 text-sm rounded bg-[#fffaf1] border border-[#d6c4a4] focus:outline-none focus:ring-2 focus:ring-[#c49a6c]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-sm rounded bg-[#fffaf1] border border-[#d6c4a4] focus:outline-none focus:ring-2 focus:ring-[#c49a6c]"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-[#4b3d2a] hover:bg-[#3a2a1c] text-white text-sm font-semibold py-2.5 rounded transition-colors"
        >
          Log In
        </button>

        <p className="text-center text-xs mt-4 text-[#6e5843]">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#8b5e3c] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

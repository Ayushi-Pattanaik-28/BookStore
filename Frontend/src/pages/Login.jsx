import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, setUser, changeRole } from '../store/auth';
import { useNavigate } from 'react-router-dom';

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
    <div className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={values.username}
        onChange={(e) => setValues({ ...values, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
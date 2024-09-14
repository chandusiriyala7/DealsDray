import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import AnimatedButton from './AnimatedButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is included

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      toast.success('Login successful!');
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      setError('Invalid credentials, try again!');
      toast.error('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="animated-title">Login to Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="animated-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="animated-input"
            required
          />
          <AnimatedButton text="Login" />
        </form>
        <p onClick={() => navigate('/register')} className="switch-form">
          Don't have an account? Register here!
        </p>
      </div>
    </div>
  );
};

export default Login;

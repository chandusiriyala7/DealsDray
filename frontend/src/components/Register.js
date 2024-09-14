import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import AnimatedButton from './AnimatedButton';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await registerUser(formData);
   
      navigate('/login'); // Redirect to login after registration
    } catch (err) {
      setError('Registration failed, try again!');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="animated-title">Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="animated-input" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="animated-input" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="animated-input" required />
          <AnimatedButton text="Register" />
        </form>
        <p onClick={() => navigate('/login')} className="switch-form">
          Already have an account? Login here!
        </p>
      </div>
    </div>
  );
};

export default Register;

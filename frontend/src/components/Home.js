import React, { useState } from 'react';
import { registerEmployee } from '../api';
import '../App.css'

const Home = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'Hr',
    gender: 'M',
    courses: [],
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEmployeeData((prevData) => ({
        ...prevData,
        courses: checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value),
      }));
    } else if (type === 'file') {
      setEmployeeData((prevData) => ({
        ...prevData,
        image: e.target.files[0]
      }));
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Append form data
    for (const key in employeeData) {
      if (Array.isArray(employeeData[key])) {
        employeeData[key].forEach((item) => formData.append(`${key}[]`, item));
      } else if (employeeData[key]) {
        formData.append(key, employeeData[key]);
      }
    }
  
    try {
      // Use the API function to register the employee
      await registerEmployee(formData);
      alert('Employee data submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the data!', error);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">DealsDray</div>
        <ul className="nav-items">
          <li>Home</li>
          <li>EmployeeList</li>
          <li>Username</li>
          <li onClick={() => window.location.href = '/login'}>Logout</li>
        </ul>
      </nav>
      <div className="dashboard-body">
        <h1>Welcome to Dashboard</h1>
        <p>This is the dashboard where you can manage employee details and other relevant content.</p>
        <form className="employee-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={employeeData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
          </label>
          <label>
            Mobile Number:
            <input type="text" name="mobile" value={employeeData.mobile} onChange={handleChange} required />
          </label>
          <label>
            Designation:
            <select name="designation" value={employeeData.designation} onChange={handleChange}>
              <option value="Hr">Hr</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </label>
          <label>
            Gender:
            <label>
              <input type="radio" name="gender" value="M" checked={employeeData.gender === 'M'} onChange={handleChange} /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="F" checked={employeeData.gender === 'F'} onChange={handleChange} /> Female
            </label>
          </label>
          <label>
            Course:
            <label>
              <input type="checkbox" name="courses" value="MCA" checked={employeeData.courses.includes('MCA')} onChange={handleChange} /> MCA
            </label>
            <label>
              <input type="checkbox" name="courses" value="BCA" checked={employeeData.courses.includes('BCA')} onChange={handleChange} /> BCA
            </label>
            <label>
              <input type="checkbox" name="courses" value="MSC" checked={employeeData.courses.includes('MSC')} onChange={handleChange} /> MSC
            </label>
          </label>
          <label>
            Image:
            <input type="file" name="image" onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

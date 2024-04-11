import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { FormControl } from '@mui/material';
import { useAuth } from '../Contexts/AuthContext'; 
import {
  StyledFormContainer,
  StyledLabel,
  StyledTextField,
  StyledButton,
} from '../Styles/GameFormStyles';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth(); // Use the useAuth hook to get the login function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7168/api/account/login', formData);
      console.log('Login successful:', response.data);
      
      // Extract the token from the response data
      const token = response.data.token;
      console.log('Login successful. Received token:', token);
      // Store the token securely (e.g., in local storage)
      localStorage.setItem('token', token);
      
      login(); // Call the login function from the useAuth hook
      // You can handle success, e.g., redirect the user to another page
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // You can handle errors, e.g., display error messages to the user
    }
  };

  return (
    <StyledFormContainer>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <StyledLabel>Email:</StyledLabel>
          <StyledTextField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <StyledLabel>Password:</StyledLabel>
          <StyledTextField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <StyledButton type="submit">Login</StyledButton>
        {/* Add registration link */}
        <Link to="/registration" style={{ marginLeft: '35px' }}>New users, click here to register</Link>
      </form>
    </StyledFormContainer>
  );
};

export default LoginForm;

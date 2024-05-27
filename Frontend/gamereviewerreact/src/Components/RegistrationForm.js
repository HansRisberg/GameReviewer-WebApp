import React, { useState } from 'react';
//import axios from 'axios';
import { FormControl } from '@mui/material';
import {
  StyledFormContainer,
  StyledLabel,
  StyledTextField,
  StyledButton,
} from '../Styles/GameFormStyles';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../Services/Api';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await createUser(formData);
      //const response = await axios.post('https://gamereviewerbackendapi.azurewebsites.net/api/account/register', formData);
      console.log('Registration successful:', response.data);
      navigate('/login');
      
      // You can handle success, e.g., redirect the user to a login page
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // You can handle errors, e.g., display error messages to the user
    }
  };

  return (
    <StyledFormContainer>
      <h1>Registration Form</h1>
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
        <FormControl fullWidth>
          <StyledLabel>Confirm Password:</StyledLabel>
          <StyledTextField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <StyledLabel>Name:</StyledLabel>
          <StyledTextField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormControl>
        <StyledButton type="submit">Register</StyledButton>
      </form>
    </StyledFormContainer>
  );
};

export default RegistrationForm;

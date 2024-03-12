import React, { useState } from 'react';
import { FormControl } from '@mui/material';
import {
  StyledFormContainer,
  StyledLabel,
  StyledTextField,
  StyledButton,
} from '../Styles/GameFormStyles'; // Assuming these styles are shared

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Your registration logic here
    } catch (error) {
      // Error handling logic here
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

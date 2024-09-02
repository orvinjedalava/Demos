// Login.tsx
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { loginBasic, loginJwt } = useAuth();
  const navigate = useNavigate();

  const handleLoginBasic = async () => {
    const result: boolean = await loginBasic();
    
    if (result) {
      navigate('/');
    }
    
  };

  const handleLoginJwt = async () => {
    const result: boolean = await loginJwt();
    
    if (result) {
      navigate('/');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLoginBasic}>Login Basic</button>
      <button onClick={handleLoginJwt}>Login JWT</button>
    </div>
  );
};
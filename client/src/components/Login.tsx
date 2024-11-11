import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // הוספתי את GoogleOAuthProvider
import '../css/Login.css';
import { loginUser } from '../utils/LoginUtils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password);
      console.log('Login success:', result);
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Google login response:', response);
  };

  const handleGoogleLoginFailure = () => {
    console.log('Google login failed');
  };

  return (
    <GoogleOAuthProvider clientId="הכנס-כאן-את-המפתח-שלך">     {/* need to generate my google keyyyyyyyyyyyy */}
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-button" type="submit">Login</button>
          </form>

          <div className="or-text">or</div>

          <div className="google-login-container">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;

import React, { useState , useEffect } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // הוספתי את GoogleOAuthProvider
import '../css/Login.css';
import { loginUser } from '../utils/LoginUtils';
import Cookies from 'js-cookie';
import { Link , useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [clientId, setClientId] = useState('');

  
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken') || Cookies.get('refreshToken');
    if (storedToken) {
      navigate('/feed');  
    }
  }, [navigate]);


  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/google-client-id`); 
        const data = await response.json();  
        setClientId(data.clientId);  
      } catch (err) {
        console.error('Error fetching clientId:', err);  
      }
    };

    fetchClientId();  
  }, []);  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password);
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('userId', result.userId);
      Cookies.set('refreshToken', result.refreshToken, {
        secure: true, 
        httpOnly: false, 
        sameSite: 'strict', 
        expires: 180 
      });
      navigate('/feed');
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
        alert(`Error: ${err.message}`);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const googleToken = response.credential;
      const result = await fetch(`${process.env.REACT_APP_API_URL}/users/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken }),
      });

      if (!result.ok) {
        throw new Error('Failed to authenticate with Google');
      }

      const data = await result.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.userId);
      Cookies.set('refreshToken', data.refreshToken, {
        secure: true,
        httpOnly: false,
        sameSite: 'strict',
        expires: 180,
      });
      navigate('/feed');
    } catch (err) {
      console.error('Google login failed:', err);
      alert('Google login failed. Please try again.');
    }
  };
  

  const handleGoogleLoginFailure = () => {
    console.log('Google login failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-wrapper">
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
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;

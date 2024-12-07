import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Authentication } from '../../context/Authentication';
import toast from 'react-hot-toast';
import { saveToken, } from '../../components/AuthService';
const GoogleOAuthComponent = () => {
  const {setIsLoggedIn,setUserId} = useContext(Authentication);

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('https://colorpalettebackend.onrender.com/api/v1/google', {
        credential: credentialResponse.credential
      }
      );

      localStorage.setItem('userId', JSON.stringify(response.data.user));
      setIsLoggedIn(true);
      saveToken(response.data.token);
      toast.success("Successfully Logged In");
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Authentication failed', error.response?.data || error.message);
      
      toast.error('Login failed. Please try again.');
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
    toast.error('Google Login Failed. Please try again.');
  };

  return (
    <div className="google-oauth-container">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        text="Continue with"
        shape="rectangular"
        width="280" 
        theme="filled_blue"
        className="google-oauth-button"
      />
    </div>
  );
};

export default GoogleOAuthComponent;
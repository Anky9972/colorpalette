import React, { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';

function ForgotPassword({ onShowSignIn }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://colorpalettebackend.onrender.com/api/v1/forgot-password', { email });
      toast.success('Password reset email sent');
    } catch (error) {
      console.error(error);
      toast.error('Error sending password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-xs flex flex-col gap-5">
      <div className="w-full text-center">
        <div className="text-2xl font-bold">Reset Password</div>
        <div className="text-gray-400 leading-tight font-semibold">Enter your email to reset your password.</div>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-black"
        />
        <button 
          type="submit" 
          className="w-full py-2 bg-black text-white rounded-lg text-sm font-semibold flex justify-center items-center h-10"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <ThreeDots width="24" height="24" color="#ffffff" />
            </div>
          ) : 'Reset Password'}
        </button>
      </form>

      <div className="w-full text-center text-sm font-semibold text-black">
        <div>
          <span>Remembered your password? </span>
          <span className="text-blue-500 cursor-pointer" onClick={onShowSignIn}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

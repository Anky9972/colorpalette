import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://colorpalettebackend.onrender.com/api/v1/reset-password/${token}`, { newPassword });
      toast.success('Password reset successful');
    } catch (error) {
      console.error(error);
      toast.error('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen bg-gray-100 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-center'>Reset Password</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className='w-full border border-gray-300 rounded-lg text-sm py-2 px-3 pr-10 focus:outline-black'
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-3 flex items-center text-gray-500'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} 
            </button>
          </div>
          <button 
            type="submit" 
            className='w-full py-2 bg-black text-white rounded-lg text-sm font-semibold flex justify-center items-center'
          >
            {loading ? <ThreeDots width='30' color="#ffffff" /> : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

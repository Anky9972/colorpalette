import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading,setLoading] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await axios.put(`https://colorpalettebackend.onrender.com/api/v1/reset-password/${token}`, { newPassword });
      toast.success('Password reset successful');
      setLoading(false)
    } catch (error) {
      console.error(error);
      alert('Error resetting password');
    }
  };

  return (
    <div className='w-full h-full bg-slate-100 flex justify-center items-center flex-col gap-10'>
      <h1 className='text-5xl font-bold'>Reset Password!</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            className='h-12 w-64 border p-4 bg-blue-100 font-bold pr-12' 
          />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className='absolute top-0 right-0 h-full w-12 text-lg bg-blue-100' 
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </button>
        </div>
        <button type="submit" className='h-12 font-bold text-lg bg-red-400 flex justify-center items-center'>
        {
                  loading ? (<ThreeDots width='38' color="#ffffff"/>): 'Reset Password'
                  
                  
                }</button>
      </form>
    </div>
  );
};

export default ResetPassword;

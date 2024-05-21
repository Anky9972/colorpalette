import React, { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading,setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await axios.post('https://colorpalettebackend.onrender.com/api/v1/forgot-password', { email });
      toast.success('Password reset email sent');
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Error sending password reset email');
    }
  };

  return (
    <div className='w-full bg-white h-full flex justify-center items-center flex-col gap-10'>
      <h1 className='text-4xl font-bold'>Forgot Password?</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className='h-12 w-64 border p-4 bg-blue-100 font-bold'
        />
        <button type="submit" className='h-12 font-bold text-lg bg-red-400 flex justify-center items-center'>
        {
                  loading ? (<ThreeDots width='38' color="#ffffff"/>): 'Send Reset Link'
                  
                  
                }
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

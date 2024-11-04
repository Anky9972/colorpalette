import React, { useContext } from 'react';
import { Authentication } from '../../context/Authentication'; 

function Signup({ onShowSignIn }) {
  const { formData, setFormData, handleSignup, loading } = useContext(Authentication);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(e); 
  };

  return (
    <div className="min-w-xs flex flex-col gap-5">
      <div className="w-full text-center">
        <div className="text-2xl font-bold">Sign up</div>
        <div className="text-gray-400 leading-tight font-semibold">Create a free account with your email.</div>
      </div>

      <form onSubmit={(e)=>handleSubmit(e)} className="w-full flex flex-col gap-3">
        <input 
          type="text" 
          name="firstname" 
          value={formData.firstname || ''} 
          onChange={handleChange} 
          placeholder="First Name" 
          className="w-full border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-black"
          required 
        /><input 
          type="text" 
          name="lastname" 
          value={formData.lastname || ''} 
          onChange={handleChange} 
          placeholder="Last Name" 
          className="w-full border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-black"
          required 
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email || ''} 
          onChange={handleChange} 
          placeholder="Email" 
          className="w-full border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-black"
          required 
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password || ''} 
          onChange={handleChange} 
          placeholder="Password" 
          className="w-full border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-black"
          required 
        />
        <button 
          type="submit" 
          className="w-full py-2 bg-black text-white rounded-lg text-sm font-semibold"
          disabled={loading} 
        >
          {loading ? 'Creating account...' : 'Create your free account'}
        </button>
      </form>

      <div className="w-full border-b"></div>

      <div className="w-full text-center text-xs font-semibold text-black">
        <div>
          <span>Already have an account? </span>
          <span className="text-blue-500 cursor-pointer" onClick={onShowSignIn}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;

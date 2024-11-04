import React, { useContext } from 'react';
import { Authentication } from '../../context/Authentication'; 

function SignIn({ onShowSignUp, onForgotPassword }) {
  const { credentials, setCredentials, handleLogin, loading } = useContext(Authentication);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);  
};


  return (
    <div className="min-w-xs flex flex-col gap-5">
      <div className="w-full text-center">
        <div className="text-2xl font-bold">Sign in</div>
        <div className="text-gray-400 leading-tight font-semibold">Sign in with your email here.</div>
        <div className="opacity-0 leading-tight font-semibold">Create a free account with your email.</div>
      </div>

      <form onSubmit={(e)=>handleSubmit(e)} className="w-full flex flex-col gap-3">
        <input 
          type="email" 
          name="email" 
          value={credentials.email} 
          onChange={onChange} 
          placeholder="Email / Username" 
          className="w-full border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-black"
          required 
        />
        <input 
          type="password" 
          name="password" 
          value={credentials.password} 
          onChange={onChange} 
          placeholder="Password" 
          className="w-full border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-black"
          required 
        />
        <button 
          type="submit" 
          className="w-full py-2 bg-black text-white rounded-lg text-sm font-semibold"
          disabled={loading} 
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="w-full border-b"></div>

      <div className="w-full text-center text-xs font-semibold text-black">
        <div className="w-full flex justify-center items-center">
          <span>Forgot password? </span>
          <span className="text-blue-500 cursor-pointer" onClick={onForgotPassword}>Forgot</span>
        </div>
        <div className="w-full flex justify-center items-center">
          <span>Don&apos;t have an account? </span>
          <span className="text-blue-500 cursor-pointer" onClick={onShowSignUp}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

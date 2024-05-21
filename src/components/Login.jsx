
import React, { useContext, useState } from "react";
import { Authentication } from "../context/Authentication";
// import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ThreeDots } from "react-loader-spinner";
import ForgotPassword from "../pages/ForgotPassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [forgot,setForgot] = useState(false)
  const { credentials, setCredentials, handleLogin,setSignup,signup,setSignin ,loading } = useContext(
    Authentication
  );

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    {
      forgot ? (<ForgotPassword/>) :
      (
        <div className=" w-full h-full flex justify-center bg-slate-200 ">
      <div className="flex flex-row justify-center items-center w-full h-full">
        <div className="w-full h-full bg-white flex flex-col gap-6 justify-center items-center">
            <h1 className="text-3xl font-bold text-center">Login</h1>
          <div className={`w-3/4 flex flex-col ${signup ? 'opacity-0 duration-700 ease-in-out' : ''}`}>
            <form
              onSubmit={handleLogin}
              className=" h-3/4 flex flex-col gap-6 w-full shadow-none bg-transparent"
              >
              <input
                className="w-full h-10 bg-blue-50 p-4"
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={onChange}
                autoComplete="email"

                required
              />
              <input
              type={showPassword ? "text" : "password"} 
                className="w-full h-10 bg-blue-50 p-4"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
                autoComplete="password"
                required
                />
              {/* <NavLink to="/forgot" className="text-lime-500">
                Forgot password?
              </NavLink> */}
              <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className='absolute mt-[76px] right-14  mr-3 text-lg ' 
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </button>

              <span className="text-lime-500 hover:cursor-pointer" onClick={()=>setForgot(true)}>
                Forgot Password?
              </span>
              <button className="w-full bg-red-400 h-10 flex justify-center items-center" type="submit">
                {
                  loading ? (<ThreeDots width='38' color="#ffffff"/>): 'Login'
                  
                  
                }
              </button>
            </form>
            <div className="flex justify-between items-center w-full mt-5">
              <div className="w-2/5 bg-slate-500 h-[1px]"></div>
              <span className=" font-semibold">OR</span>
              <div className="w-2/5 bg-slate-500 h-[1px]"></div>
            </div>
            <div className="w-full mt-5 flex bg-yellow-400 ">
              <button className="w-full flex justify-center items-center h-10">
                <span className="mr-3">
                  <FcGoogle className="text-2xl" />
                </span>
                Sign in with Google
              </button>
            </div>
            <div className="w-full flex justify-center mt-5">
              <p>New User?</p>
              <a
                href="#" onClick={()=>{setSignup(true); setSignin(false) }}
                className="text-lime-500 text-bold text-base ml-2"
                >
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
      )
    }
    
                </>
  );
};

export default Login;

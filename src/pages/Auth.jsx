// Auth.js
import React, { useContext } from "react";
import { Authentication } from "../context/Authentication";
import { ImCross } from "react-icons/im";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = () => {
  const { signin, signup, setSignin, setSignup,isLoggedIn } = useContext(Authentication);
  if(isLoggedIn){
    handleClose();
  }
  function handleClose() {
    setSignin(false);
    setSignup(false);
  }

  return (
    <div>
     
      {signin || signup ? (
        <div className=" hidden h-full fixed w-full md:flex justify-center items-center flex-col  top-0 bg-slate-500 bg-opacity-60 z-40">
          <span className="left-36 top-9 absolute w-8 h-8 flex justify-center items-center rounded-full bg-slate-300 cursor-pointer" onClick={handleClose}>
            <ImCross />
          </span>
          <div className="w-3/4 h-4/5  bg-yellow-100 flex justify-between ">
            <div className="relative w-1/3 h-full bg-white">
              <Signup />
            </div>
            <div className="relative w-1/3 h-full bg-slate-300">
              <Login />
            </div>
            <div
              className={`absolute w-1/2  h-4/5 bg-green-200 object-fill ${
                signup ? "ml-[25%] duration-700 ease-in-out" : ""
              } ${!signup ? 'ml-0 duration-700 ease-in-out' : ''}`}
            >
              {
                !signup ? (<img className=" w-full h-full " src="login.svg" alt="error" />)
                :
                (<img className=" w-full h-full" src="signup.svg" alt="error" />)
              
              }
            </div>
          </div>
        </div>
      ) : null}

      {signin || signup ? (
        <div className=" md:hidden h-full fixed w-full flex justify-center items-center flex-col  top-0 bg-slate-500 bg-opacity-60 z-40">
          <span className=" top-5 absolute w-8 h-8 flex justify-center items-center rounded-full bg-slate-100 cursor-pointer" onClick={handleClose}>
            <ImCross />
          </span>
          <div className="w-[90%] h-[82%]  bg-yellow-100 flex  ">
            <div className={` w-full h-full bg-white ${signin ? 'hidden':''}`}>
              <Signup />
            </div>
            <div className={`w-full h-full bg-slate-300 ${signup ? 'hidden':''}`}>
              <Login />
            </div>
    
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Auth;

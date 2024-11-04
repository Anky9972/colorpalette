import React, { useContext, useState, useEffect } from "react";
import { Authentication } from "../context/Authentication";
import { ImCross } from "react-icons/im";
import Signup from "../components/authentication/Signup";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import SignIn from "../components/authentication/SignIn";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const { signin, signup, setSignin, setSignup, isLoggedIn } = useContext(Authentication);
  const [showForm, setShowForm] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      handleClose();
    }
  }, [isLoggedIn]); 

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  function handleClose() {
    setSignin(false);
    setSignup(false);
    setShowForm(false);
    setForgotPassword(false); 
  }

  function showSignIn() {
    setSignin(true);
    setSignup(false);
    setShowForm(true);
    setForgotPassword(false); 
  }

  function showSignUp() {
    setSignin(false);
    setSignup(true);
    setShowForm(true);
    setForgotPassword(false); 
  }

  function handleForgotPassword() {
    setForgotPassword(true);
    setShowForm(true);
  }

  function handleContinueWithEmail() {
    setShowForm(true);
  }

  return (
    <>
      {(signin || signup) && (
        <div className="bg-black bg-opacity-45 fixed z-[5000] w-full h-full top-0 flex justify-center items-center">
          <div className="bg-white max-w-xs p-5 flex flex-col gap-5 rounded-lg border relative">
            <span>
              <ImCross onClick={handleClose} className="absolute bg-gray-100 p-1 rounded-full text-xl cursor-pointer left-4 top-4" />
            </span>

            {!showForm ? (
              <>
                <div className="flex flex-col gap-2">
                  <div className="w-full flex justify-center items-center text-2xl font-bold">Welcome!</div>
                  <div className="w-full text-center text-gray-400 leading-tight">Use your email or other services to continue with us.</div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <button className="w-full py-2 bg-gray-100 rounded-lg text-sm font-semibold flex items-center justify-center gap-4">
                    <FaGoogle /> Continue with Google
                  </button>
                  <button className="w-full py-2 bg-gray-100 rounded-lg text-sm font-semibold flex items-center justify-center gap-4">
                    <FaFacebook /> Continue with Facebook
                  </button>
                  <button className="w-full py-2 bg-black text-white rounded-lg text-sm font-semibold flex items-center justify-center" onClick={handleContinueWithEmail}>
                    Continue with Email
                  </button>
                </div>
              </>
            ) : forgotPassword ? (
              <ForgotPassword onShowSignIn={showSignIn} />
            ) : signin ? (
              <SignIn onShowSignUp={showSignUp} onForgotPassword={handleForgotPassword} />
            ) : (
              <Signup onShowSignIn={showSignIn} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;

// AuthenticationContextProvider.js
import React, { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { saveToken } from '../components/AuthService';
import { getToken, removeToken } from '../components/AuthService';
export const Authentication = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [singlepalette, setSinglePalette] = useState('');
  const [userId, setUserId] = useState("");
  const [singleColor, setSingleColor] = useState([]);
  const [fullPalette, setFullPalette] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const url = "https://colorpalettebackend.onrender.com/api/v1/signup";
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const json = await res.json();
      if(json.msg === "User already exists"){
        toast.error("User already exists");
        setLoading(false);
      }
      if (json.success) {
        toast.success("Signup successful");
        setLoading(false);
        setSignin(true)
        setSignup(false)
      }
    } catch (e) {
      console.error("Error during signup:", e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch("https://colorpalettebackend.onrender.com/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log("json login login response ", json);
      if (json.success) {
        setIsLoggedIn(true);
        saveToken(response.token);
        toast.success("Successfully Logged In");
        setLoading(false)
        setUserId(json.userId);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true)
    const url = 'https://colorpalettebackend.onrender.com/api/v1/save';
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId.toString(),
          paletteData: singlepalette
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Color saved ');
        setLoading(false)
        handleGetSave();
      } else {
        toast.error('Failed to save color');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error while saving color');
    }
  }

  const SaveFullPalette = async (colors) => {
    const url = 'https://colorpalettebackend.onrender.com/api/v1/savefullpalette';
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId.toString(),
          paletteData: colors
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('palette saved ');
        setLoading(false)
      } else {
        toast.error('Failed to save palette');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error while saving palette');
    }
  }

  const handleGetSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://colorpalettebackend.onrender.com/api/v1/getsaved/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      console.log("json in get", json);
      if (json.success) {
        setSingleColor(json.savedPalettes);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const getFullPalette = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://colorpalettebackend.onrender.com/api/v1/getfullpalette/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      console.log("json in get", json);
      if (json.success) {
        setFullPalette(json.savedPalettes);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const states = {
    credentials,
    setCredentials,
    signin,
    setSignin,
    signup,
    setSignup,
    handleLogin,
    handleSignup,
    isLoggedIn,
    setIsLoggedIn,
    formData,
    setFormData,
    setSinglePalette,
    handleSave,
    handleGetSave,
    singleColor,
    singlepalette,
    SaveFullPalette,
    getFullPalette,
    fullPalette,
    removeToken,
    loading
  };

  return (
    <Authentication.Provider value={states}>
      {children}
    </Authentication.Provider>
  );
};

export default AuthenticationContextProvider;

import React, { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { saveToken, getToken, removeToken } from '../components/AuthService';

export const Authentication = createContext();

const API_BASE_URL = "https://colorpalettebackend.onrender.com/api/v1";

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

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });
      const json = await res.json();

      if (json.msg === "User already exists") {
        toast.error("User already exists");
      } else if (json.success) {
        toast.success("Signup successful");
        setSignin(true);
        setSignup(false);

        // Save userId to localStorage and Token
        localStorage.setItem('userId', json.userId); 
        saveToken(json.token);  // Save token
        setUserId(json.userId);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();

      if (json.success) {
        setIsLoggedIn(true);
        saveToken(json.token);  // Save token
        toast.success("Successfully Logged In");

        // Save userId to localStorage
        localStorage.setItem('userId', json.userId); 
        setUserId(json.userId);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  // Save Color to Database
  const handleSave = async (color) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId.toString(),
          paletteData: color,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Color saved successfully');
        handleGetSave();
      } else {
        toast.error('Failed to save color');
      }
    } catch (error) {
      console.error("Error while saving color:", error);
      toast.error('Error while saving color');
    } finally {
      setLoading(false);
    }
  };

  // Save Full Palette
  const SaveFullPalette = async (colors) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/savefullpalette`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId.toString(),
          paletteData: colors,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Palette saved successfully');
      } else {
        toast.error('Failed to save palette');
      }
    } catch (error) {
      console.error("Error while saving palette:", error);
      toast.error('Error while saving palette');
    } finally {
      setLoading(false);
    }
  };

  // Get Saved Colors
  const handleGetSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://colorpalettebackend.onrender.com/api/v1/getsaved/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      
      const json = await res.json();
      if (json.success) {
        setSingleColor(json.savedPalettes);
      }
    } catch (e) {
      console.error("Error while fetching saved colors:", e);
      toast.error('Failed to fetch saved colors');
    } finally {
      setLoading(false);
    }
  };

  // Get Full Palette
  const getFullPalette = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/getfullpalette/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.success) {
        setFullPalette(json.savedPalettes);
      }
    } catch (error) {
      console.error("Error while fetching full palette:", error);
      toast.error("Failed to load saved palettes");
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is logged in using getToken and set userId
  useEffect(() => {
    const token = getToken();
    const userIdFromLocalStorage = localStorage.getItem('userId');
    if (token && userIdFromLocalStorage) {
      setIsLoggedIn(true);
      setUserId(userIdFromLocalStorage);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId("");
    removeToken();
    localStorage.removeItem('userId');  // Clear userId from localStorage
    toast.success("Successfully logged out");
  };

  // Provider value
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
    handleLogout,
    removeToken,
    loading,
    setUserId
  };

  return (
    <Authentication.Provider value={states}>
      {children}
    </Authentication.Provider>
  );
};

export default AuthenticationContextProvider;

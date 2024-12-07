import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import ColorStateContextProvider from "./context/ColorState";
import AuthenticationContextProvider from "./context/Authentication";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ColorStateContextProvider>
        <AuthenticationContextProvider>
          <BrowserRouter>
            <Toaster />
            <App />
          </BrowserRouter>
        </AuthenticationContextProvider>
      </ColorStateContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();

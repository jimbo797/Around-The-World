import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import "./LogIn.css";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const LogIn = ({ userId, handleLoggedIn, handleLogin }) => {
  return (
    // Using the Google OAuth API
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <button className="gotofeed-size" onClick={handleLoggedIn}>
          Go to feed
        </button>
      ) : (
        <GoogleLogin
          theme="filled_blue"
          shape="pill"
          onSuccess={handleLogin}
          onError={(err) => console.log(err)}
        />
      )}
    </GoogleOAuthProvider>
  );
};

export default LogIn;

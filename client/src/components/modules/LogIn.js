import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";


const GOOGLE_CLIENT_ID = "242268688964-cqlt0cqtv3n2qg8nu3km11r7s8ctnioq.apps.googleusercontent.com";

const LogIn = ({userId, handleLogout, handleLogin}) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
    </GoogleOAuthProvider>
  );
};

export default LogIn;

import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import "./LogIn.css";
// import "../pages/Home.css";

const GOOGLE_CLIENT_ID = "242268688964-cqlt0cqtv3n2qg8nu3km11r7s8ctnioq.apps.googleusercontent.com";

const LogIn = ({ userId, handleLogout, handleLogin }) => {
  return (
    // <div className="outer">
    //   <div className="w-10 h-10 bg-blue-600 top"></div>
    //   <div className="below">
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <button className="gotofeed-size"
          onClick={() => {
            // googleLogout();
            handleLogout();
          }}
        >
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
    //   </div>
    // </div>
  );
};

export default LogIn;

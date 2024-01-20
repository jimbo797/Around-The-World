import React from "react";
import Page from "../modules/Page";

const NotFound = ({ userId }) => {
  return (
    <Page userId={userId}>
      <div>
        <h1>404 Not Found</h1>
        <p>The page you requested couldn't be found.</p>
      </div>
    </Page>
  );
};

export default NotFound;

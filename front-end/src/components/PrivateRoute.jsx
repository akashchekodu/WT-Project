// PrivateRoute.js
// This will check in cookies whether it has the jwt key

import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!Cookies.get("jwt"); // Check if JWT token exists

  return (
    <Route
      {...rest}
      element={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

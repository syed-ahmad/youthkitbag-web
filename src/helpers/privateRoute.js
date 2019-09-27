import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const isloggedin = localStorage.getItem("isloggedin");
  const user = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={props =>
        isloggedin && token && user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

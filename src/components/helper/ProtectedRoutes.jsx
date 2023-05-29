// import React from "react";
import { Navigate } from "react-router-dom";
import Home from "../../pages/Home";

const ProtectedRoutes = () => {
  const auth = sessionStorage.getItem("loggedInUserAuth");
  return auth ? (
    <>
      <Home />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;

import { Navigate } from "react-router-dom";
import Home from "../../pages/Dashboard";

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

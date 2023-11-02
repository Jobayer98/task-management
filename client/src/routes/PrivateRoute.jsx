import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user } = useContext(AuthContext);

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;

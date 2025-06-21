import { useContext } from "react";
import { AuthContext } from "../../Auth/user/context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

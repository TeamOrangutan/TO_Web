import { useContext } from "react";
import { AuthContext } from "../../Auth/user/context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, rol } = useContext(AuthContext);


  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (rol !== 1) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default PrivateRoute;

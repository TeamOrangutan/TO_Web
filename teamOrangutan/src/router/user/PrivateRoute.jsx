import { useContext } from "react";
import { AuthContext } from "../../Auth/user/context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, requiredRole  }) => {
  const { isAuthenticated, rol } = useContext(AuthContext);


    if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && rol !== requiredRole) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default PrivateRoute;

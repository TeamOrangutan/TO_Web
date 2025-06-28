import { useContext } from "react";
import { AuthContext } from "../../Auth/user/context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, rol } = useContext(AuthContext);

console.log("user");
console.log(rol);

if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

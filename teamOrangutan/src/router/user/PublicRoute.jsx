import { useContext } from "react";
import { AuthContext } from "../../Auth/user/context/AuthContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, rol } = useContext(AuthContext);

  console.log("isAuthenticated");
  console.log(isAuthenticated);

  console.log("rol");
  console.log(rol);

  if (isAuthenticated) {
    console.log("por aqui");

    return <Navigate to={parseInt(rol) == 1 ? "/admin" : "/home"} />;
  }

  return children;
};

export default PublicRoute;

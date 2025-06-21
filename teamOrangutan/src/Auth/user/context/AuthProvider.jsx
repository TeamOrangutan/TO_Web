import React, { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

export const AuthProvider = ({ children }) => {
  const initialState = () => {
    return {
      isAuthenticated: localStorage.getItem("token") ? true : false,
      token: localStorage.getItem("token") || null,
      user: localStorage.getItem("user") || null,
      rol: localStorage.getItem("rol") || null,
    };
  };

  const [state, dispatch] = useReducer(authReducer, {}, initialState);

  const loginUser = (token, userId, rol) => {
    dispatch({
      type: "Login",
      payload: { token, userId, rol },
    });

    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol);
    localStorage.setItem("user", userId);
  };

  const logoutUser = () => {
    dispatch({ type: "Logout" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("rol");
    localStorage.removeItem("hasVisitedDashboard");
  };

  const changeRole = (rol) => {
    dispatch({ type: "ChangeRol", payload: rol });
    localStorage.setItem("rol", rol);
  };

  return (
    <AuthContext.Provider
      value={{ ...state, loginUser: loginUser, logoutUser: logoutUser, changeRole: changeRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

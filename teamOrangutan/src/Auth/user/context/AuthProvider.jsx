import React, { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

export const AuthProvider = ({ children }) => {

  const initialState = () => {
    return {
      isAuthenticated: localStorage.getItem('token') ? true : false,
      token: localStorage.getItem("token") || null,
      user: localStorage.getItem('user') || null
    };
  };

  const [state, dispatch] = useReducer(authReducer, {},initialState);

  const loginUser = (token, userId) => {
    dispatch({
      type: "Login",
      payload: {token, userId},
    });

    localStorage.setItem("token", token);
    localStorage.setItem("user", userId);
  };

  const logoutUser = () => {
    dispatch({ type: "Logout" });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ ...state, loginUser: loginUser, logoutUser: logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/user/context/AuthContext";
import { login } from "../Api/user/authApi";

const useLogin = () => {
  const [userData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const { loginUser, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(userData.correo, userData.contrasena);
      if (data.token) {
        loginUser(data.token, data.userId);
        localStorage.setItem('cart', data.carritoId)
        navigate("/home");
      }
    } catch (error) {
      console.log("Error en el login", error);
    }
  };

  return {
    userData,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;

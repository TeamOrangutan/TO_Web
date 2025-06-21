import { useContext } from "react";
import { AuthContext } from "./src/Auth/user/context/AuthContext";
import AppRouterUser from "./src/router/user/AppRouterUser";

const App = () => {

  return (
    <>
      <AppRouterUser />
      
    </>
  );
};

export default App;

import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();



const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("daca-token");
      if(!token){
        return
      }
      const config = {
        headers: {
          
          ContentType: "application/json",
          Authorization: `Bearer ${token}`,
          
        }
      }
      try {
        const {data} = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/authenticate/',{"token":`Bearer ${token}`},config)
        setAuth(data)
      } catch (error) {
        navigate("/");
      }
    };
    autenticarUsuario();
  },[]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;

import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND } from "../constants/backend";

const AuthContext = createContext();



const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true)

  const navigate = useNavigate();
  
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("daca-token");
      if(!token){
        setCargando(false)
        return
      }
      const config = {
        headers: {
          
          ContentType: "application/json",
          Authorization: `Bearer ${token}`,
          
        }
      }
      try {
        const {data} = await axios.post(`${BACKEND}/api/authenticate/`,{"token":`Bearer ${token}`},config)
        setAuth(data)
        navigate('/dashboard')
      } catch (error) {
        setAuth({})
      } finally {
        setCargando(false)
      }
      
    };
    autenticarUsuario();
  },[]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando }}>{children}</AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerta";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { BACKEND } from "../../constants/backend";
import styled from "styled-components";
import logo from "../../assets/logoLite.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([username, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios.",
        error: true,
      });
      return;
    }

    try {
      const url = `${BACKEND}/api/login`;
      const { data } = await axios.post(url, { username, password });
      setAlerta({});
      setAuth(data);
      console.log(data);
      localStorage.setItem("daca-token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setAlerta({
        msg: "El usuario o la contraseña son incorrectos!.",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="lg:w-2/5 md:w-3/5 w-5/6 mx-auto my-20 lg:my-44 ">
      <StyledDiv className="mx-auto md:p-4 p-2  bg-gray-700 rounded-lg shadow-lg ">
        <div className="font-semibold  flex">
          <div>
            <img src={logo} alt="logo" className=" h-16 sm:w-16 md:h-24 md:w-24 lg:h-24 lg:w-24 xl:h-24 xl:w-24 md:aspect-square" />
          </div>
          <div className="ml-5 text-xl md:text-2xl lg:text-2xl xl:text-3xl text-white mt-3">
            <h1>Bienvenido a DACA-SYSTEM</h1>
            <h2 className="text-sm md:text-lg lg:text-lg xl:text-xl text-gray-300">Inicia sesión para acceder al Sistema</h2>
          </div>
        </div>
        <div className="lg:pl-16 lg:pr-16 md:pl-10 md:pr-10 pl-2 pr-2 mt-5 mb-5">
          {msg && <Alerta alerta={alerta} />}
        </div>

        <form
          className="lg:pl-16 lg:pr-16 md:pl-10 md:pr-10 pl-2 pr-2 mt-5 mb-3"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="usuario"
            className="font-semibold text-1xl text-gray-300"
          >
            Usuario:
          </label>
          <input
            id="usuario"
            type="text"
            className="w-full mt-3 p-2 rounded-xl bg-gray-400 hover:bg-gray-300 focus:bg-gray-300 placeholder:text-gray-600 mb-5"
            placeholder="Usuario de registro"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="password"
            className="font-semibold text-1xl text-gray-300"
          >
            Contraseña:
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-2 rounded-xl bg-gray-400 hover:bg-gray-300 focus:bg-gray-300 placeholder:text-gray-600 mb-5"
            placeholder="Password de registro"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-green-700 w-full p-2 rounded-lg shadow text-gray-200 font-semibold hover:bg-green-600 hover:text-gray-100 hover:cursor-pointer transition-colors mt-5"
          />
        </form>
        <nav className="lg:flex lg:justify-center">
        <Link
          className="block text-center text-gray-300 text-sm"
          to="passwordReset"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
      </StyledDiv>
      
    </div>
  );
};

const StyledDiv = styled.div`
  box-shadow: 0 0 5px white, 0 0 15px white, 0 0 30px white;
`;

export default LoginForm;

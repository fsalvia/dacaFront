import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerta";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { BACKEND } from "../../constants/backend";

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
    <div className="lg:w-2/5 md:w-3/5 w-3/4 mx-auto">
      <div className="mx-auto md:p-5 p-2  bg-gray-700 rounded-lg shadow">
        <div className="font-semibold text-2xl text-white text-center mt-5">
          <h1>Inicia sesión para acceder al Sistema</h1>
        </div>
        <div className="lg:pl-16 lg:pr-16 md:pl-10 md:pr-10 pl-2 pr-2 mt-5 mb-5">
          {msg && <Alerta alerta={alerta} />}
        </div>

        <form
          className="lg:pl-16 lg:pr-16 md:pl-10 md:pr-10 pl-2 pr-2 mt-5 mb-5"
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
      </div>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-3 mx-5 text-gray-400 text-sm"
          to="registrar"
        >
          No tienes una cuenta? Registrate
        </Link>
        <Link
          className="block text-center my-3 mx-5 text-gray-400 text-sm"
          to="passwordReset"
        >
          Olvidé mi password
        </Link>
      </nav>
    </div>
  );
};

export default LoginForm;

import {useState} from "react";
import { Link } from "react-router-dom";
import Alerta from "../../components/Alerta";
import axios from 'axios'
import { BACKEND } from "../../constants/backend";


const Registrar = () => {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();
        if([name, lastname, email, username, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if(password !== repetirPassword){
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            return
        }

        if(password.length < 6){
            setAlerta({
                msg: 'Las contraseñas deben tener mas de 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        try {
          const response = await axios.post(`${BACKEND}/api/user`,{name, lastname, email, username, password})
          setAlerta({
            //msg: data.msg,
            error: false
          })
          setName('')
          setLastname('')
          setEmail('')
          setUsername('')
          setPassword('')
          setRepetirPassword('')
        } catch (error) {
          console.log(error);
        }

    }

    const { msg } = alerta

  return (
    <div className="lg:w-2/5 md:w-3/5 w-3/4 mx-auto">
      <div className="mx-auto md:p-5 p-2  bg-gray-700 rounded-lg shadow">
        <div className="font-semibold text-2xl text-white text-center mt-5">
          <h1>Crea tu cuenta para acceder al Sistema</h1>
        </div>
        <form className="lg:pl-16 lg:pr-16 md:pl-10 md:pr-10 pl-2 pr-2 mt-5 mb-5"
        onSubmit={handleSubmit}>

            {msg && <Alerta alerta={alerta} />}

          <label
            htmlFor="name"
            className="font-semibold text-1xl text-gray-300"
          >
            name:
          </label>
          <input
            id="name"
            type="text"
            className="w-full mt-3 p-2 rounded-xl bg-gray-400 hover:bg-gray-300 focus:bg-gray-300 placeholder:text-gray-600 mb-5"
            placeholder="Usuario de registro"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label
            htmlFor="apellido"
            className="font-semibold text-1xl text-gray-300"
          >
            Apellido:
          </label>
          <input
            id="apellido"
            type="text"
            className="w-full mt-3 p-2 rounded-xl bg-gray-400 hover:bg-gray-300 focus:bg-gray-300 placeholder:text-gray-600 mb-5"
            placeholder="Usuario de registro"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />
          <label
            htmlFor="email"
            className="font-semibold text-1xl text-gray-300"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-2 rounded-xl bg-gray-400 hover:bg-gray-300 focus:bg-gray-300 placeholder:text-gray-600 mb-5"
            placeholder="Usuario de registro"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
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
            onChange={e => setUsername(e.target.value)} 
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
            onChange={e => setPassword(e.target.value)} 
          />
          <label
            htmlFor="reppassword"
            className="font-semibold text-1xl text-gray-300"
          >
            Repite la contraseña:
          </label>
          <input
            id="reppassword"
            type="password"
            className="w-full mt-3 p-2 rounded-xl bg-gray-400 hover:bg-gray-300 focus:bg-gray-300 placeholder:text-gray-600 mb-5"
            placeholder="Password de registro"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)} 
          />
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-green-700 w-full p-2 rounded-lg shadow text-gray-200 font-semibold hover:bg-green-600 hover:text-gray-100 hover:cursor-pointer transition-colors mt-5"
          />
        </form>
      </div>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-3 mx-5 text-gray-400 text-sm"
          to="/"
        >
          Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-3 mx-5 text-gray-400 text-sm"
          to="/passwordReset"
        >
          Olvidé mi password
        </Link>
      </nav>
    </div>
  );
};

export default Registrar;

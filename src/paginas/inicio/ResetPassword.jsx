import React from 'react'
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="lg:w-2/5 md:w-3/5 w-3/4 mx-auto">
      <div className="mx-auto md:p-5 p-2  bg-gray-700 rounded-lg shadow">
        <div className="font-semibold text-2xl text-white text-center mt-5">
          <h1>Restablece tu contraseña</h1>
        </div>
        <form className="lg:pl-16 lg:pr-16 md:pl-10 md:pr-10 pl-2 pr-2 mt-5 mb-5">
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
          />
          
          <input
            type="submit"
            value="Restablecer Contraseña"
            className="bg-green-700 w-full p-2 rounded-lg shadow text-gray-200 font-semibold hover:bg-green-600 hover:text-gray-100 hover:cursor-pointer transition-colors mt-5"
          />
        </form>
      </div>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-3 mx-5 text-gray-400 text-sm"
          to="/registrar"
        >
          No tienes una cuenta? Registrate
        </Link>
        <Link
          className="block text-center my-3 mx-5 text-gray-400 text-sm"
          to="/"
        >
          Ya tienes una cuenta? Inicia Sesión
        </Link>
      </nav>
    </div>
  )
}

export default ResetPassword
import React from 'react'
import {Link} from 'react-router-dom'

const NuevoPassword = () => {
  return (
    <div className="lg:w-2/5 md:w-3/5 w-3/4 mx-auto">
      <div className="mx-auto md:p-5 p-2  bg-gray-700 rounded-lg shadow">
        <div className="font-semibold text-2xl text-white text-center mt-5">
          <h1>Restablece tu Contraseña</h1>
        </div>
        <form className="lg:pl-16 lg:pr-16 md:pl-10 md:pr-10 pl-2 pr-2 mt-5 mb-5">
          
          <label
            htmlFor="password"
            className="font-semibold text-1xl text-gray-300"
          >
            Nueva Contraseña:
          </label>
          <input
            id="password"
            type="text"
            className="w-full mt-3 p-2 rounded-xl bg-gray-400 hover:bg-gray-300 focus:bg-gray-300 placeholder:text-gray-600 mb-5"
            placeholder="Escribe tu nueva Contraseña"
          />
          <input
            type="submit"
            value="Guardar nueva Contraseña"
            className="bg-green-700 w-full p-2 rounded-lg shadow text-gray-200 font-semibold hover:bg-green-600 hover:text-gray-100 hover:cursor-pointer transition-colors mt-5"
          />
        </form>
      </div>
    </div>
  )
}

export default NuevoPassword
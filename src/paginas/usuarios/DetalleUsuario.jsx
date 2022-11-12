import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListadoReminders from "../ListadoReminders";
import { BACKEND } from "../../constants/backend";

const DetalleUsuario = () => {
  const [usuario, setUsuario] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setCargando(!cargando);
    const obtenerUsuario = async () => {
      try {
        const url = `${BACKEND}/api/users/${id}`;
        const response = await fetch(url);
        const respuesta = await response.json();
        setUsuario(respuesta);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerUsuario();
  }, []);

  return (
    <>
      {cargando ? (
        <p>Cargando...</p>
      ) : Object.keys(usuario).length === 0 ? (
        <p>Usuario Inexistente</p>
      ) : (
        <div className="w-full pl-12 pr-8 pt-6">
          <h1 className="font-semibold text-2xl text-white">
            Detalles del Usuario
          </h1>
          <p className="mt-2 text-xl text-gray-300">
            Administra los Usuarios y sus recordatorios.
          </p>
          <div className="w-full pl-12 pt-6 pb-6">
            <div className="bg-gray-700 p-4 rounded-md">
              <h1 className="text-gray-200 font-semibold mb-3">
                Datos del Usuario
              </h1>
              <div className="grid grid-cols-3">
                <p className="text-gray-200 font-semibold">
                  Usuario:{" "}
                  <span className="text-gray-300 font-normal">
                    {usuario.username}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold">
                  Nombre:{" "}
                  <span className="text-gray-300 font-normal">
                    {usuario.name}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold">
                  Apellido:{" "}
                  <span className="text-gray-300 font-normal">
                    {usuario.lastname}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold mt-2">
                  E-mail:{" "}
                  <span className="text-gray-300 font-normal">
                    {usuario.email}
                  </span>
                </p>
                
                <p className="text-gray-200 font-semibold mt-2">
                  Rol:{" "}
                  <span className="text-gray-300 font-normal">
                    {usuario.rol}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full pl-12 pt-6 pb-6">
            <div className="bg-gray-700 p-4 rounded-md">
              <h1 className="text-gray-200 font-semibold mb-3">
                Recordatorios del Usuario
              </h1>
              <ListadoReminders usuario={usuario} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DetalleUsuario
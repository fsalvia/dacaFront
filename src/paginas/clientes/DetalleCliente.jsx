import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListadoReminders from "../ListadoReminders";

const DetalleCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setCargando(!cargando);
    const obtenerCliente = async () => {
      try {
        const url = `http://localhost:8080/api/customer/${id}`;
        const response = await fetch(url);
        const respuesta = await response.json();
        setCliente(respuesta);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerCliente();
  }, []);

  return (
    <>
      {cargando ? (
        <p>Cargando...</p>
      ) : Object.keys(cliente).length === 0 ? (
        <p>Cliente Inexistente</p>
      ) : (
        <div className="w-full pl-12 pr-8 pt-6">
          <h1 className="font-semibold text-2xl text-white">
            Detalles del cliente
          </h1>
          <p className="mt-2 text-xl text-gray-300">
            Administra los clientes y sus recordatorios.
          </p>
          <div className="w-full pl-12 pt-6 pb-6">
            <div className="bg-gray-700 p-4 rounded-md">
              <h1 className="text-gray-200 font-semibold mb-3">
                Datos del Cliente
              </h1>
              <div className="grid grid-cols-3">
                <p className="text-gray-200 font-semibold">
                  Cliente:{" "}
                  <span className="text-gray-300 font-normal">
                    {cliente.businessName}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold">
                  CUIT:{" "}
                  <span className="text-gray-300 font-normal">
                    {cliente.cuit}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold">
                  Contacto Principal:{" "}
                  <span className="text-gray-300 font-normal">
                    {cliente.contactName}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold mt-2">
                  Teléfono Principal:{" "}
                  <span className="text-gray-300 font-normal">
                    {cliente.telephone}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold mt-2">
                  Dirección:{" "}
                  <span className="text-gray-300 font-normal">
                    {cliente.address}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold mt-2">
                  Localidad:{" "}
                  <span className="text-gray-300 font-normal">
                    {cliente.location}
                  </span>
                </p>
                <p className="text-gray-200 font-semibold mt-2">
                  E-mail:{" "}
                  <span className="text-gray-300 font-normal">
                    {cliente.email}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full pl-12 pt-6 pb-6">
            <div className="bg-gray-700 p-4 rounded-md">
              <h1 className="text-gray-200 font-semibold mb-3">
                Recordatorios del Cliente
              </h1>
              <ListadoReminders cliente={cliente} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetalleCliente;

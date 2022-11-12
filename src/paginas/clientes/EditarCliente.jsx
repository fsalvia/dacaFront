import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formuario from "../../components/FormNuevoCliente";
import { BACKEND } from "../../constants/backend";

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setCargando(!cargando);
    const obtenerCliente = async () => {
      try {
        const url = `${BACKEND}/api/customer/${id}`;
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
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Editar Cliente
        </h1>
        <p className="mt-2 text-xl text-gray-300">Edita los campos necesarios del Cliente.</p>
      </div>
      {cliente.businessName ? (
      <Formuario 
        cliente={cliente}
      />
      ):<p className="pl-12 font-semibold text-red-700">Cliente no valido</p>}
    </div>
  )
}

export default EditarCliente

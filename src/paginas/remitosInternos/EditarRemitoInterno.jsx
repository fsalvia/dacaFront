import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormNuevoRemitoInterno from "../../components/remitosInternos/FormNuevoRemitoInterno";
import { BACKEND } from "../../constants/backend";

const EditarRemitoInterno = () => {
  const [remitoInterno, setRemitoInterno] = useState({});
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setCargando(!cargando);
    const obtenerPedido = async () => {
      try {
        const url = `${BACKEND}/api/internalNote/${id}`;
        const response = await fetch(url);
        const respuesta = await response.json();
        setRemitoInterno(respuesta);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerPedido();
    console.log(remitoInterno);
  }, []);
  return (
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Editar Remito Interno
        </h1>
        <p className="mt-2 text-xl text-gray-300">
          Edita los campos necesarios del Remito.
        </p>
      </div>
      {remitoInterno.id ? (
        <FormNuevoRemitoInterno remitoInterno={remitoInterno} />
      ) : (
        <p className="pl-12 font-semibold text-red-700">Remito no valido</p>
      )}
    </div>
  );
};

export default EditarRemitoInterno;

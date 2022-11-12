import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND } from "../../constants/backend";
import FormNuevoPedido from "../../components/FormNuevoPedido";

const EditarPedido = () => {
  const [pedido, setPedido] = useState({});
  const [cargando, setCargando] = useState(false);
  
  const { id } = useParams();
  useEffect(() => {
    setCargando(!cargando);
    const obtenerPedido = async () => {
      try {
        const url = `${BACKEND}/api/quote/${id}`;
        const response = await fetch(url);
        const respuesta = await response.json();
        setPedido(respuesta);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerPedido();
    console.log(pedido)
  }, []);

  return (
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Editar Pedido
        </h1>
        <p className="mt-2 text-xl text-gray-300">Edita los campos necesarios del Pedido.</p>
      </div>
      {pedido.id ? (
      <FormNuevoPedido 
        pedido={pedido}
      />
      ):<p className="pl-12 font-semibold text-red-700">Pedido no valido</p>}
    </div>
  )
}

export default EditarPedido
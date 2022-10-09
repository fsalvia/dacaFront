import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormNuevoUsuario from "../../components/FormNuevoUsuario";

const EditarUsuario = () => {
  const [usuario, setUsuario] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setCargando(!cargando);
    const obtenerUsuario = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL + `/api/users/${id}`;
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
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Editar Usuario
        </h1>
        <p className="mt-2 text-xl text-gray-300">Edita los campos necesarios del Usuario.</p>
      </div>
      {usuario.name ? (
      <FormNuevoUsuario 
        usuario={usuario}
      />
      ):<p className="pl-12 font-semibold text-red-700">Usuario no valido</p>}
    </div>
  )
}

export default EditarUsuario
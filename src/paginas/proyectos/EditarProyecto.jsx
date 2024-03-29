import FormuarioNuevoProyecto from "../../components/FormNuevoProyecto";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND } from "../../constants/backend";


const EditarProyecto = () => {
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setCargando(!cargando);
    const obtenerProyecto = async () => {
      try {
        const url = `${BACKEND}/api/project/${id}`;
        const response = await fetch(url);
        const respuesta = await response.json();
        setProyecto(respuesta);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerProyecto();
  }, []);
  return (
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Editar Proyecto
        </h1>
        <p className="mt-2 text-xl text-gray-300">Edita los campos necesarios del Proyecto.</p>
      </div>
      {proyecto.name ? (
      <FormuarioNuevoProyecto 
        proyecto={proyecto}
      />
      ):<p className="pl-12 font-semibold text-red-700">Proyecto no valido</p>}
    </div>
  )
}

export default EditarProyecto

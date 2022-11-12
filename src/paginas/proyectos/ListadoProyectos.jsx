import { useEffect, useState } from "react";
import Proyecto from "../../components/Proyecto";
import { BACKEND } from "../../constants/backend";

const ListadoProyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const obtainProjectsApi = async () => {
      try {
        const url = `${BACKEND}/api/project`;
        const response = await fetch(url);
        const resultado = await response.json();
        setProyectos(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainProjectsApi();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Deseas eliminar este proyecto?");
    if (confirmar) {
      try {
        const url = `${BACKEND}/api/project/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();
        const arrayProyectos = proyectos.filter((project) => project.id !== id);
        setProyectos(arrayProyectos);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">
        Listado de Proyectos
      </h1>
      <p className="mt-2 text-xl text-gray-300">Administra los Proyectos.</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Dirección</th>
            <th className="p-2">Localidad</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Cant. m2</th>
            <th className="p-2">Cant. Móodulos</th>
            <th className="p-2">Cant. Aluminio</th>
            <th className="p-2">Porcentaje de Avance</th>
            <th className="p-2">Fecha de OC</th>
            <th className="p-2">Fecha de Inicio</th>
            <th className="p-2">Ultima Certificación</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto) => (
            <Proyecto
              key={proyecto.id}
              proyecto={proyecto}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoProyectos;

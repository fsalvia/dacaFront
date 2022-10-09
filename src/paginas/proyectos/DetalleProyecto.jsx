import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListadoReminders from "../ListadoReminders";

const DetalleProyecto = () => {
  const [proyecto, setProyecto] = useState({});

  const { id } = useParams();
  useEffect(() => {
    const obtenerProyecto = async () => {
      try {
        const url = `http://168.181.184.148:8080/api/project/${id}`;
        const response = await fetch(url);
        const respuesta = await response.json();
        setProyecto(respuesta);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyecto();
    console.log(proyecto);
  }, []);

  const formatter = new Intl.NumberFormat("ars", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });
  const montoOC = formatter.format(proyecto.purchaseOrderAmount);
  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">
        Detalles del Proyecto
      </h1>
      <p className="mt-2 text-xl text-gray-300">
        Administra los Proyectos y sus recordatorios.
      </p>
      <div className="w-full pl-12 pt-6 pb-6">
        <div className="bg-gray-700 p-4 rounded-md">
          <h1 className="text-gray-200 font-semibold mb-3">
            Datos del Proyecto
          </h1>
          <div className="grid grid-cols-3">
            <p className="text-gray-200 font-semibold">
              Nombre:{" "}
              <span className="text-gray-300 font-normal">{proyecto.name}</span>
            </p>
            <p className="text-gray-200 font-semibold">
              Dirección:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.address}
              </span>
            </p>
            <p className="text-gray-200 font-semibold">
              Localidad:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.location}
              </span>
            </p>
            
            <p className="text-gray-200 font-semibold mt-2">
              Monto OC:{" "}
              <span className="text-gray-300 font-normal">
                {montoOC}
              </span>
            </p>
            <p className="text-gray-200 font-semibold mt-2">
              Metros Cuadrados:{" "}
              <span className="text-gray-300 font-normal">{proyecto.mts2}</span>
            </p>
            <p className="text-gray-200 font-semibold mt-2">
              Cantidad de Módulos:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.numberOfModules}
              </span>
            </p>
            <p className="text-gray-200 font-semibold mt-2">
              Cantidad de Aluminio:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.amountOfAluminum}
              </span>
            </p>
            <p className="text-gray-200 font-semibold mt-2">
              Porcentaje de avance:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.percentageOfCompletion}
              </span>
            </p>
            <p className="text-gray-200 font-semibold mt-2">
              Fecha de Contrato/OC:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.purchaseOrderDate}
              </span>
            </p>
            <p className="text-gray-200 font-semibold mt-2">
              Fecha de Inicio:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.startDate}
              </span>
            </p>
            <p className="text-gray-200 font-semibold mt-2">
              Fecha de última certificación:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.lastCertificationDate}
              </span>
            </p>
            <p className="text-gray-200 font-semibold mt-2">
              Notas:{" "}
              <span className="text-gray-300 font-normal">
                {proyecto.notes}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pl-12 pt-6 pb-6">
        <div className="bg-gray-700 p-4 rounded-md">
          <h1 className="text-gray-200 font-semibold mb-3">
            Recordatorios asignados al Proyecto
          </h1>
          <ListadoReminders proyecto={proyecto} />
        </div>
      </div>
    </div>
  );
};

export default DetalleProyecto;

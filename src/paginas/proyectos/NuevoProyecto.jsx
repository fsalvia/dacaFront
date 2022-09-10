import React from "react";
import FormuarioNuevoProyecto from "../../components/FormNuevoProyecto.jsx";

const NuevoProyecto = () => {
  
  return (
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Nuevo Proyecto
        </h1>
        <p className="mt-2 text-xl text-gray-300">Completa los campos para poder registrar un nuevo Proyecto.</p>
      </div>
      <FormuarioNuevoProyecto />
    </div>
  );
};

export default NuevoProyecto;

import React from "react";
import FormNuevoRemitoInterno from "../../components/remitosInternos/FormNuevoRemitoInterno";

const NuevoRemitoInterno = () => {
  return (
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Nuevo Remito Interno
        </h1>
        <p className="mt-2 text-xl text-gray-300">
          Completa los campos para poder registrar un nuevo Remito Interno.
        </p>
      </div>
      <FormNuevoRemitoInterno />
    </div>
  );
};

export default NuevoRemitoInterno;

import React from 'react'

const ProyectoLite = ({ proyecto }) => {
    const {
        id,
        name,
        address,
        location,
        customer,
        purchaseOrderAmount,
        mts2,
        numberOfModules,
        amountOfAluminum,
        percentageOfCompletion,
        purchaseOrderDate,
        startDate,
        lastCertificationDate,
        notes,
      } = proyecto;
      return <option className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md" value={proyecto.id} label={proyecto.name}></option>;
}

export default ProyectoLite
import React from "react";

const ClienteLite = ({ cliente }) => {
  const {
    address,
    businessName,
    contactName,
    cuit,
    email,
    id,
    location,
    telephone,
  } = cliente;
  return <option className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md" value={cliente.id} label={cliente.businessName}></option>;
};

export default ClienteLite;

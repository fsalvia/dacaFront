import React from 'react'

const ProveedorLite = ({proveedor}) => {
    const {
        id,
        businessName,
        cuit,
        contactName,
        telephone,
        address,
        location,
        email,
        iibb,
    } = proveedor
    return <option className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md" value={proveedor.id} label={proveedor.businessName}></option>;
}

export default ProveedorLite
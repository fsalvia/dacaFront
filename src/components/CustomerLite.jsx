import React from 'react'

const CustomerLite = ({ customer }) => {
    const {
        businessName
      } = customer;
      return <option className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md" value={customer.id} label={customer.businessName}></option>;
}

export default CustomerLite
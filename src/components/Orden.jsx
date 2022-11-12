import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Orden = ({ handleEliminar, orden, handlePDF, handleAprobar }) => {
  const {
    id,
    dateOfIssue,
    saleCondition,
    status,
    relevance,
    observations,
    itemsList,
    supplier,
    project,
    paymentDate,
    paymentMethod,
    dateOfDelivery,
    type,
  } = orden;

  function ApproveButton(orderState) {
    if (orderState) {
      return (
        <button
          className="bg-green-600 rounded-md p-0.5 text-gray-600 hover:bg-green-400"
          onClick={() => handleAprobar(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      );
    }
  }
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-200">
      <td className="p-3 text-center">{dateOfIssue}</td>
      <td className="p-3 text-center">{supplier.businessName}</td>
      <td className="p-3 text-center">{project.name}</td>
      <td className="p-3 text-center">{itemsList.length}</td>
      <td className="p-3 text-center">{relevance}</td>
      <td className="p-3 text-center">{status}</td>
      <td className="p-3 text-center">{observations}</td>
      <td className="p-3 text-center">{type}</td>
      <td className="p-3 text-center">{saleCondition}</td>
      <td className="p-3 text-center">{paymentDate}</td>
      <td className="p-3 text-center">{paymentMethod}</td>
      <td className="p-3 text-center">{dateOfDelivery}</td>
      <td className="pt-3 p-2 text-center">
        {ApproveButton(status == 'Pendiente')}
        <button
          className="bg-sky-600 rounded-md p-0.5 ml-2 text-bl-600 hover:bg-sky-400"
          onClick={() => navigate(`../${id}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <button
          className="bg-yellow-600 rounded-md p-0.5 ml-2 text-gray-600 hover:bg-yellow-400"
          onClick={() => navigate(`/orden/editar/${id}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          className="bg-gray-100 rounded-md p-0.5 ml-2 text-red-600 hover:bg-red-200"
          onClick={() => handlePDF(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </button>
        <button
          className="bg-red-600 rounded-md p-0.5 ml-2 text-gray-600 hover:bg-red-400"
          onClick={() => handleEliminar(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Orden;

import { useNavigate } from "react-router-dom";

const Gasto = ({ gasto, handleEliminar }) => {
  const navigate = useNavigate();
  const {
    id,
    invoiceNumber,
    dateOfIssue,
    supplier,
    saleCondition,
    status,
    invoiceAmount,
    concept,
    neto,
    iva21,
    iva27,
    rni105,
    perIIBB,
    iibbcaba,
    monotributo,
    otrosImp,
    persIVA,
    noGrabado,
  } = gasto;

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-200">
      <td className="p-1 text-center text-sm">{invoiceNumber}</td>
      <td className="p-1 text-center text-sm">{dateOfIssue}</td>
      <td className="p-1 text-center text-sm text-clip overflow-hidden">{supplier.businessName}</td>
      <td className="p-1 text-center text-sm">{concept}</td>
      <td className="p-1 text-center text-sm">{saleCondition}</td>
      <td className="p-1 text-center text-sm">{status}</td>
      <td className="p-1 text-center text-sm">${formatNumber(neto)}</td>
      <td className="p-1 text-center text-sm">{iva21===0? '-':('$'+formatNumber(iva21))}</td>
      <td className="p-1 text-center text-sm">{iva27===0? '-':('$'+formatNumber(iva27))}</td>
      <td className="p-1 text-center text-sm">{rni105===0? '-':('$'+formatNumber(rni105))}</td>
      <td className="p-1 text-center text-sm">{perIIBB===0? '-':('$'+formatNumber(perIIBB))}</td>
      <td className="p-1 text-center text-sm">{iibbcaba===0? '-':('$'+formatNumber(iibbcaba))}</td>
      <td className="p-1 text-center text-sm">{monotributo===0? '-':('$'+formatNumber(monotributo))}</td>
      <td className="p-1 text-center text-sm">{otrosImp===0? '-':('$'+formatNumber(otrosImp))}</td>
      <td className="p-1 text-center text-sm">{persIVA===0? '-':('$'+formatNumber(persIVA))}</td>
      <td className="p-1 text-center text-sm">{noGrabado===0? '-':('$'+formatNumber(noGrabado))}</td>
      <td className="p-1 text-center text-sm">{invoiceAmount===0? '-':('$'+formatNumber(invoiceAmount))}</td>
      <td className="p-1 text-center text-sm">
        <button
          className="bg-green-600 rounded-md p-0.5 text-gray-600 hover:bg-green-400"
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
          onClick={() => navigate(`/gastos/editar/${id}`)}
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

export default Gasto;

import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import NuevaFacturaModal from "./NuevaFacturaModal";

const Factura = ({ factura, handleRefresh }) => {
  const navigate = useNavigate();
  var {
    id,
    dateOfIssue,
    type,
    sellPoint,
    invoiceNumber,
    docType,
    docNum,
    denomination,
    changeType,
    currency,
    noTaxesAmount,
    iva,
    invoiceAmount,
    saleCondition,
    status,
    purchaseOrder,
  } = factura;

  if (type === "201 - Factura de credito Electronica MyPyMEs (FCE) A") {
    type = "201 - Factura A";
  }
  if (type === "203 - Nota de credito Electronica MyPyMEs (FCE) A") {
    type = "203 - Nota de credito A";
  }

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-200">
      <td className="w-24 p-1 text-center">{invoiceNumber}</td>
      <td className="p-1 text-center">{dateOfIssue}</td>
      <td className="w-36 p-1 text-center">{type}</td>
      <td className="p-1">{denomination}</td>
      <td className="p-1 text-center">{saleCondition}</td>
      <td className="p-1 text-center">{status}</td>
      <td className="p-1 text-center">{currency}</td>
      <td className="p-1 text-right">${formatNumber(noTaxesAmount)}</td>
      <td className="p-1 text-right">${formatNumber(iva)}</td>
      <td className="p-1 text-right">${formatNumber(invoiceAmount)}</td>
      <td className="w-24 mt-1 flex justify-evenly">
        <div>
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
        </div>
        <NuevaFacturaModal invoice={factura} />

        <DeleteModal element={factura} reload={handleRefresh} elementType={"invoice"}/>
      </td>
    </tr>
  );
};

export default Factura;

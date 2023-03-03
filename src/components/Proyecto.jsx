import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const Proyecto = ({ proyecto, handleRefresh }) => {
  const navigate = useNavigate();

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

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-200">
      <td className="p-3">{name}</td>
      <td className="p-3">{address}</td>
      <td className="p-3">{location}</td>
      <td className="p-3">{customer.businessName}</td>
      <td className="p-3">{mts2}</td>
      <td className="p-3">{numberOfModules}</td>
      <td className="p-3">{amountOfAluminum}</td>
      <td className="p-3">{percentageOfCompletion}</td>
      <td className="p-3">{purchaseOrderDate}</td>
      <td className="p-3">{startDate}</td>
      <td className="p-3">{lastCertificationDate}</td>
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
        <div>
          <button
          className="bg-yellow-600 rounded-md p-0.5 text-gray-600 hover:bg-yellow-400"
          onClick={() => navigate(`/proyectos/editar/${id}`)}
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
        </div>
        
        <DeleteModal
          element={proyecto}
          reload={handleRefresh}
          elementType={"project"}
        />
      </td>
    </tr>
  );
};

export default Proyecto;

import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";

const RemitoInterno = ({
  remitoInterno,
  handleRefresh,
  handlePrecarga,
  handlePDF,
  urlActual,
}) => {
  const navigate = useNavigate();

  const {
    id,
    dateOfIssue,
    reminderDate,
    type,
    status,
    observation,
    noteNumber,
    recipient,
    itemsList,
    project,
  } = remitoInterno;

  function PDFButton(condition) {
    if (condition) {
      return (
        <>
          <button
            className="bg-yellow-600 rounded-md p-0.5  text-gray-600 hover:bg-yellow-400"
            onClick={() => navigate(`/panol/editar/${id}`)}
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
            className="bg-gray-100 rounded-md p-0.5 ml-4 text-red-600 hover:bg-red-200"
            onClick={() => handlePDF(id, noteNumber)}
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
        </>
      );
    }
  }

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-200">
      <td className="p-3 text-center">{noteNumber}</td>
      <td className="p-3 text-center">{dateOfIssue}</td>
      <td className="p-3 text-center">{reminderDate}</td>
      <td className="p-3 text-center">{recipient}</td>
      <td className="p-3 text-center">{type}</td>
      <td className="p-3 text-center">{status}</td>
      <td className="p-3 text-center">{itemsList.length}</td>
      <td className="p-3 text-center">{project.name}</td>
      <td className="mt-3 flex justify-evenly">
        <div>{PDFButton(true)}</div>
        <DeleteModal
          element={remitoInterno}
          reload={handleRefresh}
          elementType={"internalNote"}
        />
      </td>
    </tr>
  );
};

export default RemitoInterno;

import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { useAxios } from "../hooks/useAxios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#e6e6e6",
  },
};

let elements = new Map();

elements.set("customer", "¿Desea eliminar el cliente seleccionado?");
elements.set("internalNote", "¿Desea eliminar el remito seleccionado?");
elements.set("project", "¿Desea eliminar el proyecto seleccionado?");
elements.set("invoice", "¿Desea eliminar la factura seleccionada?");
elements.set("incomingbill", "¿Desea eliminar la factura/gasto seleccionado?");
elements.set(
  "purchaseOrder",
  "¿Desea eliminar la orden de compra seleccionada?"
);
elements.set("reminder", "¿Desea eliminar el recordatorio seleccionado?");

const DeleteModal = ({ element, reload, elementType }) => {
  const [show, setShow] = useState(false);

  let method = "";

  method = "DELETE";

  const { data, error, loading, execute } = useAxios({
    url: "",
    method: method,
    manual: true,
  });

  const handleSubmit = async () => {
    execute({ url: `/api/${elementType}/${element.id}` });
    setShow(false);
  };
  useEffect(() => {
    if (data) {
      reload();
    }
  }, [data]);

  function openButton(condition) {
    if (condition) {
      return (
        <button
          className="hover:text-red-600 pl-1"
          onClick={() => setShow(true)}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      );
    } else {
      return (
        <button
        className="bg-red-600 rounded-md p-0.5 text-gray-600 hover:bg-red-400"
        onClick={() => setShow(true)}
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
      );
    }
  }

  return (
    <div>
      {openButton(elementType==='reminder')}
      <Modal
        isOpen={show}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <label className="font-medium">{elements.get(elementType)}</label>

        <div className="flex justify-evenly ">
          <div>
            <button
              onClick={handleSubmit}
              className="mt-5 text-gray-100 font-semibold py-2 pl-8 pr-8 text-sm rounded bg-green-700 hover:bg-green-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-green-700"
            >
              Aceptar
            </button>
          </div>
          <div>
            <button
              onClick={() => setShow(false)}
              className="mt-5 text-gray-100 font-semibold py-2 pl-8 pr-8 text-sm rounded bg-red-600 hover:bg-red-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;

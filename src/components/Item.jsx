import { useEffect, useState } from "react";

const Item = ({ item, handleEliminar, urlActual, setItemPrice }) => {
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("AR$");
  const [iva, setIva] = useState(21);
  const [cargado, setCargado] = useState()
  const { number, category, code, quantity, description, size } = item;

  function cargaPrecio(condition) {
    if (condition) {
      return (
        <td className="flex mt-1.5">
          <select onChange={(e) => setCurrency(e.target.value)} name="" id="" className={`rounded-l-lg text-sm bg-gray-350 ${cargado ? 'bg-green-200':'bg-red-200'}`}>
            <option value="AR$" label="AR$"></option>
            <option value="U$S" label="U$S"></option>
          </select>
          <input
            onInput={(e) => setPrice(e.target.value)}
            type="number"
            step="0.01"
            className={`w-28 text-right ${cargado ? 'bg-green-200':'bg-red-200'}`}
          ></input>
          <select onChange={(e) => setIva(e.target.value)} name="" id="" className={`rounded-r-lg text-sm bg-gray-350 ${cargado ? 'bg-green-200':'bg-red-200'}`}>
            <option value="21" label="IVA21%"></option>
            <option value="27" label="IVA27%"></option>
            <option value="10.5" label="IVA10,5%"></option>
          </select>
          <button
            className="bg-green-400 ml-1 rounded-md p-0.5 text-gray-600 hover:bg-green-300"
            onClick={() => {setItemPrice(item, price, currency, iva); setCargado(true)}}
            
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
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </td>
      );
    } else {
      return;
    }
  }

  const cargaOc = urlActual.includes("/ordenes/nuevo");
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-200">
      <td className="p-1 text-center">{number}</td>
      <td className="p-1 text-center">{code}</td>
      <td className="p-1 text-center">{category}</td>
      <td className="p-1">{description}</td>
      <td className="p-1 text-center">{size}</td>
      <td className="p-1 text-center">{quantity}</td>
      {cargaPrecio(cargaOc)}
      <td className="p-1 text-center">
        <button
          type="button"
          className="bg-red-600 rounded-md p-0.5 mt-1 ml-2 text-gray-600 hover:bg-red-400"
          onClick={() => handleEliminar(number)}
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

export default Item;

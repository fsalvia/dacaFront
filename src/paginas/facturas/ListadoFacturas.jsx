import { useEffect, useState } from "react";
import Factura from "../../components/Factura";
import Paginacion from "../../components/Paginacion";

const ListadoFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(18);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = facturas.slice(firstPostIndex, lastPostIndex);
  console.log(currentPosts);

  useEffect(() => {
    const obtainInvoiceApi = async () => {
      try {
        const url =
          "http://168.181.184.148:8080/api/invoice";
        const response = await fetch(url);
        const resultado = await response.json();

        setFacturas(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainInvoiceApi();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Deseas eliminar esta factura?");
    if (confirmar) {
      try {
        const url = `http://168.181.184.148:8080/api/invoice/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();
        const arrayFacturas = facturas.filter((factura) => factura.id !== id);
        setFacturas(arrayFacturas);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">Listado de Facturas</h1>
      <p className="mt-2 text-xl text-gray-300">Administra las Facturas.</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-t-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-2">Número de Factura</th>
            <th className="p-2">Fecha de Emisión</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Condición de Venta</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Moneda</th>
            <th className="p-2">Neto</th>
            <th className="p-2">IVA</th>
            <th className="p-2">Monto</th>
            <th className="w-32">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((factura) => (
            <Factura
              key={factura.id}
              factura={factura}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>

      <div className="bg-gray-800 text-gray-300 rounded-b-lg text-center p-2 h-11">
        <nav>
          <ul className="inline-flex -space-x-px">
            <Paginacion
              totalPosts={facturas.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ListadoFacturas;

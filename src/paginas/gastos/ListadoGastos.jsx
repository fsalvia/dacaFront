import { useEffect, useState } from "react";
import Gasto from "../../components/Gasto";
import Paginacion from "../../components/Paginacion";

const ListadoGastos = () => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(12);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = gastos.slice(firstPostIndex, lastPostIndex);
  console.log(gastos);

  useEffect(() => {
    const obtainInvoiceApi = async () => {
      try {
        const url =
          "http://localhost:8080/api/incomingbill";
        const response = await fetch(url);
        const resultado = await response.json();

        setGastos(resultado.incomingBillResponseDTOList);
      } catch (error) {
        console.log(error);
      }
    };
    obtainInvoiceApi();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Deseas eliminar este gasto?");
    if (confirmar) {
      try {
        const url = `http://localhost:8080/api/incomingbill/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();
        const arrayGastos = gastos.filter((gasto) => gasto.id !== id);
        setGastos(arrayGastos);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">Listado de Gastos</h1>
      <p className="mt-2 text-xl text-gray-300">Administra los Gastos.</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-t-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-2">Número de Factura</th>
            <th className="p-2">Fecha de Emisión</th>
            <th className="p-2">Proveedor</th>
            <th className="p-2">Concepto</th>
            <th className="p-2">Cond. Venta</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Neto</th>
            <th className="p-2">IVA 21%</th>
            <th className="p-2">IVA 27%</th>
            <th className="p-2">RNI 10,5%</th>
            <th className="p-2">PERCEP. IIBB</th>
            <th className="p-2">IIBB CABA</th>
            <th className="p-2">Monotributo</th>
            <th className="p-2">Otros IMP</th>
            <th className="p-2">Percep. IVA</th>
            <th className="p-2">NO GRAVADO</th>
            <th className="p-2">Facturado</th>
            <th className="w-32">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>

      <div className="bg-gray-800 text-gray-300 rounded-b-lg text-center p-2 h-11">
        <nav>
          <ul className="inline-flex -space-x-px">
            <Paginacion
              totalPosts={gastos.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ListadoGastos

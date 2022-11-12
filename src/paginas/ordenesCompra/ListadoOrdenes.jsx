import { useEffect, useState } from "react";
import Orden from "../../components/Orden";
import { BACKEND } from "../../constants/backend";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useLocation } from 'react-router'


const ListadoOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate();
  const { auth, cargando } = useAuth();
  const location = useLocation()

  useEffect(() => {
    const obtainOrdersApi = async () => {
      try {
        const url = `${BACKEND}/api/purchaseOrder`;
        const response = await fetch(url);
        const resultado = await response.json();
        console.log(resultado);
        setOrdenes(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainOrdersApi();
    console.log(ordenes);
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Deseas eliminar esta orden de compra?");
    if (confirmar) {
      try {
        const url = `${BACKEND}/api/purchaseOrder/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();
        const arrayOrdenes = ordenes.filter((orden) => orden.id !== id);
        setOrdenes(arrayOrdenes);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handlePDF = async (id) => {
    fetch(`${BACKEND}/api/purchaseOrder/pdf/${id}`)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'OC_DACA'+id+'.pdf';
					a.click();
				});
				//window.location.href = response.url;
		});
  };
  const handleAprobar = async (id) => {
    const confirmar = confirm("¿Deseas aprobar este orden?");
    const aprobante = {
      approvalDate: Date.now,
      approvedBy: { id: auth.id},
      quote: { id: id },
    };
    console.log(aprobante)
    if (confirmar) {
      try {
        const url = `${BACKEND}/api/purchaseOrder`;
        const response = await fetch(url, {
          method: "PATCH",
          body: JSON.stringify(aprobante),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
        await response.json();

      } catch (error) {
        console.log(error);
      }
    }
    

  };
  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">Listado de Ordenes</h1>
      <p className="mt-2 text-xl text-gray-300">Administra las Ordenes.</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-2">Fecha</th>
            <th className="p-2">Proveedor</th>
            <th className="p-2">Proyecto</th>
            <th className="p-2">Cant. Items</th>
            <th className="p-2">Relevancia</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Observaciones</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Cond. Venta</th>
            <th className="p-2">Fecha Pago</th>
            <th className="p-2">Cond. Pago</th>
            <th className="p-2">Fecha entrega</th>
            <th className="p-2 w-36">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <Orden
              key={orden.id}
              orden={orden}
              handleEliminar={handleEliminar}
              handlePDF = {handlePDF}
              handleAprobar = {handleAprobar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoOrdenes;

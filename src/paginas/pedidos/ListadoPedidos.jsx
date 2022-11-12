import { useEffect, useState } from "react";
import Pedido from "../../components/Pedido";
import { BACKEND } from "../../constants/backend";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const ListadoPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  const urlActual = location.pathname;
  const { auth, cargando } = useAuth();
  useEffect(() => {
    const obtainQuotesApi = async () => {
      try {
        const url = `${BACKEND}/api/quote`;
        const response = await fetch(url);
        const resultado = await response.json();
        setPedidos(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainQuotesApi();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Deseas eliminar este pedido?");
    if (confirmar) {
      try {
        const url = `${BACKEND}/api/quote/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();
        const arrayProyectos = pedidos.filter((pedido) => pedido.id !== id);
        setPedidos(arrayProyectos);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleAprobar = async (id) => {
    const confirmar = confirm("¿Deseas aprobar este pedido?");
    const aprobante = {
      approvalDate: Date.now,
      approvedBy: { id: auth.id},
      quote: { id: id },
    };
    if (confirmar) {
      try {
        const url = `${BACKEND}/api/quote`;
        const response = await fetch(url, {
          method: "PATCH",
          body: JSON.stringify(aprobante),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
        await response.json();
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
    navigate(`/ordenes/nuevo`)
  };
  const handlePDF = async (id, businessName) => {
    fetch(`${BACKEND}/api/quote/pdf/${id}`)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'SC_DACA_'+businessName+'_'+id+'.pdf';
					a.click();
				});
				//window.location.href = response.url;
		});
  };

  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">Listado de Pedidos</h1>
      <p className="mt-2 text-xl text-gray-300">Administra los Pedidos.</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-2 w-32">Fecha</th>
            <th className="p-2">Proveedor</th>
            <th className="p-2">Proyecto</th>
            <th className="p-2">Cant. Items</th>
            <th className="p-2">Relevancia</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Observaciones</th>
            <th className="p-2">Cond. Venta</th>
            <th className="p-2 w-44">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <Pedido
              key={pedido.id}
              pedido={pedido}
              handleEliminar={handleEliminar}
              handleAprobar={handleAprobar}
              handlePDF = {handlePDF}
              urlActual = {urlActual}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoPedidos;

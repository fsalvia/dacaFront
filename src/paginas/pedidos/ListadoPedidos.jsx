import { useEffect, useState } from "react";
import Pedido from "../../components/Pedido";
import { BACKEND } from "../../constants/backend";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import Table from "../../components/table/Table";
import Spinner from "../../components/Spinner";

const ListadoPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();
  const urlActual = location.pathname;
  const { auth, cargando } = useAuth();

  const { data, error, loading, execute } = useAxios({
    url: "/api/quote",
    method: "GET",
    params: { page: 0, offset: 15 },
  });

  const handlerPage = async (page) => {
    execute({
      params: {
        page: page,
        offset: 15,
      },
    });
  };

  const handleRefresh = () => {
    console.log("ejecute el refresh");
    execute({
      method: "GET",
      params: {
        page: 0,
        offset: 15,
      },
    });
  };

  const COLUMNS = [
    "Fecha",
    "Proveedor",
    "Proyecto",
    "Cant. Items",
    "Relevancia",
    "Estado",
    "Observaciones",
    "Cond. Venta",
    "Acciones",
  ];

  console.log(data);

  const handleAprobar = async (id) => {
    const confirmar = confirm("¿Deseas aprobar este pedido?");
    const aprobante = {
      approvalDate: Date.now,
      approvedBy: { id: auth.id },
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
    navigate(`/ordenes/nuevo`);
  };
  const handlePDF = async (id, businessName) => {
    fetch(`${BACKEND}/api/quote/pdf/${id}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "SC_DACA_" + businessName + "_" + id + ".pdf";
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">Listado de Pedidos</h1>
      <p className="mt-2 text-xl text-gray-300">Administra los Pedidos.</p>

      <Table
        columns={COLUMNS}
        pagination={{
          totalPages: data.totalPages - 1,
          actualPage: data.page,
          handlerChangePage: handlerPage,
        }}
      >
        <tbody>
          {data.items.map((item) => (
            <Pedido
              pedido={item}
              key={item.id}
              handleRefresh={handleRefresh}
              handleAprobar={handleAprobar}
              handlePDF={handlePDF}
              urlActual={urlActual}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoPedidos;

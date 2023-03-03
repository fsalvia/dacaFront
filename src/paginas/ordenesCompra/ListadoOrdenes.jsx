import { useEffect, useState } from "react";
import Orden from "../../components/Orden";
import { BACKEND } from "../../constants/backend";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import Spinner from "../../components/Spinner";


const ListadoOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate();
  const { auth, cargando } = useAuth();
  const location = useLocation();

  const { data, error, loading, execute } = useAxios({
    url: "/api/purchaseOrder",
    method: "GET",
    params: { page: 0, offset: 15 },
  });

  const COLUMNS = [
    "Fecha",
    "Proveedor",
    "Proyecto",
    "Cant. Items",
    "Relevancia",
    "Estado",
    "Observaciones",
    "Tipo",
    "Cond. Venta",
    "Fecha Pago",
    "Cond. Pago",
    "Fecha entrega",
    "Acciones",
  ];

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

  const handlePDF = async (id) => {
    fetch(`${BACKEND}/api/purchaseOrder/pdf/${id}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "OC_DACA" + id + ".pdf";
        a.click();
      });
      //window.location.href = response.url;
    });
  };
  const handleAprobar = async (id) => {
    const confirmar = confirm("¿Deseas aprobar este orden?");
    const aprobante = {
      approvalDate: Date.now,
      approvedBy: { id: auth.id },
      quote: { id: id },
    };
    console.log(aprobante);
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
  if (loading) return <Spinner></Spinner>;
  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">Listado de Ordenes</h1>
      <p className="mt-2 text-xl text-gray-300">Administra las Ordenes.</p>
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
            <Orden
              orden={item}
              key={item.id}
              handleRefresh={handleRefresh}
              handlePDF={handlePDF}
              handleAprobar={handleAprobar}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoOrdenes;

import React from "react";
import RemitoInterno from "../../components/remitosInternos/RemitoInterno";
import Spinner from "../../components/Spinner";
import Table from "../../components/table/Table";
import { useAxios } from "../../hooks/useAxios";

const ListadoRemitosInternos = () => {
  const urlActual = location.pathname;
  
  const { data, error, loading, execute } = useAxios({
    url: "/api/internalNote",
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

  const handlePDF = async (id, businessName) => {
    fetch(`${BACKEND}/api/internalNote/pdf/${id}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "REM_DACA_" + businessName + "_" + id + ".pdf";
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  const COLUMNS = [
    "Numero",
    "Fecha de creación",
    "Fecha de aviso",
    "Receptor",
    "Tipo",
    "Estado",
    "Cant. Items",
    "Proyecto",
    "Acciones",
  ];

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">
        Listado de Remitos Internos
      </h1>
      <p className="mt-2 text-xl text-gray-300">
        Administra los Remitos, haciendo click en las opciones.
      </p>
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
            <RemitoInterno
              remitoInterno={item}
              key={item.id}
              handleRefresh={handleRefresh}
              handlePDF={handlePDF}
              urlActual={urlActual}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoRemitosInternos;

import { useEffect, useState } from "react";
import Factura from "../../components/Factura";
import Spinner from "../../components/Spinner";
import { useAxios } from "../../hooks/useAxios";
import Table from "../../components/table/Table";
import FacturaFilterModal from "../../components/FacturaFilterModal";
import NuevaFacturaModal from "../../components/NuevaFacturaModal";

const ListadoFacturas = () => {
  const { data, error, loading, execute } = useAxios({
    url: "/api/invoice",
    method: "GET",
    params: { page: 0, offset: 15 },
  });

  const COLUMNS = [
    "Número de Factura",
    "Fecha de Emisión",
    "Tipo",
    "Cliente",
    "Condición de Venta",
    "Estado",
    "Moneda",
    "Neto",
    "IVA",
    "Monto",
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
        status: "paga",
        page: 0,
        offset: 15,
      },
    });
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <div className="flex justify-start">
        <div className="block">
          <h1 className="font-semibold text-2xl text-white">
            Listado de Comprobantes Emitidos
          </h1>
          <p className="mt-2 text-xl text-gray-300">
            Administra los Comprobantes.
          </p>
        </div>
        <div className="flex gap-8 items-center justify-center ml-4">
          <NuevaFacturaModal />
          <FacturaFilterModal reload={handleRefresh} execute={execute} />
        </div>
      </div>

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
            <Factura
              factura={item}
              key={item.id}
              handleRefresh={handleRefresh}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoFacturas;

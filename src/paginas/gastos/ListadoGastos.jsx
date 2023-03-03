import Gasto from "../../components/Gasto";
import { useEffect, useState } from "react";
import Factura from "../../components/Factura";
import Spinner from "../../components/Spinner";
import { useAxios } from "../../hooks/useAxios";
import Table from "../../components/table/Table";
import NuevoGastoModal from "../../components/NuevoGastoModal";
import FacturaFilterModal from "../../components/FacturaFilterModal";

const ListadoGastos = () => {
  const { data, error, loading, execute } = useAxios({
    url: "/api/incomingbill",
    method: "GET",
    params: { status: "paga", page: 0, offset: 12 },
  });

  const COLUMNS = [
    "Número de Factura",
    "Fecha de Emisión",
    "Proveedor",
    "Concepto",
    "Cond. Venta",
    "Estado",
    "Neto",
    "IVA 21%",
    "IVA 27%",
    "RNI 10,5%",
    "PERCEP. IIBB",
    "IIBB CABA",
    "Monotributo",
    "Otros IMP",
    "Percep. IVA",
    "NO GRAVADO",
    "Facturado",
    "Acciones",
  ];

  const handlerPage = async (page) => {
    execute({
      params: {
        status: "paga",
        page: page,
        offset: 12,
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
        offset: 12,
      },
    });
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="w-full pl-12 pr-8 pt-6">

      <div className="flex justify-start">
        <div className="block">
          <h1 className="font-semibold text-2xl text-white">
            Listado de Gastos
          </h1>
          <p className="mt-2 text-xl text-gray-300">Administra los Gastos.</p>
        </div>
        <div className="flex gap-8 items-center justify-center ml-4">
          <NuevoGastoModal />
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
            <Gasto
              gasto={item}
              key={item.id}
              handleRefresh={handleRefresh}
              page={0}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoGastos;

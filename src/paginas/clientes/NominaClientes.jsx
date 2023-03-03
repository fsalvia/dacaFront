import { useEffect, useState } from "react";
import Cliente from "../../components/Cliente";
import { useAxios } from "../../hooks/useAxios";
import Table from "../../components/table/Table";
import Spinner from "../../components/Spinner";


const NominaClientes = ({
  show = true,
  value = "",
  onChange,
  collapsible = false,
}) => {

  const { data, error, loading, execute } = useAxios({
    url: "/api/customer",
    method: "GET",
    params: { page: 0, offset: 15 },
  });



  const COLUMNS = [
    "Razón Social",
    "CUIT",
    "Contacto",
    "Teléfono",
    "Dirección",
    "Localidad",
    "E-mail",
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
    console.log("ejecute el refresh")
    execute({
      method: "GET",
      params: {
        page: 0,
        offset: 15,
      },
    });
  };


  if (loading) return <Spinner></Spinner>;
  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">Nómina de Clientes</h1>
      <p className="mt-2 text-xl text-gray-300">Administra los Clientes.</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-lg overflow-hidden">
        <tbody></tbody>
      </table>
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
            <Cliente
              cliente={item}
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

export default NominaClientes;

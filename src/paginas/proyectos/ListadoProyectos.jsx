
import { useEffect, useState } from "react";
import Proyecto from "../../components/Proyecto";
import Spinner from "../../components/Spinner";
import Table from "../../components/table/Table";
import { BACKEND } from "../../constants/backend";
import { useAxios } from "../../hooks/useAxios";

const ListadoProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const { data, error, loading, execute } = useAxios({
    url: "/api/project",
    method: "GET",
    params: { page: 0, offset: 15 },
  });

  const COLUMNS = [
    "Nombre",
    "Dirección",
    "Localidad",
    "Cliente",
    "Cant. m2",
    "Cant. Móodulos",
    "Cant. Aluminio",
    "Porcentaje de Avance",
    "Fecha de OC",
    "Fecha de Inicio",
    "Ultima Certificación",
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

  if (loading) return <Spinner></Spinner>;
  console.log(data);
  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">
        Listado de Proyectos
      </h1>
      <p className="mt-2 text-xl text-gray-300">Administra los Proyectos.</p>
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
            <Proyecto
              proyecto={item}
              key={item.id}
              handleRefresh={handleRefresh}
            />
          ))}
        </tbody>
      </Table>
      
    </div>
  );
};

export default ListadoProyectos;

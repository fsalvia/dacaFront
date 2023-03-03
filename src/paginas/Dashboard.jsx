import { React, useState, useEffect } from "react";
import GraficoGanancias from "../components/graficos/GraficoGanancias";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import ListadoReminders from "../components/reminder/ListadoReminders";
import useAuth from "../hooks/useAuth";
import NewReminderModal from "../components/reminder/NewReminderModal";
import { useAxios } from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import GraficoGastos from "../components/graficos/GraficoGastos";
import GraficoProyectos from "../components/graficos/GraficoProyectos";

const persistConfig = {
  key: "root",
  storage,
};

const Dashboard = () => {
  const { auth, cargando } = useAuth();
  const user = auth;
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const { data, error, loading, execute } = useAxios({
    url: `/api/reminder`,
    method: "GET",
    params: { userId: auth.id, page: 0, offset: 8 },
  });

  console.log(month, year);

  const handleRefresh = () => {
    console.log("ejecute el refresh");
    execute({
      method: "GET",
      params: { userId: user.id, page: 0, offset: 8 },
    });
  };
  const handlerPage = async (page) => {
    execute({
      params: { userId: user.id, page: page, offset: 8 },
    });
  };
  if (loading) return <Spinner></Spinner>;
  const pagination = {
    totalPages: data.totalPages - 1,
    actualPage: data.page,
    handlerChangePage: handlerPage,
  };

  //const afip = new Afip({ CUIT: 20358547908 });
  //
  //const serverStatus = async () => {
  //  await afip.ElectronicBilling.getServerStatus();
  //};
  //
  //console.log("Este es el estado del servidor:");
  //console.log(serverStatus);

  console.log(month);

  const getYears = () => {
    var today = new Date().getFullYear();
    return (
      <>
        <option
          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
          value={today}
        >
          {today}
        </option>
        <option
          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
          value={today - 1}
        >
          {today - 1}
        </option>
        <option
          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
          value={today - 2}
        >
          {today - 2}
        </option>
      </>
    );
  };

  return (
    <>
      <div className="w-full px-5 pt-2 pb-2 mt-4">
        <div className="bg-gray-700 pt-4 pb-1 pl-4 pr-4 rounded-lg">
          <div className="flex">
            <div>
              <h1 className="text-gray-200 font-semibold mb-3 ">
                Todos los Recordatorios activos del Usuario<span></span>
              </h1>
            </div>
            <div className="pl-5">
              <NewReminderModal reload={handleRefresh} />
            </div>
          </div>
          <ListadoReminders
            pagination={pagination}
            user={user}
            reminders={data.items}
            handleRefresh={handleRefresh}
            handlerPage={handlerPage}
          />
        </div>
      </div>
      <div className=" rounded  py-5 px-5 w-full  grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-4">
        <div className="flex flex-col text-sm bg-gray-700 rounded-lg  shadow-md p-2">
          <h1 className="font-semibold text-2xl text-white text-center">
            Facturación
          </h1>
          <p className="mt-2 text-lg text-gray-300 pl-3">
            Visualizacion de Ingresos/Gastos.
          </p>
          <div className="" style={{ height: "400px", width: "95%" }}>
            <GraficoGanancias />
          </div>
        </div>
        <div className="text-sm bg-gray-700 rounded-lg shadow-md p-2">
          <h1 className="font-semibold text-2xl text-white text-center">
            Gastos
          </h1>
          <div className="flex justify-between">
            <p className="mt-2 text-lg text-gray-300 pl-3">
              Composición de los Gastos.
            </p>
            <div>
              <select
                className="mt-2 text-sm  p-1 bg-gray-200 rounded-md"
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="" label="Mes"></option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={1}
                >
                  Enero
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={2}
                >
                  Febrero
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={3}
                >
                  Marzo
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={4}
                >
                  Abril
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={5}
                >
                  Mayo
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={6}
                >
                  Junio
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={7}
                >
                  Julio
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={8}
                >
                  Agosto
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={9}
                >
                  Septiembre
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={10}
                >
                  Octubre
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={11}
                >
                  Noviembre
                </option>
                <option
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  value={12}
                >
                  Diciembre
                </option>
              </select>
              <select
                className="mt-2 text-sm  p-1 bg-gray-200 rounded-md ml-2"
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="" label="Año"></option>
                {getYears()}
              </select>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="" style={{ height: "400px", width: "400px" }}>
              <GraficoGastos mes={month} year={year} />
            </div>
          </div>
        </div>
        <div className="flex flex-col text-sm bg-gray-700 rounded-lg  shadow-md p-2">
          <h1 className="font-semibold text-2xl text-white text-center">
            Proyectos en curso
          </h1>
          <p className="mt-2 text-lg text-gray-300 pl-3">
            Procentaje de Avance Fisico y Facturado
          </p>
          <div className="" style={{ height: "400px", width: "95%" }}>
            <GraficoProyectos />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import {React, useState, useEffect} from "react";
import GraficoGanancias from "../components/GraficoGanancias";
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const Dashboard = () => {

  

  return (
    <div className=" rounded  py-5 px-5 w-full  grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
      <div className="flex flex-col text-sm bg-gray-700 rounded-lg  shadow-md hover:bg-gray-600  p-2">
        <h1 className="font-semibold text-2xl text-white text-center">
          Facturación
        </h1>
        <p className="mt-2 text-lg text-gray-300 pl-3">
          Visualizacion de Ingresos/Gastos.
        </p>
        <GraficoGanancias />
      </div>
      <div className="flex flex-col text-sm bg-gray-700 rounded-lg  shadow-md hover:bg-gray-600  p-2">
        <h1 className="font-semibold text-2xl text-white text-center">
          Ganancias
        </h1>
        <p className="mt-2 text-lg text-gray-300 pl-3">
          Visualizacion de Ganancias.
        </p>
        
      </div>
    </div>
  );
};

export default Dashboard;

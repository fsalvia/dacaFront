import useState from "react";
import stackGlass from "../../assets/stackGlass.jpg";
import stackAluminium from "../../assets/stackAluminium.jpg";
import windows from "../../assets/windowsFactory.jpg";
import obra from "../../assets/obra.jpg";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className="font-semibold text-2xl text-white">
        Menu Ordenes de Manufactura
      </h1>
      <p className="mt-2 text-xl text-gray-300">
        Seleccione la categoria deseada.
      </p>
      <div className=" rounded  py-5 px-10 w-full mt-8 grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <div
          className="flex flex-col h-40 text-sm overflow-hidden bg-gray-700 rounded-lg  shadow-lg hover:bg-gray-600 hover:cursor-pointer hover:scale-110 duration-150 "
          onClick={() => navigate('vidrio')}
        >
          <h1 className="mt-2 font-semibold text-xl text-white text-center mb-2">
            Paneles de Vidrio
          </h1>
          <img src={stackGlass} />
        </div>

        <div
          className="flex h-40 flex-col text-sm overflow-hidden bg-gray-700 rounded-lg  shadow-lg hover:bg-gray-600 hover:cursor-pointer hover:scale-110 duration-150 "
          onClick={() => console.log("me Clickie")}
        >
          <h1 className=" mt-2 font-semibold text-xl text-white text-center mb-2">
            Perfiles de Aluminio
          </h1>
          <img src={stackAluminium} />
        </div>

        <div
          className="flex h-40 flex-col text-sm overflow-hidden bg-gray-700 rounded-lg  shadow-lg hover:bg-gray-600 hover:cursor-pointer hover:scale-110 duration-150 "
          onClick={() => console.log("me Clickie")}
        >
          <h1 className=" mt-2 font-semibold text-xl text-white text-center mb-2">
            Fabricación
          </h1>
          <img src={windows} />
        </div>

        <div
          className="flex h-40 flex-col text-sm overflow-hidden bg-gray-700 rounded-lg  shadow-lg hover:bg-gray-600 hover:cursor-pointer hover:scale-110 duration-150 "
          onClick={() => console.log("me Clickie")}
        >
          <h1 className=" mt-2 font-semibold text-xl text-white text-center mb-2">
            Instalación
          </h1>
          <img src={obra} />
        </div>
      </div>
    </div>
  );
};

export default Menu;

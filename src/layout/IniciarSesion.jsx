import { Outlet } from "react-router-dom";

const IniciarSesion = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-t from-gray-500 to-gray-400 md:p-10 p-5 ">
      
        <Outlet />

    </div>
  );
};

export default IniciarSesion;

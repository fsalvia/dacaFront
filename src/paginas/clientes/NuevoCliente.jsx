
import Formuario from "../../components/FormNuevoCliente";

const NuevoCliente = () => {
  return (
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Nuevo Cliente
        </h1>
        <p className="mt-2 text-xl text-gray-300">Completa los campos para poder registrar un nuevo Cliente.</p>
      </div>
      <Formuario />
    </div>
  );
};

export default NuevoCliente;

import FormNuevoUsuario from "../../components/FormNuevoUsuario";
import Formuario from "../../components/FormNuevoUsuario";

const NuevoUsuario = () => {
  return (
    <div>
      <div className="w-full pl-12 pt-6 pb-6">
        <h1 className="font-semibold text-2xl text-white">
          Nuevo Usuario
        </h1>
        <p className="mt-2 text-xl text-gray-300">Completa los campos para poder registrar un nuevo Usuario.</p>
      </div>
      <FormNuevoUsuario />
    </div>
  );
}

export default NuevoUsuario
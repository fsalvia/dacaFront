import { useEffect, useState } from "react";
import Usuario from "../../components/Usuario";
import Paginacion from "../../components/Paginacion";

const NominaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(18);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = usuarios.slice(firstPostIndex, lastPostIndex);
  
  useEffect(() => {
    const obtainUsersApi = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL+'/api/users';
        const response = await fetch(url);
        const resultado = await response.json();
        
        setUsuarios(resultado);
      } catch (error) {
        console.log(error);
      }
    }
    obtainUsersApi()
  },[])

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Deseas eliminar este usuario?')
    if (confirmar) {
      try {
        const url = import.meta.env.VITE_BACKEND_URL+`/api/users/${id}`
        const response = await fetch(url, {
          method: 'DELETE'
        })
        await response.json()
        const arrayUsuarios = usuarios.filter( usuario => usuario.id !== id)
        setUsuarios(arrayUsuarios)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className='font-semibold text-2xl text-white'>Nómina de Usuarios</h1>
      <p className="mt-2 text-xl text-gray-300">Administra los Usuarios.</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Apellido</th>
            <th className='p-2'>E-mail</th>
            <th className='p-2'>Usuario</th>
            <th className='p-2'>Rol</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map( usuario => (
            <Usuario 
              key={usuario.id}
              usuario={usuario}
              handleEliminar = {handleEliminar}
            />
          ))}
        </tbody>
      </table>
      <div className="bg-gray-800 text-gray-300 rounded-b-lg text-center p-2 h-11">
        <nav>
          <ul className="inline-flex -space-x-px">
            <Paginacion
              totalPosts={usuarios.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NominaUsuarios;

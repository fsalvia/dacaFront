import { useEffect, useState } from 'react'
import Cliente from '../../components/Cliente';
import Paginacion from "../../components/Paginacion";


const NominaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(18);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = clientes.slice(firstPostIndex, lastPostIndex);
  console.log(currentPosts);

  useEffect(() => {
    const obtainCustomersApi = async () => {
      try {
        const url = "http://localhost:8080/api/customer";
        const response = await fetch(url);
        const resultado = await response.json();
        
        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    }
    obtainCustomersApi()
  },[])

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Deseas eliminar este cliente?')
    if (confirmar) {
      try {
        const url = `http://localhost:8080/api/customer/${id}`
        const response = await fetch(url, {
          method: 'DELETE'
        })
        await response.json()
        const arrayClientes = clientes.filter( cliente => cliente.id !== id)
        setClientes(arrayClientes)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full pl-12 pr-8 pt-6">
      <h1 className='font-semibold text-2xl text-white'>Nómina de Clientes</h1>
      <p className="mt-2 text-xl text-gray-300">Administra los Clientes.</p>

      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className='p-2'>Razón Social</th>
            <th className='p-2'>CUIT</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Teléfono</th>
            <th className='p-2'>Dirección</th>
            <th className='p-2'>Localidad</th>
            <th className='p-2'>E-mail</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map( cliente => (
            <Cliente 
              key={cliente.id}
              cliente={cliente}
              handleEliminar = {handleEliminar}
            />
          ))}
        </tbody>
      </table>
      <div className="bg-gray-800 text-gray-300 rounded-b-lg text-center p-2 h-11">
        <nav>
          <ul className="inline-flex -space-x-px">
            <Paginacion
              totalPosts={clientes.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default NominaClientes

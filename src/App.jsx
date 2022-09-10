import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import Dashboard from './paginas/Dashboard'
import DetalleCliente from './paginas/clientes/DetalleCliente'
import DetalleProyecto from './paginas/proyectos/DetalleProyecto'
import EditarCliente from './paginas/clientes/EditarCliente'
import EditarProyecto from './paginas/proyectos/EditarProyecto'
import ListadoProyectos from './paginas/proyectos/ListadoProyectos'
import LoginForm from './paginas/LoginForm'
import NominaClientes from './paginas/clientes/NominaClientes'
import NuevoCliente from './paginas/clientes/NuevoCliente'
import NuevoProyecto from './paginas/proyectos/NuevoProyecto'
import NuevaFactura from './paginas/facturas/NuevaFactura'
import ListadoFacturas from './paginas/facturas/ListadoFacturas'
import EditarFacturas from './paginas/facturas/EditarFacturas'
import DetalleFacturas from './paginas/facturas/DetalleFacturas'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IniciarSesion />} >
          <Route index element={<LoginForm />}/>
        </Route>
        <Route path='/dashboard' element={<Layout />} >
          <Route index element={<Dashboard />}/>
        </Route>
        <Route path='/clientes' element={<Layout />} >
          <Route index element={<Dashboard />}/>
          <Route path='nuevo' element={<NuevoCliente />}/>
          <Route path='nomina' element={<NominaClientes />}/>
          <Route path='editar/:id' element={<EditarCliente />}/>
          <Route path=':id' element={<DetalleCliente />}/>
        </Route>
        <Route path='/proyectos' element={<Layout />} >
          <Route index element={<Dashboard />}/>
          <Route path='nuevo' element={<NuevoProyecto />}/>
          <Route path='listado' element={<ListadoProyectos />}/>
          <Route path='editar/:id' element={<EditarProyecto />}/>
          <Route path=':id' element={<DetalleProyecto />}/>
        </Route>
        <Route path='/facturas' element={<Layout />} >
          <Route index element={<Dashboard />}/>
          <Route path='nuevo' element={<NuevaFactura />}/>
          <Route path='listado' element={<ListadoFacturas />}/>
          <Route path='editar/:id' element={<EditarFacturas />}/>
          <Route path=':id' element={<DetalleFacturas />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

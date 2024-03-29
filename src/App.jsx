import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IniciarSesion from "./layout//IniciarSesion";
import Layout from "./layout/Layout";
import Dashboard from "./paginas/Dashboard";
import DetalleCliente from "./paginas/clientes/DetalleCliente";
import DetalleProyecto from "./paginas/proyectos/DetalleProyecto";
import EditarCliente from "./paginas/clientes/EditarCliente";
import EditarProyecto from "./paginas/proyectos/EditarProyecto";
import ListadoProyectos from "./paginas/proyectos/ListadoProyectos";
import LoginForm from "./paginas/inicio/LoginForm";
import NominaClientes from "./paginas/clientes/NominaClientes";
import NuevoCliente from "./paginas/clientes/NuevoCliente";
import NuevoProyecto from "./paginas/proyectos/NuevoProyecto";
import NuevaFactura from "./paginas/facturas/NuevaFactura";
import ListadoFacturas from "./paginas/facturas/ListadoFacturas";
import EditarFacturas from "./paginas/facturas/EditarFacturas";
import DetalleFacturas from "./paginas/facturas/DetalleFacturas";
import NuevoGasto from "./paginas/gastos/NuevoGasto";
import ListadoGastos from "./paginas/gastos/ListadoGastos";
import EditarGastos from "./paginas/gastos/EditarGastos";
import DetalleGastos from "./paginas/gastos/DetalleGastos";
import Registrar from "./paginas/inicio/Registrar";
import ResetPassword from "./paginas/inicio/ResetPassword";
import NuevoPassword from "./paginas/inicio/NuevoPassword";
import ConfirmarCuenta from "./paginas/inicio/ConfirmarCuenta";
import NominaUsuarios from "./paginas/usuarios/NominaUsuarios";
import EditarUsuario from "./paginas/usuarios/EditarUsuario";
import DetalleUsuario from "./paginas/usuarios/DetalleUsuario";
import NuevoUsuario from "./paginas/usuarios/NuevoUsuario";
import { AuthProvider } from "./context/AuthProvider";
import NuevoPedido from "./paginas/pedidos/NuevoPedido";
import ListadoPedidos from "./paginas/pedidos/ListadoPedidos";
import EditarPedido from "./paginas/pedidos/EditarPedido";
import DetallePedido from "./paginas/pedidos/DetallePedido";
import NuevaOrden from "./paginas/ordenesCompra/NuevaOrden";
import ListadoOrdenes from "./paginas/ordenesCompra/ListadoOrdenes";
import EditarOrden from "./paginas/ordenesCompra/EditarOrden";
import DetallesOrden from "./paginas/ordenesCompra/DetallesOrden";
import Menu from "./paginas/ordenesManufactura/Menu";
import ListadoVidrio from "./paginas/ordenesManufactura/ListadoVidrio";
import ListadoRemitosInternos from "./paginas/remitosInternos/ListadoRemitosInternos";
import NuevoRemitoInterno from "./paginas/remitosInternos/NuevoRemitoInterno";
import EditarRemitoInterno from "./paginas/remitosInternos/EditarRemitoInterno";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<IniciarSesion />}>
            <Route index element={<LoginForm />} />
            <Route path="registrar" element={<Registrar />}></Route>
            <Route path="passwordReset" element={<ResetPassword />}></Route>
            <Route
              path="nuevo-password/:token"
              element={<NuevoPassword />}
            ></Route>
            <Route
              path="confirmar-cuenta/:id"
              element={<ConfirmarCuenta />}
            ></Route>
          </Route>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/clientes" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="nuevo" element={<NuevoCliente />} />
            <Route path="nomina" element={<NominaClientes />} />
            <Route path="editar/:id" element={<EditarCliente />} />
            <Route path=":id" element={<DetalleCliente />} />
          </Route>
          <Route path="/proyectos" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="nuevo" element={<NuevoProyecto />} />
            <Route path="listado" element={<ListadoProyectos />} />
            <Route path="editar/:id" element={<EditarProyecto />} />
            <Route path=":id" element={<DetalleProyecto />} />
          </Route>
          <Route path="/facturas" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="nuevo" element={<NuevaFactura />} />
            <Route path="listado" element={<ListadoFacturas />} />
            <Route path="editar/:id" element={<EditarFacturas />} />
            <Route path=":id" element={<DetalleFacturas />} />
          </Route>
          <Route path="/gastos" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="nuevo" element={<NuevoGasto />} />
            <Route path="listado" element={<ListadoGastos />} />
            <Route path="editar/:id" element={<EditarGastos />} />
            <Route path=":id" element={<DetalleGastos />} />
          </Route>
          <Route path="/usuarios" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="nuevo" element={<NuevoUsuario />} />
            <Route path="nomina" element={<NominaUsuarios />} />
            <Route path="editar/:id" element={<EditarUsuario />} />
            <Route path=":id" element={<DetalleUsuario />} />
          </Route>
          <Route path="/pedidos" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="nuevo" element={<NuevoPedido />} />
            <Route path="listado" element={<ListadoPedidos />} />
            <Route path="editar/:id" element={<EditarPedido />} />
            <Route path=":id" element={<DetallePedido />} />
          </Route>
          <Route path="/ordenes" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="nuevo" element={<NuevaOrden />} />
            <Route path="listado" element={<ListadoOrdenes />} />
            <Route path="editar/:id" element={<EditarOrden />} />
            <Route path=":id" element={<DetallesOrden />} />
          </Route>
          <Route path="/ordenes-manufactura" element={<Layout />}>
            <Route index element={<Menu />} />
            <Route path="vidrio" element={<ListadoVidrio />} />
          </Route>
          <Route path="/panol" element={<Layout />}>
            <Route index element={<ListadoRemitosInternos />} />
            <Route path="listado" element={<ListadoRemitosInternos />} />
            <Route path="nuevo" element={<NuevoRemitoInterno />} />
            <Route path="editar/:id" element={<EditarRemitoInterno />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

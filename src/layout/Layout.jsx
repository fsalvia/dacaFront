import { useState, useEffect } from "react";
import {
  Outlet,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logoGrisClaro.png";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const [openCli, setOpenCli] = useState(false);
  const [openProy, setOpenProy] = useState(true);
  const [openFac, setOpenFac] = useState(true);
  const [openPed, setOpenPed] = useState(true);
  const [openGas, setOpenGas] = useState(true);
  const [openRem, setOpenRem] = useState(true);
  const [openUsu, setOpenUsu] = useState(true);
  const [openOrd, setOpenOrd] = useState(true);
  const location = useLocation();
  const urlActual = location.pathname;

  const { auth, cargando } = useAuth();

  if (cargando)
    return <div className="bg-gray-900 min-h-screen">'Cargando...'</div>;

  return (
    <div className="md:flex">
      {auth.id ? "" : <Navigate to="/" />}
      <div className="w-70 flex min-h-screen select-none">
        <div className="w-64 overflow-y bg-gray-900">
          <div className="px-6 pt-8">
            <div className="flex items-center justify-between">
              <img src={logo} alt="" />
            </div>
          </div>

          <div className="px-6 pt-4">
            <hr className="border-gray-700" />
          </div>
          <div className="px-6 pt-4">
            <ul className="flex flex-col space-y-2">
              <li
                className={`relative ${
                  urlActual === "/dashboard"
                    ? "text-gray-300"
                    : " text-gray-500"
                } hover:text-white focus-within:text-white`}
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.75 8.75V19"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 8.25H19"
                    ></path>
                  </svg>
                </div>
                <Link
                  to="/dashboard"
                  className={` inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800`}
                >
                  Dashboard
                </Link>
              </li>
              <details className=" text-gray-500">
                <summary
                  onClick={() => setOpenCli(!openCli)}
                  className="flex transition-transform  hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  <div
                    className={`${
                      openCli ? "text-white" : ""
                    } flex items-center w-full`}
                  >
                    <span className="flex">
                      <span>
                        <svg
                          className="w-5 h-5 stroke-current "
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M18 9.25H13.75V5"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9.75 15.25H14.25"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9.75 12.25H14.25"
                          ></path>
                        </svg>
                      </span>
                      <span className="px-1 py-0.5">Clientes</span>
                    </span>
                  </div>
                  <span>
                    <svg
                      className={`${
                        !openCli ? "" : "rotate-180"
                      } duration-100 h-3 w-3`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-2 pl-4">
                  <ul
                    className={`${
                      openCli ? "text-gray-500" : "text-gray-900"
                    } origin-top-left duration-500 flex flex-col pl-2  border-l border-gray-700`}
                  >
                    <li>
                      <Link
                        to="/clientes/nomina"
                        className={`${
                          urlActual === "/clientes/nomina"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Nómina de Clientes
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/clientes/nuevo"
                        className={`${
                          urlActual === "/clientes/nuevo"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Nuevo Cliente
                      </Link>
                    </li>
                  </ul>
                </div>
              </details>
              <details className=" text-gray-500">
                <summary
                  onClick={() => setOpenProy(!openProy)}
                  className="flex duration-300 hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  <div
                    className={`${
                      openProy ? "" : "text-white"
                    } flex items-center w-full`}
                  >
                    <span className="flex">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className={` px-1 py-0.5`}>Proyectos</span>
                    </span>
                  </div>
                  <span>
                    <svg
                      className={`${
                        openProy ? "" : "rotate-180"
                      } duration-100 h-3 w-3`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-2 pl-4">
                  <ul className="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                    <li>
                      <Link
                        to="/proyectos/listado"
                        className={`${
                          urlActual === "/proyectos/listado"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Listado de Proyectos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/proyectos/nuevo"
                        className={`${
                          urlActual === "/proyectos/nuevo"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Nuevo Proyecto
                      </Link>
                    </li>
                  </ul>
                </div>
              </details>
              <div className="px-6 pt-4">
                <hr className="border-gray-700" />
              </div>
              <details className=" text-gray-500">
                <summary
                  onClick={() => setOpenFac(!openFac)}
                  className="flex duration-300 hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  <div
                    className={`${
                      openFac ? "" : "text-white"
                    } flex items-center w-full`}
                  >
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="px-1 py-0.5">Facturación</span>
                    </span>
                  </div>
                  <span>
                    <svg
                      className={`${
                        openFac ? "" : "rotate-180"
                      } duration-100 h-3 w-3`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-2 pl-4">
                  <ul className="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                    <li>
                      <Link
                        to="/facturas/listado"
                        className={`${
                          urlActual === "/facturas/listado"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Todas las Facturas
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              </details>
              <details className=" text-gray-500">
                <summary
                  onClick={() => setOpenGas(!openGas)}
                  className="flex duration-300 hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  <div
                    className={`${
                      openGas ? "" : "text-white"
                    } flex items-center w-full`}
                  >
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="px-1 py-0.5">Gastos</span>
                    </span>
                  </div>
                  <span>
                    <svg
                      className={`${
                        openGas ? "" : "rotate-180"
                      } duration-100 h-3 w-3`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-2 pl-4">
                  <ul className="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                    <li>
                      <Link
                        to="/gastos/listado"
                        className={`${
                          urlActual === "/gastos/listado"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Listado de Gastos
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              </details>
              <details className=" text-gray-500">
                <summary
                  onClick={() => setOpenRem(!openRem)}
                  className="flex duration-300 hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  <div
                    className={`${
                      openRem ? "" : "text-white"
                    } flex items-center w-full`}
                  >
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                      <span className="px-1 py-0.5">Remitos</span>
                    </span>
                  </div>
                  <span>
                    <svg
                      className={`${
                        openRem ? "" : "rotate-180"
                      } duration-100 h-3 w-3`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-2 pl-4">
                  <ul className="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                    <li>
                      <a
                        href="#"
                        className="duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white"
                      >
                        Listado de Remitos
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white"
                      >
                        Nuevo Remito
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white"
                      >
                        Consultar Detalles
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <div className="px-6 pt-4">
                <hr className="border-gray-700" />
              </div>

              <details className=" text-gray-500">
                <summary
                  onClick={() => setOpenPed(!openPed)}
                  className="flex duration-300 hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  <div
                    className={`${
                      openPed ? "" : "text-white"
                    } flex items-center w-full`}
                  >
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>

                      <span className="px-1 py-0.5">Pedidos de Precios</span>
                    </span>
                  </div>
                  <span>
                    <svg
                      className={`${
                        openPed ? "" : "rotate-180"
                      } duration-100 h-3 w-3`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-2 pl-4">
                  <ul className="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                    <li>
                      <Link
                        to="/pedidos/listado"
                        className={`${
                          urlActual === "/pedidos/listado"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Todos los Pedidos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pedidos/nuevo"
                        className={`${
                          urlActual === "/pedidos/nuevo"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Carga de Nuevo Pedido
                      </Link>
                    </li>
                  </ul>
                </div>
              </details>
              <details className=" text-gray-500">
                <summary
                  onClick={() => setOpenOrd(!openOrd)}
                  className="flex duration-300 hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  <div
                    className={`${
                      openOrd ? "" : "text-white"
                    } flex items-center w-full`}
                  >
                    <span className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>

                      <span className="px-1 py-0.5">Ordenes de Compra</span>
                    </span>
                  </div>
                  <span>
                    <svg
                      className={`${
                        openOrd ? "" : "rotate-180"
                      } duration-100 h-3 w-3`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-2 pl-4">
                  <ul className="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                    <li>
                      <Link
                        to="/ordenes/listado"
                        className={`${
                          urlActual === "/ordenes/listado"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Todos las Ordenes
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ordenes/nuevo"
                        className={`${
                          urlActual === "/ordenes/nuevo"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Generar Nueva Orden
                      </Link>
                    </li>
                  </ul>
                </div>
              </details>
              <Link
                to="/ordenes-manufactura/"
                className={`${
                  urlActual === "/ordenes-manufactura"
                    ? "text-gray-300"
                    : " text-gray-500"
                } duration-300 inline-block w-full px-2 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
              >
                <span className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                  <span className="px-1 py-0.5">Ordenes de Manufactura</span>
                </span>
              </Link>
              <div className="px-6 pt-4">
                <hr className="border-gray-700" />
              </div>
              <details className=" text-gray-500">
                <summary
                  onClick={() => setOpenUsu(!openUsu)}
                  className="flex transition-transform  hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  <div
                    className={`${
                      openUsu ? "" : "text-white"
                    } flex items-center w-full`}
                  >
                    <span className="flex">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                          />
                        </svg>
                      </span>
                      <span className="px-1 py-0.5">Usuarios</span>
                    </span>
                  </div>
                  <span>
                    <svg
                      className={`${
                        !openCli ? "" : "rotate-180"
                      } duration-100 h-3 w-3`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-2 pl-4">
                  <ul
                    className={`${
                      openCli ? "text-gray-500" : "text-gray-900"
                    } origin-top-left duration-500 flex flex-col pl-2  border-l border-gray-700`}
                  >
                    <li>
                      <Link
                        to="/usuarios/nomina"
                        className={`${
                          urlActual === "/usuarios/nomina"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Nómina de Usuarios
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/usuarios/nuevo"
                        className={`${
                          urlActual === "/usuarios/nuevo"
                            ? "text-gray-300"
                            : " text-gray-500"
                        } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                      >
                        Nuevo Usuario
                      </Link>
                    </li>
                  </ul>
                </div>
              </details>
              <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="15" cy="9" r="1" fill="currentColor"></circle>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 4.75H19.25V12L12.5535 18.6708C11.7544 19.4668 10.4556 19.445 9.68369 18.6226L5.28993 13.941C4.54041 13.1424 4.57265 11.8895 5.36226 11.1305L12 4.75Z"
                    ></path>
                  </svg>
                </div>
                <a
                  href="#"
                  className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  Market & sell
                </a>
              </li>
              <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5.75 19.2502H6.25C6.80229 19.2502 7.25 18.8025 7.25 18.2502V15.75C7.25 15.1977 6.80229 14.75 6.25 14.75H5.75C5.19772 14.75 4.75 15.1977 4.75 15.75V18.2502C4.75 18.8025 5.19772 19.2502 5.75 19.2502Z"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M11.75 19.2502H12.25C12.8023 19.2502 13.25 18.8025 13.25 18.2502V12.75C13.25 12.1977 12.8023 11.75 12.25 11.75H11.75C11.1977 11.75 10.75 12.1977 10.75 12.75V18.2502C10.75 18.8025 11.1977 19.2502 11.75 19.2502Z"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.75 19.2502H18.25C18.8023 19.2502 19.25 18.8025 19.25 18.2502V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H17.75C17.1977 4.75 16.75 5.19772 16.75 5.75V18.2502C16.75 18.8025 17.1977 19.2502 17.75 19.2502Z"
                    ></path>
                  </svg>
                </div>
                <a
                  href="#"
                  className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  Reporting
                </a>
              </li>
              <li className="relative text-gray-500 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="7.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></circle>
                    <circle
                      cx="12"
                      cy="12"
                      r="3.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></circle>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7 17L9.5 14.5"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17 17L14.5 14.5"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.5 9.5L7 7"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M14.5 9.5L17 7"
                    ></path>
                  </svg>
                </div>
                <a
                  href="#"
                  className="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="px-6 pt-8">
    
          </div>
          
          <div className="pl-6 pr-4 py-4 bg-[#232529] flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
                <img
                  className="rounded-full"
                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  alt=""
                />
              </div>
              <div className="flex flex-col pl-3">
                <div className="text-sm text-gray-50">Gonzalo Salvia</div>
                <span className="text-xs text-[#acacb0] font-light tracking-tight">
                  gsalvia@grupodaca.com.ar
                </span>
              </div>
            </div>
            <button className="text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white">
              <svg
                className="w-4 h-4 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.25 10.75L12 14.25L8.75 10.75"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full  bg-gradient-to-t from-gray-600 to-gray-500">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

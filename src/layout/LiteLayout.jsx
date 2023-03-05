import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logoGrisClaro.png";
const urlActual = location.pathname;

const LiteLayout = ({auth}) => {
  const [openRem, setOpenRem] = useState(true);
  return (
    <div className="md:flex">
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
          </ul>
            <details className=" text-gray-500">
              <summary
                onClick={() => setOpenRem(!openRem)}
                className="flex transition-transform  hover:text-white list-none items-center justify-between w-full py-2 pl-2 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
              >
                <div
                  className={`${
                    openRem ? "text-white" : ""
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
                    <span className="px-1 py-0.5">Remitos</span>
                  </span>
                </div>
                <span>
                  <svg
                    className={`${
                      !openRem ? "" : "rotate-180"
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
                    openRem ? "text-gray-500" : "text-gray-900"
                  } origin-top-left duration-500 flex flex-col pl-2  border-l border-gray-700`}
                >
                  <li>
                    <Link
                      to="/panol/listado"
                      className={`${
                        urlActual === "/panol/listado"
                          ? "text-gray-300"
                          : " text-gray-500"
                      } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                    >
                      Listado de Remitos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/panol/nuevo"
                      className={`${
                        urlActual === "/panol/nuevo"
                          ? "text-gray-300"
                          : " text-gray-500"
                      } duration-300 inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white`}
                    >
                      Nuevo Remito
                    </Link>
                  </li>
                </ul>
              </div>
            </details>
          </div>
          <div className="absolute  top-3/4">
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
                <div className="text-sm text-gray-50">
                  {auth.name + " " + auth.lastname}
                </div>
                <span className="text-xs text-[#acacb0] font-light tracking-tight">
                  {auth.email}
                </span>
              </div>
            </div>
            <button className="text-gray-400 ml-4 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white">
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
        
      </div>
      <div className="w-full min-h-full  bg-gradient-to-t from-gray-600 to-gray-500">
        <Outlet />
      </div>
    </div>
  );
};

export default LiteLayout;

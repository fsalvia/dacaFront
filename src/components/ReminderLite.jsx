import React from "react";
import DeleteModal from "./DeleteModal";
import NewReminderModal from "./reminder/NewReminderModal";


const ReminderLite = ({ reminder, handleRefresh }) => {
  const {
    id,
    userEntity,
    project,
    customer,
    addedDate,
    reminderDate,
    relevance,
    status,
    message,
  } = reminder;

  const setColorRelevance = (relevance) => {
    if (relevance == "alta") {
      return (
        <div className="bg-red-600 h-full w-3 rounded-r-lg align-bottom"></div>
      );
    }
    if (relevance == "media") {
      return (
        <div className="bg-yellow-600 h-full w-3 rounded-r-lg align-bottom"></div>
      );
    }
    if (relevance == "baja") {
      return (
        <div className="bg-green-600 h-full w-3 rounded-r-lg align-bottom"></div>
      );
    }
  };

  return (
    <div className="flex flex-col text-sm bg-gray-400 rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-300">
      <div className="w-full pl-3 pt-2">
        <div className="flex justify-between mr-2">
          <h1 className="font-semibold text-black">
            Proyecto:{" "}
            <span className="font-normal text-gray-900">{"project.name"}</span>
          </h1>
          <h1 className="font-semibold text-black">
            Fecha:{" "}
            <span className="font-normal text-gray-900">{addedDate}</span>
          </h1>
        </div>
        <div className="flex justify-between mr-2">
          <h1 className="font-semibold text-black">
            Cliente:{" "}
            <span className="font-normal text-gray-900">
              {"customer.businessName"}
            </span>
          </h1>
          <h1 className="font-semibold text-black flex">
            <span className={`${reminderDate<=addedDate? 'animate-ping':''}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                />
              </svg>
            </span>
            <span className="font-normal text-gray-900">{reminderDate}</span>
          </h1>
        </div>

        <h1 className="font-semibold text-black">
          Mensaje: <span className="font-normal text-gray-900">{message}</span>
        </h1>
        <div className="text-right pb-2 pr-2 flex justify-end">
          <NewReminderModal reminder={reminder} reload={handleRefresh} />

          <DeleteModal
            element={reminder}
            reload={handleRefresh}
            elementType={"reminder"}
          />
        </div>
      </div>
      {setColorRelevance(relevance)}
    </div>
  );
};

export default ReminderLite;

import React from "react";

const Reminder = ({ reminder }) => {
  const {
    id,
    project,
    customer,
    addedDate,
    reminderDate,
    relevance,
    status,
    message,
  } = reminder;
  return (
    <div className="flex flex-col items-center text-sm bg-gray-400 rounded-lg  shadow-md md:flex-row md:max-w-xl hover:bg-gray-300">
      <div className="w-full pl-3 pt-2">
        <h1 className="font-semibold text-black">Título:</h1>
        <h1 className="font-semibold text-black">
          Proyecto:{" "}
          <span className="font-normal text-gray-900">{project.name}</span>
        </h1>
        <h1 className="mb-1 font-normal text-gray-900 ">{message}</h1>
        <div className="text-right pb-2 pr-2">
          <button className="hover:text-yellow-600">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          </button>
          <button className="hover:text-red-600 pl-1">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${status === 3 ? "bg-red-600" : ""} ${
          status === 2
            ? "bg-yellow-600"
            : " bg-green-600"
        } h-full w-3 rounded-r-lg align-bottom`}
      >
        
      </div>
    </div>
  );
};

export default Reminder;

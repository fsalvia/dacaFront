import React from "react";

export default function FooterTable({ actualPage, totalPage, changePage }) {
  const handleNextPage = () => {
    changePage(parseInt(actualPage) + 1);
  };

  const handlePreviousPage = () => {
    changePage(parseInt(actualPage) - 1);
  };

  return (
    <div className=" text-gray-300 h-9 text-center rounded-b-lg overflow-hidden">
      <button disabled={actualPage === 0} onClick={handlePreviousPage}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6 pt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
      </button>
      <label className="p-2">{`${actualPage + 1} de ${totalPage + 1}`}</label>
      <button
        size="small"
        variant="tertiary"
        disabled={actualPage >= totalPage}
        onClick={handleNextPage}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6 pt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

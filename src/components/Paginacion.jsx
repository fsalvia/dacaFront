import React from 'react'

const Paginacion = ({totalPosts, postsPerPage,currentPage, setCurrentPage}) => {
    let pages = [];

    let tope = Math.ceil(totalPosts/postsPerPage)

    for(let i = 1; i<= tope; i++){
        pages.push(i)
    }
  return (
    <div>
      {
        pages.map((page, index) => {
            return <button className={`py-1 ${page===currentPage?"bg-gray-500":"bg-gray-700"} ${page===1?"rounded-l-lg":""} ${page===tope?"rounded-r-lg":""} px-3 ml-0 leading-tight text-gray-400  border border-gray-500 hover:bg-gray-500 hover:text-gray-300`} 
            onClick={() => setCurrentPage(page)}
            key={index}>{page}</button>
        })
      }
    </div>
  )
}

export default Paginacion

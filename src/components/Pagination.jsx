import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      previousLabel={"Anterior"}
      nextLabel={"Siguiente"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"flex justify-center mt-4"} // Agrega clases de Tailwind para centrar horizontalmente
      pageClassName={"inline-block mx-1"} // Agrega margen horizontal entre los botones
      previousClassName={"bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 cursor-pointer"} // Estilo para el botón "Anterior"
      nextClassName={"bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 cursor-pointer"} // Estilo para el botón "Siguiente"
      activeClassName={"bg-blue-600 text-white"} // Estilo para el botón de página activa
    />
  );
}

export default Pagination;

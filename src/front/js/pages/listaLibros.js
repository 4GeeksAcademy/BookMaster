import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import '../../styles/listaLibros.css';

const BookListPage = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getLibros();
  }, [actions]);

  return (
    <div className="listaLibros">
      <h1>Lista de Libros</h1>
      {store.libros.map((libro) => (
        <div key={libro.id} className="book-item">
          <h3>{libro.titulo}</h3>
          <p>Autor: {libro.autor}</p>
          <p>Precio: ${libro.precio}</p>
          <p>Stock: {libro.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default BookListPage;
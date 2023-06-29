import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CardsBooks from "../component/cardsBooks";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="container">
      <div className="text-start mt-5">
        <h3 className="text-danger">Superación</h3>
        <div className="d-flex text-center mt-5 tarjetasPersonaje">
          {store.libros.map((libro, index) => (
            <CardsBooks
              key={index + 1}
              titulo={libro.titulo}
              autor={libro.autor}
              categoria={libro.categoria}
              detalle={libro.detalle}
              precio={libro.precio}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
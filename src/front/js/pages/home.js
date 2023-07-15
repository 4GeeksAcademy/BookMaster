import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CardsBooks from "../component/cardsBooks";
import "../../styles/home.css";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="container">
      <div className="text-start mt-5">
        <div className="pb-2">
        </div>
        
        <div className="d-flex text-center mt-5 tarjetasPersonaje">
          {store.libros.map((libro,index) => (
            <CardsBooks
            key={index +1}
            id={libro.id}
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
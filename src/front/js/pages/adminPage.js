import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const AdminPage = () => {
  const { store } = useContext(Context);

  return (
    
    <div className="text-center mt-3">
      
      <a className="btn btn-primary m-2" href="/libros" role="button">Agregar libro</a>
      <a className="btn btn-primary m-2" href="/usuarios" role="button">Ver lista de usuarios </a>
      <a className="btn btn-primary m-2" href="/compras" role="button">Ver lista de compras </a>
      <a className="btn btn-primary m-2" href="/lista-libros" role="button">Ver lista de libros </a>
    </div>
  );
};
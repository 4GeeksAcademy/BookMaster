import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const AdminPage = () => {
  const { store } = useContext(Context);

  return (
    
    <div className="text-center mt-3">
      
      <a className="btn btn-primary m-2" href="/libros" role="button">Agregar libro</a>
    </div>
  );
};
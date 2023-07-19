import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import '../../styles/listaCompras.css';

const CartListPage = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getDirecciones(); // Obtener las direcciones del carrito
  }, [actions]);

  return (
    <div className="listaCompras">
      <h1>Lista de Direcciones</h1>
      {store.direcciones.map((direccion) => (
        <div key={direccion.id} className="address-item">
          <h3>{direccion.nombre}</h3>
          <p>Dirección: {direccion.direccion}</p>
          <p>Ciudad: {direccion.ciudad}</p>
          <p>País: {direccion.pais}</p>
        </div>
      ))}
    </div>
  );
};

export default CartListPage;
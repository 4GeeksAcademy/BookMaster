import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import '../../styles/listaCompras.css';

const CartListPage = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCarrito();
  }, [actions]);

  return (
    <div className="listaCompras">
      <h1>Carrito de Compras</h1>
      {store.car.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.libro.titulo}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio: ${item.libro.precio}</p>
          <p>User ID: {item.user.id}</p>
        </div>
      ))}
    </div>
  );
};

export default CartListPage;
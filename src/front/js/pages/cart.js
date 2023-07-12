import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Cart = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleRemoveFromCart = async (cartItem) => {
    try {
      await actions.eliminarElementoCarrito(cartItem.id);
      const updatedCarrito = await actions.getCarrito();
      console.log("Carrito actualizado:", updatedCarrito);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="text-start mt-5">
        <h3 className="text-danger">Carrito de Compras</h3>
        <div className="d-flex text-center mt-5">
          <ul className="list-group list-group-flush">
            {store.car.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="row">
                  <div className="col-3">
                    <img src={item.imagen} width="50" height="50" alt={item.titulo} />
                  </div>
                  <div className="col-6">
                    <div>{item.titulo}</div>
                    <div>Precio: {item.precio}</div>
                    <div>Cantidad: {item.cantidad}</div>
                  </div>
                  <div className="col-3 text-end">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {store.car.length === 0 && (
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">El carrito está vacío</h5>
              </div>
            </div>
          )}
        </div>
        {store.car.length > 0 && (
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="fw-bold">Total:</div>
              <div>{calculateTotal()}</div>
            </div>
            <div className="text-end mt-3">
              <button className="btn btn-primary">Pagar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
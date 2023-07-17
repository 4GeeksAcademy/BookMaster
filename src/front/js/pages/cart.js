import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Cart = () => {
  const { store, actions } = useContext(Context);
  const [inputValues, setInputValues] = useState({});
  useEffect(() => {
    actions.getCarrito();
  }, [actions]);
  useEffect(() => {
    if (store.car && store.car.length > 0) {
      const initialValues = {};
      store.car.forEach(item => {
        initialValues[item.id] = item.quantity.toString();
      });
      setInputValues(initialValues);
    }
  }, [store.car]);
  const handleEditCart = (itemId, item) => {
    if (item.quantity <= item.stock) {
      actions.editarCarrito(itemId, item);
    } else {
      alert(`Solo se puede agregar hasta ${item.stock} libros al carrito`);
    }
  };
  const handleRemoveFromCart = (itemId) => {
    actions.eliminarElementoCarrito(itemId);
  };
  const handleInputChange = (itemId, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [itemId]: value
    }));
  };
  return (
    <>
      <h1>Libros añadidos al Carrito</h1>
      {store.car.map(item => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{item.libro.titulo}</h3>
            <p className="card-text">Precio: {item.precio}</p>
            <p className="card-text">
              Cantidad:{" "}
              <span>
                <span className="m-2">{item.quantity}</span>
                <span className="m-3">
                    Editar cantidad:
                <button
                  className="btn btn-outline-primary quantity-button"
                  onClick={() => handleEditCart(item.id, { ...item, quantity: item.quantity - 1 })}
                >
                  -
                </button>
                <button
                  className="btn btn-outline-primary quantity-button ml-2"
                  onClick={() => handleEditCart(item.id, { ...item, quantity: item.quantity + 1 })}
                >
                  +
                </button>
                </span>
              </span>
            </p>
            <p className="card-text">Disponible en Stock: {item.stock}</p>
            <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>Eliminar del Carrito</button>
          </div>
        </div>
        
      ))}
      <Link className="btn btn-primary btn-lg mb-2" to="/direcciones">Pagar</Link>
    </>
  );
};
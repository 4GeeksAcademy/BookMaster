import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/cart.css";

export const Cart = () => {
  const { store, actions } = useContext(Context);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    actions.getCarrito();
  }, []);

  useEffect(() => {
    if (store.car && store.car.length > 0) {
      setInputValues(store.car.map((item) => item.quantity));
    }
  }, [store.car]);

  const handleEditCart = (itemId, index, item) => {
    const inputValue = inputValues[index];
    if (inputValue <= item.stock) {
      actions.editarCarrito(itemId, { ...item, quantity: parseInt(inputValue) });
    } else {
      alert(`Solo se puede agregar hasta ${item.stock} libros al carrito`);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    actions.eliminarElementoCarrito(itemId);
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {store.car.map((item, index) => (
        <div key={index} className="cart-item">
          <h3>{item.libro.titulo}</h3>
          <p>Precio: {item.precio}</p>
          <p>Cantidad: {item.quantity}</p>
          <p>Disponible en Stock: {item.stock}</p>
          <input
            type="number"
            value={inputValues[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button onClick={() => handleEditCart(item.id, index, item)}>Editar cantidad</button>
          <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar del Carrito</button>
        </div>
      ))}
      <Link className="btn btn-primary" to="/direcciones">
        Ir a direcciones
      </Link>
    </div>
  );
};
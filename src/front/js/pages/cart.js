import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Cart = () => {
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState(1);

  useEffect(() => {
    actions.getCarrito();
  }, []);

  const handleEditCart = (itemId, item) => {
    if (inputValue <= item.stock) {
      actions.editarCarrito(itemId, { ...item, cantidad: inputValue });
    } else {
      alert(`Solo se puede agregar hasta ${item.stock} libros al carrito`);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    actions.eliminarElementoCarrito(itemId);
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
        {store.car.map((item, index) => (
          <div key={index}>
            <img src={item.libro.imagen} alt={item.libro.titulo} />
            <p>{item.libro.titulo}</p>
            <p>Precio: {item.precio}</p>
            <p>Cantidad: {item.quantity}</p> 
            <p>Disponible en Stock: {item.stock}</p>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(parseInt(e.target.value))}
            />
            <button onClick={() => handleEditCart(item.id, item)}>
              Editar cantidad
            </button>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Eliminar del Carrito
            </button>
          </div>
        ))}
    </div>
  );
};
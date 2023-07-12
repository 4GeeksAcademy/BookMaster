import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [car, setCar] = useState([]);

  const rigoImageUrl = "";

  const calculateTotal = () => {
    const total = store.car.reduce(
      (accumulator, item) => accumulator + item.precio * item.cantidad,
      0
    );
    return `$${total.toFixed(2)}`;
  };

  const handleRemoveFromCart = async (cartItem) => {
    try {
      await actions.eliminarElementoCarrito(cartItem.id);
      const updatedCarrito = await actions.getCarrito();
      console.log("Carrito actualizado:", updatedCarrito);
      setCar(updatedCarrito);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/" className="m-2">
        <img src={rigoImageUrl} width="70" height="50" alt="Rigo" />
      </Link>
      <div className="ml-auto d-flex align-items-center">
        <div className="dropdown m-2">
          <a
            className="btn btn-secondary dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <i className="grupoWish fa fa-heart fa-2x"></i>{" "}
            <span className="badge bg-primary">{store.favorite.length}</span>
          </a>
          <ul className="dropdown-menu" style={{ width: "200px" }}>
            {store.favorite.map((item, index) => (
              <li key={index} className="dropdown-item d-flex container">
                <div className="row align-items-center">
                  <div className="col-8">
                    <span className="text-primary">{item}</span>
                  </div>
                  <div className="col-4 text-end justify-content-end">
                    <button
                      className="border border-0 "
                      onClick={() => actions.eliminarElementoCarrito(item)}
                    >
                      <i className="fa fa-solid fa-trash" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="grupoCart fa fa-shopping-cart fa-2x"></i>{" "}
            <span className="badge bg-primary">{store.car.length}</span>
          </button>
          <ul className="dropdown-menu" style={{ width: "300px" }}>
            {store.car.map((item) => (
              <li key={item.id} className="dropdown-item d-flex container">
                <div className="row align-items-center">
                  <div className="col-3">
                    <img src={item.imagen} width="50" height="50" alt={item.titulo} />
                  </div>
                  <div className="col-6">
                    <div>{item.titulo}</div>
                    <div>Precio: {item.precio}</div>
                    <div>Cantidad: {item.cantidad}</div>
                  </div>
                  <div className="col-3 text-end justify-content-end">
                    <button
                      className="border border-0"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <i className="fa fa-solid fa-trash" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {store.car.length === 0 && (
              <li className="dropdown-item text-center">El carrito está vacío</li>
            )}
            <li className="dropdown-item d-flex justify-content-between align-items-center">
              <div>Total:</div>
              <div>{calculateTotal()}</div>
            </li>
            <li className="dropdown-item text-center">
              <Link className="btn btn-primary" to="/carrito">
                Pagar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
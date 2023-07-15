import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [isAlertActive, setIsAlertActive] = useState(false);

  const calculateTotal = () => {
    const total = store.car.reduce(
      (accumulator, item) => accumulator + item.precio * item.quantity,
      0
    );
    return `$${total.toFixed(2)}`;
  };

  const handleRemoveFromCart = (itemId) => {
    actions.eliminarElementoCarrito(itemId);
  };

  const handlePay = () => {
    if (isAlertActive) {
      return; // No permite pagar si hay un cuadro de alerta activo
    }

    navigate("/carrito");
  };

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value);
    actions.editarCarrito(itemId, { quantity: newQuantity });
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/" className="m-2">
        <img src={rigoImageUrl} width="70" height="50" alt="Rigo" />
      </Link>
      <div className="ml-auto d-flex align-items-center">
        <div className="dropdown">
          {/* Código del dropdown de favoritos */}
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
          <ul className="dropdown-menu" style={{ minWidth: "300px" }}>
            {store.car.map((item) => (
              <li key={item.id} className="dropdown-item">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-3">
                        {item.libro && item.libro.imagen && (
                          <img
                            src={item.libro.imagen}
                            width="50"
                            height="50"
                            alt={item.libro.titulo}
                          />
                        )}
                      </div>
                      <div className="col-6">
                        <h5 className="card-title mb-1">{item.libro && item.libro.titulo}</h5>
                        <p className="card-text">Precio: {item.precio}</p>
                        <p className="card-text">
                          <span className="mr-2">Cantidad:</span>
                          <input
                            type="number"
                            className="form-control form-control-sm d-inline-block"
                            value={item.quantity}
                            onChange={(event) => handleQuantityChange(item.id, event)}
                          />
                        </p>
                      </div>
                      <div className="col-3 text-end">
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <i className="fa fa-solid fa-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {item.quantity > item.stock && (
                  <div className="alert alert-danger" role="alert">
                    Solo puedes añadir hasta {item.stock} libros al carrito
                  </div>
                )}
              </li>
            ))}
            {store.car.length === 0 && (
              <li className="dropdown-item text-center">El carrito está vacío</li>
            )}
            <li className="dropdown-item d-flex justify-content-between align-items-center">
              <div>Total: {calculateTotal()}</div>
              <div>
                <button className="btn btn-primary" onClick={handlePay}>
                  Pagar
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
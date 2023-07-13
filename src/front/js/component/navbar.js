import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
export const Navbar = () => {
  const { store, actions } = useContext(Context);
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
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/" className="m-2">
        <img src={rigoImageUrl} width="70" height="50" alt="Rigo" />
      </Link>
      <div className="ml-auto d-flex align-items-center">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="grupoWish fa fa-heart fa-2x"></i>{" "}
            <span className="badge bg-primary">{store.favorite.length}</span>
          </button>
          <ul className="dropdown-menu" style={{ width: "200px" }}>
            {store.favorite.map((item, index) => (
              <li key={index} className="dropdown-item d-flex container">
                <div className="row align-items-center">
                  <div className="col-8">
                    <span className="text-primary">{item}</span>
                  </div>
                  <div className="col-4 text-end">
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => actions.borrarFavoritos(item)}
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
                    {item.libro && item.libro.imagen && (
                      <img src={item.libro.imagen} width="50" height="50" alt={item.libro.titulo} />
                    )}
                  </div>
                  <div className="col-6">
                    <p className="mb-1">{item.libro && item.libro.titulo}</p>
                    <p className="mb-1">Precio: {item.precio}</p>
                    <p className="mb-0">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="col-3 text-end">
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => handleRemoveFromCart(item.id)}>
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
              <div>
                Total: {calculateTotal()}
              </div>
              <div>
                <Link className="btn btn-primary" to="/carrito">
                  Pagar
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};







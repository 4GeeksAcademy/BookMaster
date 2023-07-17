import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import bookMaster from "../../img/bookmaster.jpg";
import "../../styles/navbar.css";


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
    <nav className="navbar navbar-light bg-dark mb-3">
      <Link to="/" className="m-2">
        <img src={bookMaster} width="70" height="50" alt="Rigo" />
      </Link>
      <div className="ml-auto d-flex align-items-center">
        <div className="dropdown mr-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuCategories"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categorías
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuCategories">
            <li>
              <Link to="/top-ventas" className="dropdown-item">Top Ventas</Link>
            </li>
            <li>
              <Link to="/novelas" className="dropdown-item">Novelas</Link>
            </li>
            <li>
              <Link to="/poesias" className="dropdown-item">Poesías</Link>
            </li>
            <li>
              <Link to="/infantil" className="dropdown-item">Infantil</Link>
            </li>
            <li>
              <Link to="/academicos" className="dropdown-item">Académicos</Link>
            </li>
            <li>
              <Link to="/historia" className="dropdown-item">Historia</Link>
            </li>
          </ul>
        </div>
        <div className="dropdown mr-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuBlog"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Blog
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuBlog">
            <li>
              <Link to="/blog" className="dropdown-item">Visitar Blog</Link>
            </li>
          </ul>
        </div>
        <form className="form-inline mr-3">
          <div className="input-group">
            <input className="form-control" type="search" placeholder="Buscar" aria-label="Buscar" />
            <button className="btn btn-primary" type="submit">Buscar</button>
          </div>
        </form>
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
        <Link to="/login" className="btn btn-primary mr-2">Iniciar Sesión</Link>
        <Link to="/signup" className="btn btn-primary">Registrarse</Link>
      </div>
    </nav>
  );
};
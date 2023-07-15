import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/navbar.css";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={rigoImageUrl} width="70" height="50" alt="Rigo" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="categoryDropdown"
                data-bs-toggle="dropdown"
                style={{ color: 'black' }}
              >
                Categorías
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="categoryDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/categorias/top-ventas">
                    Top Ventas
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/novelas">
                    Novelas
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/poesias">
                    Poesías
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/infantil">
                    Infantil
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/academicos">
                    Académicos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/historia">
                    Historia
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Buscar"
                />
                <button className="btn btn-primary" type="submit">
                  Buscar
                </button>
              </form>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Registrarse
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="favoriteDropdown"
                data-bs-toggle="dropdown"
              >
                <i className="grupoWish fa fa-heart" style={{ color: 'black' }}></i>
                <span className="badge bg-primary">
                  {store.favorite.length}
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="favoriteDropdown"
              >
                {store.favorite.map((item, index) => (
                  <li key={index} className="dropdown-item">
                    <div className="d-flex align-items-center">
                      <span className="text-primary">{item}</span>
                      <button
                        className="btn btn-sm btn-light ms-auto"
                        onClick={() => actions.borrarFavoritos(item)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="cartDropdown"
                data-bs-toggle="dropdown"
              >
                <i className="grupoCart fa fa-shopping-cart"style={{ color: 'black' }}></i>
                <span className="badge bg-primary">{store.car.length}</span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end cart-dropdown-menu"
                aria-labelledby="cartDropdown"
              >
                {store.car.map((item) => (
                  <li key={item.id} className="dropdown-item">
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
                        <p className="mb-1">{item.libro && item.libro.titulo}</p>
                        <p className="mb-1">Precio: {item.precio}</p>
                        <p className="mb-0">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="col-3 text-end">
                        <button
                          className="btn btn-sm btn-light border-0"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                {store.car.length === 0 && (
                  <li className="dropdown-item text-center">
                    El carrito está vacío
                  </li>
                )}
                <li className="dropdown-item d-flex justify-content-between align-items-center">
                  <div>Total: {calculateTotal()}</div>
                  <div>
                    <Link className="btn btn-primary" to="/carrito">
                      Pagar
                    </Link>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
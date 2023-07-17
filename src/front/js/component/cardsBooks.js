import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import portada from "../../img/portada.jpg";
import "../../styles/cardBooks.css";

export const CardsBooks = (props) => {
  const { actions, store } = useContext(Context);
  const isItemInCart = store.car.some(item => item.titulo === props.titulo);
  const isItemInFavorites = store.favorite.some(favoriteItem => favoriteItem.titulo === props.titulo);
  const [cantidad, setCantidad] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const handleAddToFavorites = () => {
    actions.añadirFavoritos(props);
  };
  const handleAddToCart = () => {
    if (cantidad > props.stock) {
      setShowAlert(true);
    } else {
      setShowAlert(false); // Ocultar el cuadro de alerta
      actions.añadirCarrito(props.id, props.titulo, props.precio, cantidad);
    }
  };
  const handleIncreaseQuantity = () => {
    setCantidad(cantidad + 1);
  };
  const handleDecreaseQuantity = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };
  return (
    <div className="card-group">
      <div className="card" style={{ maxWidth: "350px" }}>
        <img src={portada} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Titulo: {props.titulo}</h5>
          <p className="card-text">Autor: {props.autor}</p>
          <p className="card-text">Categoría: {props.categoria}</p>
          <p className="card-text">Detalles: {props.detalle}</p>
          <p className="card-text">Precio: {props.precio}</p>
          <p className="card-text">Disponibles: {props.stock}</p>
          {showAlert && (
            <div className="alert alert-danger" role="alert">
              Solo se puede agregar hasta {props.stock} libros al carrito
            </div>
          )}
          <button
            data-toggle="modal"
            className={`btn btn-primary ${isItemInCart ? 'disabled' : ''}`}
            type="button"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
          <div className="card-footer">
            <small className="text-secondary">
              <span>
                <button
                  data-toggle="modal"
                  className="btn btn-light btn-lg position-absolute top-0 start-0"
                  type="button"
                  onClick={handleAddToFavorites}
                >
                  <i
                    className={`grupoWish fa fa-heart fa-2x ${isItemInFavorites ? 'text-danger' : 'text-secondary'}`}
                    style={{ color: isItemInFavorites ? 'red' : 'gray' }}
                  ></i>
                </button>
              </span>
            </small>
            <div className="mt-2">
              <button className="btn btn-sm btn-primary me-1" onClick={handleDecreaseQuantity}>-</button>
              <button className="btn btn-sm btn-primary ms-1" onClick={handleIncreaseQuantity}>+</button>
              <p className="mx-2">Libros para Agregar: {cantidad}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardsBooks;
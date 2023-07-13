import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";

const CardsBooks = (props) => {
  const { actions, store } = useContext(Context);
  const isItemInCart = store.car.some(item => item.titulo === props.titulo);
  const isItemInFavorites = store.favorite.some(favoriteItem => favoriteItem.titulo === props.titulo);
  const [cantidad, setCantidad] = useState(1);

  const handleAddToFavorites = () => {
    actions.añadirFavoritos(props);
  };

  const handleAddToCart = () => {
    actions.añadirCarrito(props.id, props.titulo, props.precio, cantidad); // Pasamos el ID y la cantidad seleccionada
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
        <img src={rigoImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Titulo: {props.titulo}</h5>
          <p className="card-text">Autor: {props.autor}</p>
          <p className="card-text">Categoría: {props.categoria}</p>
          <p className="card-text">Detalles:{props.detalle}</p>
          <p className="card-text">Precio: {props.precio}</p>
          <p className="card-text">Disponibles: {props.stock}</p>
          <button
            data-toggle="modal"
            className={`btn btn-primary ${isItemInCart ? 'disabled' : ''}`}
            type="button"
            onClick={handleAddToCart}
            id="cartButton">
            Agregar al carrito
          </button>

          <div className="card-footer">
            <small className="text-secondary">
              <span>{isItemInFavorites ? "Favorito" : "No favorito"}</span>
              {!isItemInFavorites && (
                <i
                  className="fa fa-heart"
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                  onClick={handleAddToFavorites}
                />
              )}
            </small>
          </div>
          <div className="card-footer">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-secondary" onClick={handleDecreaseQuantity}>
                -
              </button>
              <input type="text" className="form-control" value={cantidad} readOnly />
              <button type="button" className="btn btn-secondary" onClick={handleIncreaseQuantity}>
                +
              </button>
            </div>
          </div>
          <div className="card-footer">
            <Link to={"/detalle/" + props.id} className="btn btn-info">
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsBooks;
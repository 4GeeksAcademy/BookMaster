import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

const CardsBooks = (props) => {
  const { actions } = useContext(Context);

  return (
    <div className="card-group">
      <div className="card" style={{ maxWidth: "350px" }}>
        <img src={rigoImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Titulo: {props.titulo}</h5>
          <p className="card-text">Autor: {props.autor}</p>
          <p className="card-text">Precio: {props.precio}</p>
          <div className="card-footer">
            <small className="text-secondary">
              <span>
                <button
                  data-toggle="modal"
                  className="btn btn-light btn-lg"
                  type="button"
                  onClick={() => {
                    actions.añadirFavoritos(props.titulo);
                  }}
                >
                  <i className="grupoWish fa fa-heart fa-2x"></i>
                </button>
              </span>
              <span>
                <button
                  data-toggle="modal"
                  className="btn btn-light btn-lg"
                  type="button"
                  onClick={() => {
                    actions.añadirCarrito(props.titulo, props.precio);
                  }}
                >
                  <i className="grupoCart fa fa-shopping-cart fa-2x"></i>
                </button>
              </span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsBooks;
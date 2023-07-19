import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardsBooks from "../component/cardsBooks";
import { Context } from "../store/appContext";
import "../../styles/private.css";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    user: null,
    userAuth: false,
    loading: true
  });

  const checkUser = async (token) => {
    const checkApiUrl = process.env.BACKEND_URL + "api/private";
    const requestAuth = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch(checkApiUrl, requestAuth);
    const respJson = await response.json();
    let auth = {
      check: false,
      user: null,
      msg: ""
    };
    if (!response || !response.ok) {
      auth.msg = respJson.msg;
    } else {
      auth.check = true;
      auth.user = respJson.logged_in_as;
      auth.msg = "User successfully authenticated";
    }
    return auth;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userAuth = async () => {
      const checkIn = await checkUser(token);
      if (!checkIn.check) {
        setAuthState((prev) => ({ ...prev, loading: false }));
      } else {
        setAuthState((prev) => ({
          ...prev,
          user: checkIn.user,
          userAuth: true,
          loading: false
        }));
      }
    };
    userAuth();
  }, []);

  if (!authState.userAuth && authState.loading) {
    return <h1>... loading</h1>;
  }

  if (!authState.userAuth && !authState.loading) {
    window.alert("Login again");
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <button className="btn btn-danger btn-lg" onClick={handleLogout}>
        Cerrar Sesión
      </button>
      <div className="text-center mt-5">
        <div className="tarjetasPersonaje">
          {store.libros.map((libro, index) => (
            <CardsBooks
              key={libro.id}
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              categoria={libro.categoria}
              detalle={libro.detalle}
              precio={libro.precio}
              stock={libro.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Private;

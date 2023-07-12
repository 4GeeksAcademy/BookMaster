import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardsBooks from "../component/cardsBooks";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Private = () => {
  const { store,actions } = useContext(Context);
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

  console.log(authState);

  if (!authState.userAuth && authState.loading) {
    return <h1>... loading</h1>;
  }

  if (!authState.userAuth && !authState.loading) {
    window.alert("Login again");
    navigate("/login");
    return null; // Agregamos un return null para evitar errores de renderizado
  }

  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="text-start mt-5">
        <h3 className="text-danger">Superación</h3>
        <div className="d-flex text-center mt-5 tarjetasPersonaje">
          {store.libros.map((libro, index) => (
            <CardsBooks
              key={index + 1}
              titulo={libro.titulo}
              autor={libro.autor}
              categoria={libro.categoria}
              detalle={libro.detalle}
              precio={libro.precio}
            />
          ))}
        </div>
      </div>
      
      <button onClick={handleLogout} className="btn btn-primary">Logout</button>
    </div>
  );
};

import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/listaUsuarios.css';

export const UsersPage = () => {
  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getUsuarios();
  }, []);

  return (
    <div className="listaUsuarios">
      <h1>Usuarios Registrados</h1>
      <ul>
        {store.usuarios.map(usuario => (
          <li key={usuario.id}>
            <p>Correo Electrónico: {usuario.email}</p>
            <p>Rol: {usuario.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
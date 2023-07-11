import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/direccionesCrud.css';

export const DireccionesCrud = () => {
  const { store, actions } = useContext(Context);
  const [direcciones, setDirecciones] = useState([]);
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");

  useEffect(() => {
    // Cargar las direcciones al iniciar el componente
    actions.getDirecciones();
  }, [actions]);

  const handleAddDireccion = () => {
    const newDireccion = {
      direccion: direccion,
      ciudad: ciudad,
      pais: pais
    };
    actions.addDireccion(newDireccion)
      .then(() => {
        // Actualizar las direcciones después de agregar una nueva
        actions.getDirecciones();
      })
      .catch(error => {
        console.log("Error al agregar la dirección", error);
      });

    // Limpiar los campos de entrada
    setDireccion("");
    setCiudad("");
    setPais("");
  };

  const handleEditDireccion = (id, direccion, ciudad, pais) => {
    const updatedDireccion = {
      direccion: direccion,
      ciudad: ciudad,
      pais: pais
    };
    actions.editDireccion(id, updatedDireccion)
      .then(() => {
        // Actualizar las direcciones después de editar
        actions.getDirecciones();
      })
      .catch(error => {
        console.log("Error al editar la dirección", error);
      });
  };

  const handleDeleteDireccion = id => {
    actions.deleteDireccion(id)
      .then(() => {
        // Actualizar las direcciones después de eliminar
        actions.getDirecciones();
      })
      .catch(error => {
        console.log("Error al eliminar la dirección", error);
      });
  };

  useEffect(() => {
    // Actualizar el estado local de las direcciones cada vez que cambie la lista de direcciones en el store
    setDirecciones(store.direcciones);
  }, [store.direcciones]);

  const renderDirecciones = () => {
    return direcciones.map(direccion => (
      <tr key={direccion.id}>
        <td>{direccion.direccion}</td>
        <td>{direccion.ciudad}</td>
        <td>{direccion.pais}</td>
        <td>
          <button
            className="btn btn-sm btn-primary"
            onClick={() =>
              handleEditDireccion(
                direccion.id,
                direccion.direccion,
                direccion.ciudad,
                direccion.pais
              )
            }
          >
            Editar
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteDireccion(direccion.id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Direcciones</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{renderDirecciones()}</tbody>
      </table>
      <div>
        <h3>Agregar Dirección</h3>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
          />
        </div>
        <div>
          <label>Ciudad:</label>
          <input
            type="text"
            value={ciudad}
            onChange={e => setCiudad(e.target.value)}
          />
        </div>
        <div>
          <label>País:</label>
          <input
            type="text"
            value={pais}
            onChange={e => setPais(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddDireccion}>
          Agregar
        </button>
      </div>
      <div>
        <Link to="/">Volver</Link>
      </div>
    </div>
  );
};

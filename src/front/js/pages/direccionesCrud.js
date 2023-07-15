import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/direccionesCrud.css';

export const DireccionesCrud = () => {
  const { store, actions } = useContext(Context);
  const [direcciones, setDirecciones] = useState([]);
  const [calle, setCalle] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [editId, setEditId] = useState(null); // ID de la dirección en modo de edición

  useEffect(() => {
    // Cargar las direcciones al iniciar el componente
    actions.getDirecciones();
  }, [actions]);

  const handleAddDireccion = () => {
    actions.añadirDireccion(calle, ciudad, pais)
      .then(() => {
        // Actualizar las direcciones después de agregar una nueva
        actions.getDirecciones();
      })
      .catch(error => {
        console.log("Error al agregar la dirección", error);
      });
  
    // Limpiar los campos de entrada
    setCalle("");
    setCiudad("");
    setPais("");
  };

  const handleEditDireccion = (id, direccion) => {
    actions.editDireccion(id, direccion)
      .then(() => {
        // Actualizar las direcciones después de editar
        actions.getDirecciones();
        setEditId(null); // Salir del modo de edición
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
          {editId === direccion.id ? (
            <button
              className="btn btn-sm btn-success"
              onClick={() =>
                handleEditDireccion(direccion.id, {
                  calle: calle,
                  ciudad: ciudad,
                  pais: pais
                })
              }
            >
              Guardar
            </button>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                setEditId(direccion.id);
                setCalle(direccion.direccion);
                setCiudad(direccion.ciudad);
                setPais(direccion.pais);
              }}
            >
              Editar
            </button>
          )}
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
    <div className="direcciones-crud-container">
      <h2 className="direcciones-crud-heading">Direcciones</h2>
      <table className="direcciones-crud-table">
        <thead>
          <tr>
            <th>Calle</th>
            <th>Ciudad</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{renderDirecciones()}</tbody>
      </table>
      <div className="direcciones-crud-form">
        <h3>Agregar Dirección</h3>
        <div>
          <label>Calle:</label>
          <input
            type="text"
            value={calle}
            onChange={e => setCalle(e.target.value)}
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
      <div className="direcciones-crud-links">
        <span style={{ display: 'block' }}>
          <Link to="/">Volver</Link>
        </span>
        <span style={{ display: 'block' }}>
          <Link className="btn btn-primary" to="/checkout">Checkout</Link>
        </span>
      </div>
    </div>
  );
};
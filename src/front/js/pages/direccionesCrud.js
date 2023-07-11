import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/direccionesCrud.css';


export const DireccionesCrud = () => {
  const [direcciones, setDirecciones] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const { actions, store } = useContext(Context);
  
  useEffect(() => {
    actions.getDirecciones();
  }, []);

  const handleAddDireccion = () => {
    const newDireccion = {
      direccion: direccion,
      ciudad: ciudad,
      pais: pais
    };
    actions.addDireccion(newDireccion);
    setDireccion('');
    setCiudad('');
    setPais('');
  };

  const handleEditDireccion = (id, direccion, ciudad, pais) => {
    const updatedDireccion = {
      direccion: direccion,
      ciudad: ciudad,
      pais: pais
    };
    actions.editDireccion(id, updatedDireccion);
  };

  const handleDeleteDireccion = id => {
    actions.deleteDireccion(id);
  };

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
        <tbody>
          {renderDirecciones()}
        </tbody>
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

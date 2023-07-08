import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
    const [direcciones, setDirecciones] = useState([]);
    const [direccionInput, setDireccionInput] = useState('');

    useEffect(() => {
        obtenerDirecciones();
    }, []);

    // Función para obtener las direcciones desde el backend
    function obtenerDirecciones() {
        fetch('/direcciones')
            .then(response => response.json())
            .then(data => setDirecciones(data))
            .catch(error => console.log(error));
    }

    // Función para crear una nueva dirección
    function crearDireccion() {
        const nuevaDireccion = {
            direccion: direccionInput
        };

        fetch('/direcciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaDireccion)
        })
            .then(response => response.json())
            .then(data => {
                setDireccionInput('');
                obtenerDirecciones();
            })
            .catch(error => console.log(error));
    }

    // Función para eliminar una dirección
    function eliminarDireccion(id) {
        fetch(`/direcciones/${id}`, {
            method: 'DELETE'
        })
            .then(() => obtenerDirecciones())
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1>CRUD de Direcciones</h1>

            <div>
                {direcciones.map(direccion => (
                    <div key={direccion.id}>
                        <p>ID: {direccion.id}</p>
                        <p>Dirección: {direccion.direccion}</p>
                        <button onClick={() => eliminarDireccion(direccion.id)}>Eliminar</button>
                    </div>
                ))}
            </div>

            <form onSubmit={event => {
                event.preventDefault();
                crearDireccion();
            }}>
                <input
                    type="text"
                    value={direccionInput}
                    onChange={event => setDireccionInput(event.target.value)}
                    placeholder="Dirección"
                    required
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

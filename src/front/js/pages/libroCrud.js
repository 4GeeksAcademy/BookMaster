import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/librosCrud.css";

export function LibroCRUD() {
  const [libros, setLibros] = useState([]);
  const [imagen, setImagen] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [detalle, setDetalle] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [editando, setEditando] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const { store, actions } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoLibro = {
      imagen: imagen ? imagen : '', // Asegúrate de que imagen contenga la URL de la imagen seleccionada
      titulo,
      autor,
      categoria,
      detalle,
      precio,
      stock,
    };
  
    if (editando) {
      // Editar un libro existente
      actions
        .editLibro(libroEditando.id, nuevoLibro)
        .then(() => {
          // Actualizar la lista de libros después de editar uno
          actions.getLibros()
            .then(data => setLibros(data))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
  
      // Limpiar los campos de edición y restablecer el estado
      setImagen('');
      setTitulo('');
      setAutor('');
      setCategoria('');
      setDetalle('');
      setPrecio('');
      setStock('');
      setEditando(false);
      setLibroEditando(null);
    } else {
      // Crear un nuevo libro
      actions
        .addLibro(nuevoLibro)
        .then(() => {
          // Actualizar la lista de libros después de crear uno nuevo
          actions.getLibros()
            .then(data => setLibros(data))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
  
      // Limpiar los campos de entrada después de enviar el formulario
      setImagen('');
      setTitulo('');
      setAutor('');
      setCategoria('');
      setDetalle('');
      setPrecio('');
      setStock('');
    }
  };

  const handleDelete = (id) => {
    actions
      .deleteLibro(id)
      .then(() => {
        // Actualizar la lista de libros después de eliminar uno
        actions.getLibros()
          .then(data => setLibros(data))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='container-fluid'>
      <h1>Agregar Libro</h1>

      {/* Formulario para crear o editar un libro */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imagen:</label>
          <input type="file" value={imagen} onChange={(e) => setImagen(e.target.value)} />
        </div>
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div>
          <label>Autor:</label>
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
        </div>
        <div>
          <label>Categoría:</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        </div>
        <div>
          <label>Detalles:</label>
          <input type="text" value={detalle} onChange={(e) => setDetalle(e.target.value)} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} />
        </div>
        <button className="btn btn-primary" type="submit">{editando ? 'Guardar Cambios' : 'Crear Libro'}</button>
      </form>

      {/* Lista de libros */}
      <h2>Lista de Libros</h2>
      <ul>
        {store.libros &&
          store.libros.map((libro, index) => (
            <li key={index}>
              {libro.imagen && <img src={libro.imagen} alt="Imagen del libro" />}
              <p>Título: <strong>{libro.titulo}</strong></p>
              <p>Autor: <strong>{libro.autor}</strong></p>
              <p>Categoría: <strong>{libro.categoria}</strong></p>
              <p>Detalles: <strong>{libro.detalle}</strong></p>
              <p>Precio: <strong>{libro.precio}</strong></p>
              <p>Stock: <strong>{libro.stock}</strong></p>
              <button className="btn btn-primary" onClick={() => handleEdit(libro)}>Editar</button>
              <button className="btn btn-danger" onClick={() => handleDelete(libro.id)}>Eliminar</button>
            </li>
         ))}
      </ul>

    </div>
  );
}
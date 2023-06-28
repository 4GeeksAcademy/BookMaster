import React, { useEffect, useState } from "react";
import axios from "axios" 
import {Link} from 'react-router-dom';
  
export const ListaLibros = () => {
  
    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks();
    }, []);
  
    function getBooks() {
        axios.get('https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/listalibros').then(function(response) {
            console.log(response.data);
            setBooks(response.data);
        });
    }
     
    const deleteBook = (id) => {
        axios.delete(`https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/borrarlibro/${id}`).then(function(response){
            console.log(response.data);
            getBooks();
        });
        alert("Successfully Deleted");
    }
     
    return (
    <div>
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-12">
                    <p><Link to="/agregarlibro" className="btn btn-success">Agregar libro</Link> </p>
                    <h1>Lista de Libros</h1>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, key) =>
                                <tr key={key}>
                                    <td>{book.id}</td>
                                    <td>{book.name}</td>
                                    <td>{book.description}</td>
                                    <td>{book.price}</td>
                                    <td>
                                        <Link to={`/actualizarlibro/${book.id}`} className="btn btn-success" style={{marginRight: "10px"}}>Editar</Link>
                                        <button onClick={() => deleteBook(book.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}
import React, { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export const CrearLibro = () =>{
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.post('https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/agregarlibro', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
          
    }
     
    return (
    <div>
        <div className="container h-100">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                <h1>Crear libro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Nombre</label>
                      <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label>Descripcion</label>
                      <input type="text" className="form-control" name="descripcion" onChange={handleChange} />
                    </div>   
                    <div className="mb-3">
                      <label>Precio</label>
                      <input type="number" className="form-control" name="precio" onChange={handleChange} />
                    </div> 
                    <button type="submit" name="add" className="btn btn-primary">Guardar</button>
                </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    </div>
  );
}
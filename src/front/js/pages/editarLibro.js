import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
export const EditarLibro = () =>{
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const {id} = useParams();
  
    useEffect(() => {
        getUser();
    }, []);
  
    function getUser() {
        axios.get(`https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/actualizarlibro/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.put(`https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/actualizarlibro/${id}`, inputs).then(function(response){
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
            <h1>Editar libro</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Nombre</label>
                  <input type="text" value={inputs.name} className="form-control" name="nombre" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Descripcion</label>
                  <input type="text" value={inputs.descripcion} className="form-control" name="descripcion" onChange={handleChange} />
                </div> 
                <div className="mb-3">
                  <label>Precio</label>
                  <input type="text" value={inputs.precio} className="form-control" name="precio" onChange={handleChange} />
                </div>   
                <button type="submit" name="actualizacion" className="btn btn-primary">Guardar</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
        </div>
    </div>
  );
}
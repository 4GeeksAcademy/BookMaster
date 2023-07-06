import React, { useContext, useState } from "react";
import { Link, useNavigate, useHref } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Login = () => {
  const { store } = useContext(Context);

  const [inputVal, setInputVal] = useState({});
  const [roles, setRoles] = useState(``);
  const navigate = useNavigate();

  // control the variables email and password
  const handleChange = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.id]: e.target.value,
    });
  };

  // login into the app
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const loginUrl = process.env.BACKEND_URL + "api/login";
  
    const requestUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputVal.email,
        password: inputVal.password,
      }),
    };
  
    const resp = await fetch(loginUrl, requestUser).catch(() => false);
    if (!resp) return window.alert("There's been a problem with the request");
  
    const jsonResp = await resp.json();
    if ([400, 401, 402, 403].includes(resp.status))
      return window.alert(jsonResp.msg);
  
    if (resp.status === 201) {
      window.sessionStorage.setItem("token", jsonResp.token);
      const user = jsonResp.user; // Obtener el objeto de usuario de la respuesta
      if (user) {
        // Verificar si el usuario tiene el rol de administrador
        if (user.role === 'admin') {
          navigate("/vista-admin");
        } else {
          navigate("/");
        }
      } else {
        // Manejar el caso en que no se pueda obtener el objeto de usuario
        console.log("Error: User object is missing in the response");
      }
    }
  };
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-8">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-10 mx-auto">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">Login</h4>
                    </div>

                    <form name="login" onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                          Username
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Insert your email"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Insert your password"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-lg gradient-custom-2 m-3"
                          type="submit"
                        >
                          Login
                        </button>
                        <a className="text-muted m-3" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
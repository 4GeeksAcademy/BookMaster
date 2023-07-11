import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { PayPalButtons } from "@paypal/react-paypal-js";

export const CheckoutPage = () => {
  const [price, setPrice] = useState(0);
  const [opcion, setOpcion] = useState("5");

  useEffect(() => {
    if (opcion !== "other") {
      setPrice(parseFloat(opcion));
    }
  }, [opcion]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price.toFixed(2)
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      console.log("Detalles de pago:", details);
      handlePay();
    });
  };

  const handlePay = () => {
    console.log("El pago ha sido exitoso desde la web");
    window.location.href = "https://google.com";
  };

  const handleChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleCambio = (e) => {
    setOpcion(e.target.value);
    console.log("Valor seleccionado:", e.target.value);
  };

  return (
    <center>
      <div className="App">
        <h1>Doname {price.toFixed(2)} $</h1>

        <select value={opcion} onChange={handleCambio}>
          <option value="5">Cinco Dolares</option>
          <option value="10">Diez Dolares</option>
          <option value="20">Veinte Dolares</option>
          <option value="other">Otro Monto</option>
        </select>

        {opcion === "other" && (
          <input
            type="text"
            onChange={handleChange}
            value={price}
            style={{ margin: 20 }}
          ></input>
        )}
        <br />
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </center>
  );
};
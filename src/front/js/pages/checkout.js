import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export const CheckoutPage = () => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculatedTotal = store.car.reduce(
      (accumulator, item) => accumulator + item.precio * item.cantidad,
      0
    );
    setTotal(calculatedTotal);
  }, [store.car]);

  const handlePaymentSuccess = () => {
    console.log("El pago ha sido exitoso");
    // Realiza acciones adicionales después de que el pago sea exitoso, si es necesario
  };

  const handleCreateOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: total.toFixed(2),
              currency_code: "USD"
            }
          }
        ]
      })
      .then((order) => {
        handlePaymentSuccess();
        return order;
      });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total: ${parseFloat(total.toFixed(2))}</p>

      <PayPalScriptProvider
        options={{
          "client-id": "AXSVz6Xr4tsndjjUyI9Wijv9DDsX04yfyU9bIDx7qMewlU4eqinSO_8Z0q6Ug_1Mf9C7oEJPf_tnJY2w"
        }}
      >
        <PayPalButtons createOrder={handleCreateOrder} />
      </PayPalScriptProvider>
    </div>
  );
};
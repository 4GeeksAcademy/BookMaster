import React, { useContext, useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/checkout.css";

export const CheckoutPage = () => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedTotal = store.car.reduce(
      (accumulator, item) => accumulator + item.precio * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [store.car]);

  const handlePaymentSuccess = () => {
    console.log("El pago ha sido exitoso.");
    alert("Gracias por comprar en BookMaster");
    navigate("/private");
  };

  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: parseFloat(total.toFixed(2)),
            currency_code: "USD",
          },
        },
      ],
    });
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <p className="checkout-total">Total: ${parseFloat(total.toFixed(2))}</p>

      <PayPalScriptProvider
        options={{
          "client-id": "AXSVz6Xr4tsndjjUyI9Wijv9DDsX04yfyU9bIDx7qMewlU4eqinSO_8Z0q6Ug_1Mf9C7oEJPf_tnJY2w",
        }}
      >
        <PayPalButtons
          createOrder={handleCreateOrder}
          onSuccess={handlePaymentSuccess}
        />
      </PayPalScriptProvider>
    </div>
  );
};
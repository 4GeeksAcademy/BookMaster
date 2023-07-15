import React, { useContext, useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Context } from "../store/appContext";

export const CheckoutPage = () => {
  const { store } = useContext(Context);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const total = store.car.reduce(
      (accumulator, item) => accumulator + item.precio * item.quantity,
      0
    );
    setAmount(total);
  }, [store.car]);

  const handlePaymentSuccess = () => {
    console.log("El pago ha sido exitoso");
  };

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id": "AeMXrCdb7wQr2Uk3CQEw66pnFnoLrerDR_gKBAfonrJTFK-oWaFxTZAk26hFmw06cdF-7X_toy0o9jLG"
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      value: amount, 
                      currency_code: "USD"
                    }
                  }
                ]
              })
              .then((order) => {
                handlePaymentSuccess();
                return order;
              });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
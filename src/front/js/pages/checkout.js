import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
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
          "client-id": "AXSVz6Xr4tsndjjUyI9Wijv9DDsX04yfyU9bIDx7qMewlU4eqinSO_8Z0q6Ug_1Mf9C7oEJPf_tnJY2w"
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toFixed(2),
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
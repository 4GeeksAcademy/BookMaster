import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export const CheckoutPage = () => {
  const { store, actions } = useContext(Context);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const total = actions.calculateTotal();
    setAmount(total);
  }, []);
  
  const handlePaymentSuccess = () => {
    // Acciones adicionales después de un pago exitoso
    console.log("El pago ha sido exitoso");
    // Por ejemplo, puedes vaciar el carrito
    
  };

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id": "Ae6Qy6OiiFup5j-E95W64xbyCh8nqMwMX-EKgtZ1PI45kfH9mn8rn1pkxzbGio_MtsIRP6XYdlebPtZI"
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
              .then((orderId) => {
                // Tu código aquí después de crear la orden
                handlePaymentSuccess();
                return orderId;
              });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
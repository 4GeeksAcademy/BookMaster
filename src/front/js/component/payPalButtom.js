import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = (props) => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                value: props.totalValue,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);
      }}
    />
  );
};

export default PayPalButton;

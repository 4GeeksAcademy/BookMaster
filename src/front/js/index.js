//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


ReactDOM.render(
    <PayPalScriptProvider options={{ "client-id": "Ae6Qy6OiiFup5j-E95W64xbyCh8nqMwMX-EKgtZ1PI45kfH9mn8rn1pkxzbGio_MtsIRP6XYdlebPtZI" }}>
      <Layout />
    </PayPalScriptProvider>,
    document.getElementById("app")
  );



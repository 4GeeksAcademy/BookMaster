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
   
      <Layout />
   ,
    document.getElementById("app")
  );



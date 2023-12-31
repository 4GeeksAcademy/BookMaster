import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Signup } from "./pages/signup.js";
import { Login } from "./pages/login.js";
import { Private } from "./pages/private.js";
import {LibroCRUD } from "./pages/libroCrud.js";
import {ForgotPassword } from "./pages/forgotPassword.js";
import {AdminPage} from "./pages/adminPage.js";
import {UsersPage} from "./pages/usersPage.js";
import { Navbar } from "./component/navbar";

import { Footer } from "./component/footer";
import { CheckoutPage } from "./pages/checkout";
import {Cart} from "./pages/cart"
import BookListPage from "./pages/listaLibros";
import CartListPage from "./pages/listaCompras";
import { DireccionesCrud} from "./pages/direccionesCrud";
 

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<AdminPage />} path="/vista-admin" />
                        <Route element={<UsersPage />} path="/usuarios" />
                        <Route element={<LibroCRUD />} path="/libros" />
                        <Route element={<Cart />} path="/carrito" />
                        <Route element={<CheckoutPage />} path="/checkout" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<BookListPage />} path="/lista-libros" />
                        <Route element={<CartListPage />} path="/compras" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<DireccionesCrud />} path="/direcciones" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
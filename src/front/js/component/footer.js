import React from "react";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <p className="footer-description">
              BookMaster.com es una tienda en línea dedicada a ofrecer una amplia selección de libros de diferentes géneros y temáticas. Encuentra tu próximo libro favorito con nosotros.
            </p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-title">Contacto</h5>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-map-marker-alt"></i> Avenida Siempre Viva 742
              </li>
              <li>
                <i className="fas fa-phone"></i> +598 093 569 199
              </li>
              <li>
                <i className="fas fa-envelope"></i> info@bookmaster.com
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12">
            <h5 className="footer-title">Horario de atención</h5>
            <p className="footer-hours">
              Lunes a Viernes: 9am - 6pm
              <br />
              Sábados: 9am - 1pm
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="footer-rights">&copy; 2023 BookMaster.com. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
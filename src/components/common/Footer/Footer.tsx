// test
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="first-row">
        <div className="social-icons">
          <a href="#">
            <img
              src="./src/assets/images/facebook-icon.png"
              alt="Facebook"
              width="24"
            />
          </a>
          <a href="#">
            <img
              src="./src/assets/images/instagram-icon.png"
              alt="Instagram"
              width="24"
            />
          </a>
        </div>
        <div className="links">
          <a href="#">Términos y Condiciones</a>
          <a href="#">Política de Cookies</a>
          <a href="#">Política de Privacidad</a>
        </div>
      </div>
      <div className="social-icons mobile">
        <a href="#">
          <img
            src="./src/assets/images/facebook-icon.png"
            alt="Facebook"
            width="24"
          />
        </a>
        <a href="#">
          <img
            src="./src/assets/images/instagram-icon.png"
            alt="Instagram"
            width="24"
          />
        </a>
      </div>
      <p className="rights">&copy; Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;

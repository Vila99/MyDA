
const Footer = () => {
  return (
    <footer className={`text-center text-lg-start mt-4 py-3 bg-dark`}>
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} MiApp. Todos los derechos reservados.</p>
        <div className={`social-links`}>
          <a href="https://twitter.com">Twitter </a>
          <a href="https://facebook.com">Facebook </a>
          <a href="https://instagram.com">Instagram </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

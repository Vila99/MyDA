
const Footer = () => {
  return (
    <footer className={`text-center text-lg-start py-3 bg-dark`}>
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} MyApp - by Vila99 - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

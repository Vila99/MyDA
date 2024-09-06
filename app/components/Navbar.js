// app/components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className="nav-link active">HOME</Link>
            </li>
            <li className="nav-item">
              <Link href="/notes" className="nav-link">NOTES</Link>
            </li>
            <div className="d-none d-lg-block px-4">
                <img src='\favicon.ico' style={{width: '40px', height: '40px'}}></img>
            </div>
            <li className="nav-item">
              <Link href="/calendar" className="nav-link">TO-DO</Link>
            </li>
            <li className="nav-item">
              <Link href="/expenses" className="nav-link">CALENDAR</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

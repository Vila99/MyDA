'use client'

// app/components/Navbar.js
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item`}>
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>HOME</Link>
            </li>
            <li className={`nav-item`}>
              <Link href="/notes" className={`nav-link ${pathname === '/notes' ? 'active' : ''}`}>NOTES</Link>
            </li>
            <div className="d-none d-lg-block px-4">
              <Image
                src="/favicon.ico"
                width={40}
                height={40}
                alt="Picture of the author"
              />
            </div>
            <li className={`nav-item`}>
              <Link href="/to-do" className={`nav-link ${pathname === '/to-do' ? 'active' : ''}`}>TO-DO</Link>
            </li>
            <li className={`nav-item`}>
              <Link href="/calendar" className={`nav-link ${pathname === '/calendar' ? 'active' : ''}`}>CALENDAR</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

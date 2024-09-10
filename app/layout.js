// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa Bootstrap
import { Poppins } from 'next/font/google';     // Importa la fuente de Google Fonts
import Script from 'next/script';               // Para scripts externos
import Head from 'next/head';                   // Para manejar elementos del <head>
import './styles/globals.css';                  // Tu hoja de estilos global
import Navbar from './components/Navbar';      // Componente del Navbar
import Footer from './components/Footer';      // Componente del Footer

export const metadata = {
  title: "MYAPP",
  description: "La web de tu día a día.",
};

// Cargar la fuente Poppins de Google Fonts
const poppins = Poppins({
  weight: ['400', '700'],  // Opciones de peso de la fuente
  subsets: ['latin'],
  variable: '--font-poppins',  // Variable CSS para la fuente
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}> {/* Aplica la fuente */}
      <body>
        <Head>

        </Head>

        {/* Scripts de Bootstrap y Popper.js con lazyOnload */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js"
          strategy="lazyOnload"
        />

        <Navbar />  {/* Componente Navbar */}
        <main>{children}</main>  {/* Aquí se renderiza el contenido de las páginas */}
        <Footer />  {/* Componente Footer */}
      </body>
    </html>
  );
}

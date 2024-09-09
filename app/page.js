import React from 'react';
import FallingTitle from './components/FallingTitle';

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: 'url("/img/cover.jpg")',
    backgroundSize: 'cover', // La imagen cubrirá toda la pantalla
    backgroundPosition: 'center', // Centrará la imagen
    backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
    height: '100vh', // Ajusta el fondo a toda la altura de la pantalla
    width: '100%',
    margin:'0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={backgroundStyle}>
      <FallingTitle text="MYAPP" />
    </div>
  );
};

export default HomePage;

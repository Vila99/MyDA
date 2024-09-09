'use client'

// components/FallingTitle.js

import React from 'react';
import { motion } from 'framer-motion';

const FallingTitle = ({ text }) => {
  // Variantes para el contenedor que controlan la animación secuencial de los hijos (letras)
  const containerVariants = {
    hidden: { opacity: 1 }, // Mantén visible el contenedor
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Retraso entre la caída de cada letra
      },
    },
  };

  // Variantes para las letras individuales
  const letterVariants = {
    hidden: { y: -100, opacity: 0 }, // Letras comienzan fuera de la pantalla
    visible: { 
      y: 0, // Caen a su posición original
      opacity: 1, // Aparecen al caer
      transition: { 
        duration: 0.5, // Duración del movimiento de cada letra
        ease: "easeOut" 
      },
    },
  };

  return (
    <motion.div
      className="title-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((letter, index) => (
        <motion.span key={index} variants={letterVariants} className="letter">
          {letter === ' ' ? '\u00A0' : letter} {/* Esto maneja los espacios */}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default FallingTitle;

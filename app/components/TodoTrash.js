'use client'

// components/Trash.js
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react'; // Importa íconos para búsqueda y eliminación

export default function Trash() {
  const { setNodeRef } = useDroppable({
    id: 'trash',
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: '#ff6b6b',
        borderRadius: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        color: 'white',
        margin: '20px auto',
      }}
    >
      <Trash2 size={35} />
    </div>
  );
}
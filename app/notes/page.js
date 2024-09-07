'use client'

import { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';

const NotesPage = () => {
  // Estados para manejar las notas, estado de carga y el índice de edición
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

  // Efecto para cargar las notas desde localStorage al montar el componente
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
    setIsLoading(false); // Marca la carga como completa
  }, []);

  // Efecto para guardar las notas en localStorage cuando cambian
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  // Función para guardar una nota (nueva o actualizada)
  const handleSaveNote = (index, updatedNote) => {
    setNotes(prevNotes => {
      if (index === null) {
        return [...prevNotes, updatedNote]; // Añade nueva nota
      } else {
        return prevNotes.map((note, i) => i === index ? updatedNote : note); // Actualiza nota existente
      }
    });
    setEditingIndex(null); // Sale del modo de edición
  };

  // Función para eliminar una nota
  const handleDeleteNote = (index) => {
    setNotes(prevNotes => prevNotes.filter((_, i) => i !== index)); // Filtra la nota a eliminar
  };

  // Función para comenzar la edición de una nota
  const handleEditNote = (index) => {
    setEditingIndex(index); // Establece el índice de la nota a editar
  };

  // Función para crear una nueva nota (resetear el índice de edición)
  const handleCreateNewNote = () => {
    setEditingIndex(null); // Restablece el índice de edición
  };

  // Mostrar mensaje de carga mientras las notas se están cargando
  if (isLoading) {
    return <div>Cargando notas...</div>;
  }

  return (
    <div className="container vh-100 mt-5 pt-5">
      <h1>Mis Notas</h1>
      <NoteList
        notes={notes}
        onSaveNote={handleSaveNote}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
        onCreateNewNote={handleCreateNewNote}
        editingIndex={editingIndex}
      />
    </div>
  );
};

export default NotesPage;

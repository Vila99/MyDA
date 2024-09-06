'use client'

import { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';
import { useRouter } from 'next/router';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  const handleSaveNote = (index, updatedNote) => {
    setNotes(prevNotes => {
      if (index === null) {
        return [...prevNotes, updatedNote];
      } else {
        return prevNotes.map((note, i) => i === index ? updatedNote : note);
      }
    });
    setEditingIndex(null);
  };

  const handleDeleteNote = (index) => {
    setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
  };

  const handleEditNote = (index) => {
    setEditingIndex(index);
  };

  const handleCreateNewNote = () => {
    setEditingIndex(null);
  };

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
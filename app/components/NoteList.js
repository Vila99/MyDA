'use client'

import { useState, useEffect } from 'react';
import { Search, Trash2 } from 'lucide-react';

const NoteList = ({ notes, onSaveNote, onDeleteNote, onEditNote, onCreateNewNote, editingIndex }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [viewingIndex, setViewingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (editingIndex !== null && notes[editingIndex]) {
      const noteToEdit = notes[editingIndex];
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setShowForm(true);
      setViewingIndex(null);
    } else if (editingIndex === null) {
      setTitle('');
      setContent('');
      setShowForm(false);
    }
  }, [editingIndex, notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const updatedNote = { title, content };
      onSaveNote(editingIndex, updatedNote);
      setTitle('');
      setContent('');
      setShowForm(false);
    }
  };

  const handleViewNote = (index) => {
    if (viewingIndex === index) {
      setViewingIndex(null);
    } else {
      setViewingIndex(index);
      onEditNote(null);
      setShowForm(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex" style={{ maxHeight: '600px' }}>
      <div className="w-25 bg-dark p-2 rounded" style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
        <div className="mb-3 position-relative">
          <input
            type="text"
            placeholder="Buscar notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control pe-5"
          />
          <Search className="position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }} size={20} />
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {filteredNotes.length === 0 ? (
            <p className='text-secondary px-2'>No hay notas que coincidan con la búsqueda.</p>
          ) : (
            <ul className="list-group">
              {filteredNotes.map((note, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => handleViewNote(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="text-truncate">
                    <strong>{note.title}</strong>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            setTitle('');
            setContent('');
            setShowForm(true);
            setViewingIndex(null);
            onCreateNewNote();
          }}
        >
          Crear Nueva Nota
        </button>
      </div>

      <div className="w-75">
        {showForm ? (
          <form onSubmit={handleSubmit} className="">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control mb-2"
              required
            />
            <textarea
              placeholder="Contenido de la nota"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control mb-2"
              rows="4"
              required
            />
            <button type="submit" className="btn btn-primary">
              {editingIndex !== null ? 'Guardar Cambios' : 'Añadir Nota'}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => {
              setTitle('');
              setContent('');
              setShowForm(false);
              onCreateNewNote();
            }}>
              Cancelar
            </button>
          </form>
        ) : viewingIndex !== null && notes[viewingIndex] ? (
          <div className=" p-4 border rounded shadow-sm bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h2 className="mb-0">{notes[viewingIndex].title}</h2>
              <div>
                <button 
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEditNote(viewingIndex)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
                      onDeleteNote(viewingIndex);
                      setViewingIndex(null);
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>{notes[viewingIndex].content}</p>
          </div>
        ) : (
          <p className="my-3 text-center">Selecciona una nota para ver o editar, o crea una nueva nota.</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
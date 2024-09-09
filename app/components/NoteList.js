'use client'

import { useState, useEffect } from 'react';
import { Search, Trash2 } from 'lucide-react'; // Importa íconos para búsqueda y eliminación

const NoteList = ({ notes, onSaveNote, onDeleteNote, onEditNote, onCreateNewNote, editingIndex }) => {
  // Estados locales para manejar título, contenido, visibilidad del formulario, nota actual y búsqueda
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [viewingIndex, setViewingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Efecto para actualizar el formulario cuando se edita una nota o cambian las notas
  useEffect(() => {
    if (editingIndex !== null && notes[editingIndex]) {
      const noteToEdit = notes[editingIndex];
      setTitle(noteToEdit.title); // Carga el título de la nota a editar
      setContent(noteToEdit.content); // Carga el contenido de la nota a editar
      setShowForm(true); // Muestra el formulario
      setViewingIndex(null); // Oculta la nota visualizada
    } else if (editingIndex === null) {
      setTitle(''); // Limpia el título
      setContent(''); // Limpia el contenido
      setShowForm(false); // Oculta el formulario
    }
  }, [editingIndex, notes]);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (title && content) { // Verifica que haya título y contenido
      const updatedNote = { title, content }; // Crea una nota actualizada
      onSaveNote(editingIndex, updatedNote); // Llama a la función de guardado
      setTitle(''); // Limpia el título
      setContent(''); // Limpia el contenido
      setShowForm(false); // Oculta el formulario
    }
  };

  // Función para alternar la visualización de una nota
  const handleViewNote = (index) => {
    if (viewingIndex === index) {
      setViewingIndex(null); // Oculta la nota si ya está visible
    } else {
      setViewingIndex(index); // Muestra la nota seleccionada
      onEditNote(null); // Sale del modo de edición
      setShowForm(false); // Oculta el formulario
    }
  };

  // Filtra las notas basadas en el término de búsqueda
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-column flex-md-row" style={{ maxHeight: '100vh' }}>
      {/* Sidebar (Lista de Notas) */}
      <div className="bg-dark p-2 rounded mb-3 mb-md-0 col-12 col-md-3 d-flex flex-column" style={{ maxWidth: '100%', overflowY: 'auto' }}>
        {/* Barra de búsqueda */}
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
        {/* Lista de notas */}
        <div className="flex-grow-1 notesidebar-container rounded" style={{ overflowY: 'auto' }}>
          {filteredNotes.length === 0 ? (
            <p className='text-secondary px-2'>No hay notas que coincidan con la búsqueda.</p>
          ) : (
            <ul className="list-group">
              {filteredNotes.map((note, index) => (
                <li
                  key={index}
                  // Contemplar poner un padding Y para separar las notas
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
        {/* Botón de Crear Nueva Nota (debajo de la lista de notas) */}
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
  
      {/* Main Content */}
      <div className="col-12 col-md-9 d-flex flex-column">
        <div className="flex-grow-1 mx-3">
          {showForm ? (
            <form onSubmit={handleSubmit} className="p-3 bg-light rounded">
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
            <div className="p-4 border rounded shadow-sm bg-light d-flex flex-column h-100 notelist-container">
              <div className="mb-3 flex-grow-1" >
                <h2 className="mb-3">{notes[viewingIndex].title}</h2>
                <p className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>{notes[viewingIndex].content}</p>
              </div>
              {/* Botones de editar y eliminar nota */}
              <div className="d-flex flex-column flex-md-row">
                <button 
                  className="btn btn-warning btn-sm mx-2 mb-2 mb-md-0"
                  onClick={() => onEditNote(viewingIndex)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger mx-2 btn-sm"
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
                      onDeleteNote(viewingIndex);
                      setViewingIndex(null); // Oculta la nota después de eliminar
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <p className="my-3 text-center">Selecciona una nota para ver o editar, o crea una nueva nota.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteList;

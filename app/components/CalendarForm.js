'use client'

import React, { useState, useEffect } from 'react';

const EventForm = ({ event, onSave, onClose, onDelete }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#3174ad');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setStart(event.start ? event.start.toISOString().substr(0, 16) : '');
      setEnd(event.end ? event.end.toISOString().substr(0, 16) : '');
      setCategory(event.category || '');
      setColor(event.color || '#3174ad');
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      start: new Date(start),
      end: new Date(end),
      category,
      color
    });
  };

  return (
    <div className="event-form-overlay">
      <div className="event-form">
        <h2>{event ? 'Editar Evento' : 'Nuevo Evento'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Sin categoría</option>
            <option value="trabajo">Trabajo</option>
            <option value="personal">Personal</option>
            <option value="importante">Importante</option>
          </select>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
          {event && (
            <button type="button" onClick={onDelete} className="delete-button">
              Eliminar Evento
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventForm;
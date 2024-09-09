'use client'

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import EventForm from './CalendarForm';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents
      ? JSON.parse(savedEvents).map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }))
      : [];
  });
  
  const [view, setView] = useState(Views.MONTH);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({ start, end });
    setShowEventForm(true);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent && events.includes(selectedEvent)) {
      setEvents(events.map(e => e === selectedEvent ? eventData : e));
    } else {
      setEvents([...events, eventData]);
    }
    setShowEventForm(false);
    setSelectedEvent(null);
    scheduleNotification(eventData);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(e => e !== selectedEvent));
      setShowEventForm(false);
      setSelectedEvent(null);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        display: 'block'
      }
    };
  };

  const dayPropGetter = (date) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return {
        style: {
          backgroundColor: '#f0f0f0',
        }
      };
    }
    return {};
  };

  const scheduleNotification = (event) => {
    if (!("Notification" in window)) {
      alert("Este navegador no soporta notificaciones de escritorio");
    } else if (Notification.permission === "granted") {
      setTimeout(() => {
        new Notification(event.title, {
          body: `Evento en 5 minutos: ${event.title}`,
        });
      }, event.start.getTime() - Date.now() - 5 * 60 * 1000);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          scheduleNotification(event);
        }
      });
    }
  };

  return (
    <div className='m-5 vh-100' style={{ height: '' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventSelect}
        selectable
        view={view}
        onView={handleViewChange}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        formats={{
          weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd', culture),
        }}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda"
        }}
        popup
        tooltipAccessor={event => event.title}
      />
      {showEventForm && (
        <EventForm
          event={selectedEvent}
          onSave={handleSaveEvent}
          onClose={() => {
            setShowEventForm(false);
            setSelectedEvent(null);
          }}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default MyCalendar;
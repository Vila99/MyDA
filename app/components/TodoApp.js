'use client'

// components/ToDoApp.js
import React, { useState, useEffect } from "react";
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TaskList from "./TodoList";
import TaskItem from "./TodoItem";
import Trash from "./TodoTrash";

export default function ToDoApp() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : { pending: [], inProgress: [], completed: [] };
  });
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (over.id === 'trash') {
      // Eliminar la tarea
      setTasks((prev) => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach((key) => {
          newTasks[key] = newTasks[key].filter((task) => task.id !== active.id);
        });
        return newTasks;
      });
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    
    if (activeContainer !== overContainer) {
      setTasks((prev) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || prev[overContainer].length;

        return {
          ...prev,
          [activeContainer]: [
            ...prev[activeContainer].filter((item) => item.id !== active.id),
          ],
          [overContainer]: [
            ...prev[overContainer].slice(0, overIndex),
            tasks[activeContainer][activeIndex],
            ...prev[overContainer].slice(overIndex),
          ],
        };
      });
    } else {
      setTasks((prev) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current.sortable.index;

        return {
          ...prev,
          [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
        };
      });
    }
  };

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      pending: [...prevTasks.pending, newTask],
    }));
  };

  const findTask = (id) => {
    const container = Object.keys(tasks).find((key) => 
      tasks[key].some((task) => task.id === id)
    );
    return container ? tasks[container].find((task) => task.id === id) : null;
  };

  return (
    <>
      <input
        className="my-3 ms-2 rounded border"
        type="text"
        placeholder="Escribe una tarea..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value) {
            addTask(e.target.value);
            e.target.value = "";
          }
        }}
      />

      <p className="text-secondary ms-2">Arrastra las tareas entre cajas y ordenalas a tu gusto!</p>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TaskList
            id="pending"
            tasks={tasks.pending}
            title="Pendientes"
          />
          <TaskList
            id="inProgress"
            tasks={tasks.inProgress}
            title="En Progreso"
          />
          <TaskList
            id="completed"
            tasks={tasks.completed}
            title="Completadas"
          />
        </div>
        <Trash />
        <DragOverlay>
          {activeId ? <TaskItem id={activeId} task={findTask(activeId)} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
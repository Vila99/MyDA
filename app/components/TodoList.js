'use client'

// components/TodoList.js
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskItem from "./TodoItem";

export default function TaskList({ id, tasks, title, onDelete }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div style={{ width: "30%", margin: "0 10px" }}>
      <h2>{title}</h2>
      <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
        <ul
          ref={setNodeRef}
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
            minHeight: "200px",
            listStyle: "none",
          }}
        >
          {tasks.map((task) => (
            <TaskItem key={task.id} id={task.id} task={task} onDelete={onDelete} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}
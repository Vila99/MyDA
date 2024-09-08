'use client'

// components/TodoItem.js
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ id, task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#fff",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <li className="fw-" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{task.text}</span>
    </li>
  );
}
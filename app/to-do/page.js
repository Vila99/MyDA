"use client";

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const DynamicToDoApp = dynamic(() => import('../components/TodoApp'), { ssr: false });

export default function ToDoPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="vh-100" style={{ padding: "20px" }}>
      <h1>To-Do List</h1>
      {isClient && <DynamicToDoApp />}
    </div>
  );
}
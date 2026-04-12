"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { create } from "zustand";

export interface Todo {
    id: string;
    title: string;
}
export interface TodoZustandState {
    todos: Todo[];
    todo: Todo;
    setTodo: (todo: Todo) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
}

export const useZustandTodo = create<TodoZustandState>((set) => ({
    todos: [ 
            { id: "1", title: "Learn React" }, 
            { id: "2", title: "Learn Node" }],
    todo: { id: "-1", title: "Learn Mongo" },
    setTodo: (todo) => set({ todo }),
    addTodo: (todo) => set((state) => ({ 
        todos: [...state.todos, {...todo, id: Date.now().toString()}],
        todo: { id: "-1", title: "" }
    })),
    updateTodo: (todo) => set((state) => ({
        todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    })),
    deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
    })),
}));






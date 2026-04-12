"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Todo {
    id: string;
    title: string;
}
export interface TodoContextState {
    todos: Todo[];
    todo: Todo;
    setTodo: (todo: Todo) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
}

export const TodoContext = createContext<TodoContextState | undefined>(undefined

);

export const useTodo = () => {
    const context = useContext(TodoContext);
    return context;
};




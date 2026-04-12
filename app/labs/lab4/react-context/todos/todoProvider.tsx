
"use client";
import React, { useState, ReactNode } from "react";
import { TodoContext, Todo, TodoContextState } from "./todosContext";

export const TodoProvider = ({children} : {children: ReactNode}) => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: "1", title: "Learn React"},
        { id: "2", title: "Learn Node"},
    ]);

    const [todo, setTodo] = useState<Todo>({ id: "-1", title: "Learn Mongo" });


    const addTodo = (todo: Todo) => {
        setTodos([...todos, { ...todo, id: new Date().getTime().toString() }]);
        setTodo({ id: "-1", title: "" });
    };

    const updateTodo = (todo: Todo) => {
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        setTodo({ id: "-1", title: "" });
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    const value: TodoContextState = { 
        todos, 
        todo, 
        setTodo, 
        addTodo, 
        updateTodo, 
        deleteTodo 
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
    };
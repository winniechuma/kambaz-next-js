"use client";
import { CounterProvider } from "./counter/context";
import CounterContext from "./counter";
import ReactContextTodoList from "./todos/ReactContextTodoList";
import { TodoProvider } from "./todos/todoProvider";

export default function ReactContextExamples() {
 return (
   <div>
     <h1>React Context Examples</h1>
     <CounterProvider>
       <CounterContext />
     </CounterProvider>
     <TodoProvider>
       <ReactContextTodoList />
     </TodoProvider>
   </div>
 );
}

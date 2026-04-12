"use client";
import { ListGroupItem } from "react-bootstrap";
import { useZustandTodo } from "./useTodoStore";
export default function ZustandCounter() {
 const { todo, todos, setTodo, addTodo, updateTodo, deleteTodo } = useZustandTodo(
   (state) => state,
 );


 return (
   <div>
     <h2>Zustand Todo List</h2>
     <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <button onClick={() => updateTodo(todo)}>Update</button>
      <button onClick={() => addTodo(todo)}>
       Add
     </button>
     <ul>
       {todos.map((todo) => (
         <ListGroupItem key={todo.id}>
           {todo.title}
           <button onClick={() => setTodo(todo)}>Edit</button>
           <button onClick={() => deleteTodo(todo.id)}>Delete</button>
         </ListGroupItem>
       ))}
     </ul>
     
   </div>
 );
}



// "use client";

// import { ListGroupItem } from "react-bootstrap";
// import { useTodo } from "./todosContext";

// export default function ReactContextTodoList() {
//   const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } = useTodo()!;

//   return (
//     <div id="wd-react-context-todo-list">
//       <h2>Todo List (React Context)</h2>

//       {/* Form */}
//       <input
//         value={todo.title}
//         onChange={(e) => setTodo({ ...todo, title: e.target.value })}
//       />
//       <button onClick={() => addTodo(todo)}>Add</button>
//       <button onClick={() => updateTodo(todo)}>Update</button>

//       {/* List */}
//       <ListGroupItem>
//         {todos.map((t) => (
//           <ListGroupItem key={t.id}>
//             {t.title}
//             <button onClick={() => setTodo(t)}>Edit</button>
//             <button onClick={() => deleteTodo(t.id)}>Delete</button>
//           </ListGroupItem>
//         ))}
//       </ListGroupItem>
//       <hr />
//     </div>
//   );
// }
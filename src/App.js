import TodoList from "./components/TodoList";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TodosContext } from "./components/context/todosContext";

const initialToDo = [
  {
    id: uuidv4(),
    title: "read a book",
    details: "clean Code",
    isComplete: true,
  },
  {
    id: uuidv4(),
    title: "Practice problem solve",
    details: "leet code",
    isComplete: true,
  },
  {
    id: uuidv4(),
    title: "learn Data structure",
    details: "toturial",
    isComplete: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialToDo);
  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
      }}
    >
      <div className="App">
        <TodoList />
      </div>
    </TodosContext.Provider>
  );
}

export default App;

import React from "react";
import { Todo } from "./components/Todo";
import { TodosContext } from "./main";

function App() {
  const todosActor = TodosContext.useActorRef();
  const todos = TodosContext.useSelector((state) => state.context.todos);
  const [newTodo, setNewTodo] = React.useState("");

  const handleAdd = () => {
    if (!newTodo) {
      return;
    }
    todosActor.send({ type: "Add todo", todo: newTodo });
    setNewTodo("");
  };

  return (
    <div>
      <input
        value={newTodo}
        type="text"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <ul>
        {todos.map((item, i) => (
          <Todo key={item} todo={item} index={i} />
        ))}
      </ul>
      <button onClick={handleAdd}>Add todo</button>
    </div>
  );
}

export default App;

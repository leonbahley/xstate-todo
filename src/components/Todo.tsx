import React from "react";
import { TodosContext } from "../main";

interface IProps {
  todo: string;
  index: number;
}

export const Todo: React.FC<IProps> = (props) => {
  const currentState = TodosContext.useSelector((state) => state.value);
  const updatingTodoIndex = TodosContext.useSelector(
    (state) => state.context.updatingTodoIndex
  );
  const todosActor = TodosContext.useActorRef();
  const [todoText, setTodoText] = React.useState("");

  const handleUpdate = () => {
    if (currentState === "updating") {
      todosActor.send({
        type: "Update todo",
        todo: { todo: todoText, index: props.index },
      });
      setTodoText("");
      return;
    }
    todosActor.send({ type: "Start update", updatingTodoIndex: props.index });
  };

  return (
    <div>
      {}
      <p>{props.todo}</p>
      <button
        onClick={() =>
          todosActor.send({ type: "Delete todo", todo: props.todo })
        }
      >
        Delete
      </button>
      {currentState === "updating" && updatingTodoIndex === props.index && (
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
      )}
      <button onClick={handleUpdate}>
        {currentState === "updating" && updatingTodoIndex === props.index
          ? "Change name"
          : "Update"}
      </button>
    </div>
  );
};

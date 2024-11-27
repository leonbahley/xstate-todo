import { createRoot } from "react-dom/client";
import { createActorContext } from "@xstate/react";
import App from "./App.tsx";
import { todoMachine } from "./machines/todoMachines.ts";

export const TodosContext = createActorContext(todoMachine);

createRoot(document.getElementById("root")!).render(
  <TodosContext.Provider>
    <App />
  </TodosContext.Provider>
);

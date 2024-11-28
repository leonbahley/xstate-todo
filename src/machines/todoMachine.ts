import { assign, setup, assertEvent } from "xstate";

export const todoMachine = setup({
  types: {
    context: {} as { todos: string[]; updatingTodoIndex: number | undefined },
    events: {} as
      | { type: "Add todo"; todo: string }
      | { type: "Delete todo"; todo: string }
      | { type: "Start update"; updatingTodoIndex: number }
      | { type: "Update todo"; todo: { index: number; todo: string } },
  },
  actions: {
    addTodo: assign({
      todos: ({ context, event }) => {
        assertEvent(event, "Add todo");
        return [...context.todos, event.todo];
      },
    }),
    deleteTodo: assign({
      todos: ({ context, event }) => {
        assertEvent(event, "Delete todo");
        return context.todos.filter((item) => item !== event.todo);
      },
    }),
    updateTodo: assign({
      todos: ({ context, event }) => {
        assertEvent(event, "Update todo");
        return context.todos.map((item, i) => {
          if (i === event.todo.index) {
            return event.todo.todo;
          }
          return item;
        });
      },
    }),
    setUpdatingTodoIndex: assign({
      updatingTodoIndex: ({ event }) => {
        assertEvent(event, "Start update");
        return event.updatingTodoIndex;
      },
    }),
  },
  guards: {
    isValidAdd: ({ context, event }) => {
      assertEvent(event, "Add todo");
      const isItemInArray = context.todos.includes(event.todo);
      if (isItemInArray) {
        alert("Item present");
      }
      return !isItemInArray;
    },
    isValidUpdate: ({ context, event }) => {
      assertEvent(event, "Update todo");
      const isItemInArray = context.todos.includes(event.todo.todo);
      if (isItemInArray) {
        alert("Item present");
      }
      return !isItemInArray;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUDoCWEA2YAxAIIQQAEaGA2gAwC6ioADqrNstqgHZMgAeiAEy1amAByiA7FPEBWSQBY5AZgBsAGhABPRAFoAjEMyqjyg+ICcBqbXUqAvg61UsuAoQAiYAsjCV0VDpGJBBWdk4ePkEEQyEDTANaOUU1cSk5LV1YoRUJS1o1EQtrW3snZxBudDg+Vz5wji5eUJjDNUtE5NT0zJ19A0HMFQKi2hKbOzUnF0CcfDAGtiao1sRJTCKk6yNk2ilFLMRFA061NSlLDJtxERTFCocgA */
  id: "todo",
  initial: "idle",
  context: {
    todos: [],
    updatingTodoIndex: undefined,
  },
  states: {
    idle: {
      on: {
        "Add todo": {
          guard: "isValidAdd",
          actions: "addTodo",
        },
        "Delete todo": {
          actions: "deleteTodo",
        },
        "Start update": {
          target: "updating",
          actions: "setUpdatingTodoIndex",
        },
      },
    },
    updating: {
      on: {
        "Update todo": {
          guard: "isValidUpdate",
          actions: "updateTodo",
          target: "idle",
        },
      },
    },
  },
});

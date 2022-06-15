import { types } from "mobx-state-tree";

export type ToDosType = {
  work: ToDoItemType[];
  travel: ToDoItemType[];
};

export type ToDoItemType = {
  id: number;
  userInput: string;
  isDone: boolean;
};

const ToDoItem = types.model("ToDoItem", {
  id: types.number,
  userInput: types.string,
  isDone: types.boolean,
});

const ToDos = types
  .model("ToDos", {
    work: types.array(ToDoItem),
    travel: types.array(ToDoItem),
  })
  .actions((self) => {
    return {
      addToDo(currentTap, userInput) {
        self[currentTap].push(userInput);
      },
      deleteToDo(currentTap, id) {
        const filteredData = self[currentTap].filter((key) => key !== id);
        return filteredData;
      },
    };
  });

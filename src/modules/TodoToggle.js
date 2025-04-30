// modules/TodoToggle.js
export function toggleCompleted(index, todos, saveTodos) {
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
  }
  
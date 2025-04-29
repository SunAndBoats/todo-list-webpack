const STORAGE_KEY = 'todo-list';

export function loadTodos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function addTodo(todo) {
  const todos = loadTodos();
  todos.push(todo);
  saveTodos(todos);
}

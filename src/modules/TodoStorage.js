// src/modules/TodoStorage.js

const loadTodos = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export { loadTodos, saveTodos };  // Exportación nombrada de las funciones

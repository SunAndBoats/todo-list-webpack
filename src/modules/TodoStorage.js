// src/modules/TodoStorage.js

function loadTodos() {
    try {
      const data = localStorage.getItem('todos');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error al cargar los todos:', error);
      return [];
    }
  }
  
  function saveTodos(todos) {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error al guardar los todos:', error);
    }
  }
  
  const storage = {
    load: loadTodos,
    save: saveTodos
  };
  
  export default storage;
  
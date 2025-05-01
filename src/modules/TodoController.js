// src/modules/TodoController.js

import Todo from './Todo.js';
import { renderTodos } from './TodoView.js'; // Importamos la función por su nombre
import { loadTodos, saveTodos } from './TodoStorage.js'; // Exportación nombrada de storage

export const TodoController = (() => {
  let todos = loadTodos().map(t => new Todo(t.text, t.completed, t.id));


  let hideCompleted = false;

  const render = () => {
    const filteredTodos = hideCompleted
      ? todos.filter(todo => !todo.completed)
      : todos;

      renderTodos(filteredTodos, {
        onEdit: (id, newText) => {
          const todo = todos.find(t => t.id === id);
          if (todo) {
            todo.text = newText;
            saveTodos(todos);
          }
        },
        onDelete: (id) => {
          todos = todos.filter(t => t.id !== id);
          saveTodos(todos);
          render();
        },
        onToggle: (id) => {
          const todo = todos.find(t => t.id === id);
          if (todo) {
            todo.completed = !todo.completed;
            saveTodos(todos);
            render();
          }
        }
      });
      
  };

  const init = () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const toggleBtn = document.getElementById('toggle-completed');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text !== '') {
        todos.push(new Todo(text));
        saveTodos(todos); // Usamos saveTodos
        input.value = '';
        render();
      }
    });

    toggleBtn.addEventListener('click', () => {
      hideCompleted = !hideCompleted;
      toggleBtn.textContent = hideCompleted ? 'Mostrar completados' : 'Ocultar completados';
      render();
    });

    render();
  };

  return { init };
})();

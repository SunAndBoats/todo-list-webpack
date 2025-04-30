// src/modules/TodoController.js
import Todo from './Todo.js';
import TodoView from './TodoView.js';
import storage from './TodoStorage.js';

const TodoController = (() => {
  let todos = storage.load();
  let hideCompleted = false; // NEW: estado para ocultar completados

  const render = () => {
    // Si está activo hideCompleted, filtramos
    const filteredTodos = hideCompleted
      ? todos.filter(todo => !todo.completed)
      : todos;

    TodoView.render(filteredTodos, {
      onEdit: (index, newText) => {
        // OJO: usar el índice real en `todos`, no en `filteredTodos`
        const realIndex = todos.findIndex(t => t === filteredTodos[index]);
        if (realIndex !== -1) {
          todos[realIndex].text = newText;
          storage.save(todos);
        }
      },
      onDelete: (index) => {
        const realIndex = todos.findIndex(t => t === filteredTodos[index]);
        if (realIndex !== -1) {
          todos.splice(realIndex, 1);
          storage.save(todos);
          render();
        }
      },
      onToggle: (index) => {
        const realIndex = todos.findIndex(t => t === filteredTodos[index]);
        if (realIndex !== -1) {
          todos[realIndex].completed = !todos[realIndex].completed;
          storage.save(todos);
          render();
        }
      }
    });
  };

  const init = () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const toggleBtn = document.getElementById('toggle-completed'); // Botón de ocultar completados

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text !== '') {
        todos.push(new Todo(text));
        storage.save(todos);
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

export default TodoController;

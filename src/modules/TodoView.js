// src/modules/TodoView.js
import { createElement } from './domHelpers.js';

function renderTodos(todos, { onEdit, onDelete, onToggle }) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const div = createElement('div', {
      className: 'todo-item' + (todo.completed ? ' completed' : ''),
    });

    const checkbox = createElement('input', {
      type: 'checkbox',
      checked: todo.completed,
      onchange: () => onToggle(index),
    });

    const span = createElement('span', {
      className: 'todo-text',
      textContent: todo.text,
      onclick: () => {
        const newText = prompt('Editar tarea:', todo.text);
        if (newText !== null && newText.trim() !== '') {
          onEdit(index, newText.trim());
        }
      },
    });

    const del = createElement('button', {
      textContent: 'Eliminar',
      onclick: () => onDelete(index),
    });

    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(del);
    list.appendChild(div);
  });
}

const TodoView = {
  render: renderTodos
};

export default TodoView;

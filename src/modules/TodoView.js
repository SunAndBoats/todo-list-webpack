// src/modules/TodoView.js
import { createElement } from './domHelpers.js';

export function renderTodos(todos, { onEdit, onDelete, onToggle }) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach((todo) => {
    const div = createElement('div', {
      className: 'todo-item' + (todo.completed ? ' completed' : ''),
    });

    const checkbox = createElement('input', {
      type: 'checkbox',
      checked: todo.completed,
      onchange: () => onToggle(todo.id),
    });

    const span = createElement('span', {
      className: 'todo-text',
      textContent: todo.text,
      onclick: () => {
        const newText = prompt('Editar tarea:', todo.text);
        if (newText !== null && newText.trim() !== '') {
          onEdit(todo.id, newText.trim());
        }
      },
    });

    const del = createElement('button', {
      textContent: 'Eliminar',
      onclick: () => onDelete(todo.id),
    });

    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(del);
    list.appendChild(div);
  });
}

// src/index.js
import './style.css';
import { loadTodos, saveTodos } from './todo';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = loadTodos();

function render() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const div = document.createElement('div');
    div.className = 'todo-item';

    // NEW: Creamos un <span> editable en lugar de hacer todo el div contentEditable
    const span = document.createElement('span');
    span.contentEditable = true;
    span.textContent = todo;
    span.addEventListener('blur', () => {
      todos[index] = span.textContent;
      saveTodos(todos);
    });
    // END NEW

    // NEW: Botón de eliminar con ✖
    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = '✖';
    del.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos(todos);
      render();
    });
    // END NEW

    div.appendChild(span);
    div.appendChild(del);
    list.appendChild(div);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim() !== '') {
    todos.push(input.value.trim());
    input.value = '';
    saveTodos(todos);
    render();
  }
});

render();

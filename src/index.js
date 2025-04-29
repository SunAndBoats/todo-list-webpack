import './style.css';
import { loadTodos, addTodo, saveTodos } from './todo';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = loadTodos();

function render() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.contentEditable = true;
    div.textContent = todo;
    div.addEventListener('blur', () => {
      todos[index] = div.textContent;
      saveTodos(todos);
    });
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


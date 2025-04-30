// src/modules/TodoView.js
import { createElement } from './domHelpers.js';

export default class TodoView {
  constructor(listContainer, inputElement, formElement) {
    this.listContainer = listContainer;
    this.inputElement = inputElement;
    this.formElement = formElement;
  }

  bindAdd(handler) {
    this.formElement.addEventListener('submit', e => {
      e.preventDefault();
      if (this.inputElement.value.trim()) {
        handler(this.inputElement.value.trim());
        this.inputElement.value = '';
      }
    });
  }

  bindEdit(handler) {
    this.listContainer.addEventListener('blur', e => {
      if (e.target.classList.contains('todo-text')) {
        const index = e.target.closest('.todo-item').dataset.index;
        handler(index, e.target.textContent);
      }
    }, true);
  }

  bindDelete(handler) {
    this.listContainer.addEventListener('click', e => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.closest('.todo-item').dataset.index;
        handler(index);
      }
    });
  }

  render(todos) {
    this.listContainer.innerHTML = '';
    todos.forEach((todo, i) => {
      const item = createElement('div', 'todo-item', null, { 'data-index': i });
      const span = createElement('span', 'todo-text');
      span.contentEditable = true;
      span.textContent = todo.text;

      const del = createElement('button', 'delete-btn');
      del.textContent = '✖';

      item.appendChild(span);
      item.appendChild(del);
      this.listContainer.appendChild(item);
    });
  }
}

// src/modules/TodoStorage.js
const STORAGE_KEY = 'todos';

export default class TodoStorage {
  static load() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return data.map(text => new Todo(text));
  }

  static save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.map(t => t.text)));
  }
}
import Todo from './Todo.js';

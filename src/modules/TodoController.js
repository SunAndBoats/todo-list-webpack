// src/modules/TodoController.js
import Todo from './Todo.js';
import TodoStorage from './TodoStorage.js';
import TodoView from './TodoView.js';

export default class TodoController {
  constructor() {
    this.todos = TodoStorage.load();
    this.list = document.getElementById('todo-list');
    this.input = document.getElementById('todo-input');
    this.form = document.getElementById('todo-form');
    this.view = new TodoView(this.list, this.input, this.form);
  }

  init() {
    this.view.render(this.todos);
    this.view.bindAdd(this.addTodo.bind(this));
    this.view.bindEdit(this.editTodo.bind(this));
    this.view.bindDelete(this.deleteTodo.bind(this));
  }

  addTodo(text) {
    this.todos.push(new Todo(text));
    this._update();
  }

  editTodo(index, newText) {
    this.todos[index].update(newText);
    this._update();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this._update();
  }

  _update() {
    TodoStorage.save(this.todos);
    this.view.render(this.todos);
  }
}

// src/modules/Todo.js
export default class Todo {
  constructor(text, completed = false, id = Date.now()) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  update(newText) {
    this.text = newText;
  }
}

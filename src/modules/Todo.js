// src/modules/Todo.js
export default class Todo {
  constructor(text) {
    this.text = text;
  }

  update(newText) {
    this.text = newText;
  }
}

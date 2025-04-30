import './style.css';
import TodoController from './modules/TodoController.js';

document.addEventListener('DOMContentLoaded', () => {
  const controller = new TodoController();
  controller.init();
});

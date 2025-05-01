// src/index.js

import './style.css';
import { TodoController } from './modules/TodoController.js'; // Importación nombrada

document.addEventListener('DOMContentLoaded', () => {
  TodoController.init();

});

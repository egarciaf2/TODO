//STYLES
import "./styles.css";

import { TodoList } from "./class";
import { listarTodos } from "./js/components";

export const todoList = new TodoList();
console.log( todoList );

listarTodos();



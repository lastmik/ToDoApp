import{filterAll, 
  filterActive, 
  filterCompleted, 
  addNewToDo, 
  clearCompleted, 
  toggleAll, 
  sortASC, 
  sortDESC} from './View/View.js';
  
export let mainElements = {
  input : document.querySelector("#input"),
  todoList : document.querySelector("#todo_list"),
  clearCompletedElement : document.querySelector("#clear"),
  toggleAllElement : document.querySelector("#toggle_all"),
  filters : document.querySelector(".footer"),
  asc : document.querySelector("#asc"),
  desc : document.querySelector("#desc"),
  counter : document.querySelector("#count"),
  value : ""
}
function init(){
  location.hash = "#/";
  document.querySelector("#all").addEventListener("click", filterAll);
  document.querySelector("#active").addEventListener("click", filterActive);
  document.querySelector("#completed").addEventListener("click", filterCompleted);

  mainElements.input.addEventListener("keydown", addNewToDo);
  mainElements.clearCompletedElement.addEventListener("click", clearCompleted);
  mainElements.toggleAllElement.addEventListener("click", toggleAll);
  mainElements.asc.addEventListener("click", sortASC);
  mainElements.desc.addEventListener("click", sortDESC);
}
window.onload = init;








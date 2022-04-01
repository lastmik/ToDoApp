// Modules is es6 feature
import {
  filterAll,
  filterActive,
  filterCompleted,
  addNewToDo,
  clearCompleted,
  toggleAll,
  sortASC,
  sortDESC,
} from "./View/View.js";

// TODO: Check const
// TODO: Move main elements outside from main
export let mainElements = {
  input: document.querySelector("#input"),
  todoList: document.querySelector("#todo_list"),
  // TODO: Make matched names: 
  clearCompletedElement: document.querySelector("#clear"),
  toggleAllElement: document.querySelector("#toggle_all"),
  // TODO: Make matched names: filters and .footer
  filters: document.querySelector(".footer"),
  asc: document.querySelector("#asc"),
  desc: document.querySelector("#desc"),
  counter: document.querySelector("#count"),
  value: "",
};
function init() {
  // TODO: Check if we need this, if so, provide a comment
  location.hash = "#/";
  // TODO: Check if we can move into main elements
  document.querySelector("#all").addEventListener("click", filterAll);
  document.querySelector("#active").addEventListener("click", filterActive);
  document
    .querySelector("#completed")
    .addEventListener("click", filterCompleted);

  mainElements.input.addEventListener("keydown", addNewToDo);
  mainElements.clearCompletedElement.addEventListener("click", clearCompleted);
  mainElements.toggleAllElement.addEventListener("click", toggleAll);
  mainElements.asc.addEventListener("click", sortASC);
  mainElements.desc.addEventListener("click", sortDESC);
}
window.onload = init;

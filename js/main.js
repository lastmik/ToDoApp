// Modules is es6 feature
import {
  filterAll,
  filterActive,
  filterCompleted,
  addNewToDo,
  clearCompleted,
  toggleAll,
  sortAsc,
  sortDesc,
  mainElements,
} from "./View/View.js";

function init() {
  document.querySelector("#all").addEventListener("click", filterAll);
  document.querySelector("#active").addEventListener("click", filterActive);
  document
    .querySelector("#completed")
    .addEventListener("click", filterCompleted);

  mainElements.input.addEventListener("keydown", addNewToDo);
  mainElements.clearElement.addEventListener("click", clearCompleted);
  mainElements.toggleAll.addEventListener("click", toggleAll);
  mainElements.asc.addEventListener("click", sortAsc);
  mainElements.desc.addEventListener("click", sortDesc);
}
window.onload = init;

import { counter, modelArray, InputElement } from "../Models/Data.js";
import { mainElements } from "../main.js";

export let viewInput = {
  // TODO: Check usage
  input: document.querySelector("#input"),
  createInputBlock: function (value) {
    let todoItem = document.createElement("div");
    // TODO: Check classList instead
    todoItem.setAttribute("class", "inputBlock");
    todoItem.appendChild(this.createToggle());
    todoItem.appendChild(this.createTodoInput(value));
    todoItem.appendChild(this.createDestroyButton());
    input.value = "";
    return todoItem;
  },
  createToggle: function () {
    let label = document.createElement("label");
    label.setAttribute("class", "toggle");
    label.addEventListener("click", togglesComplete);
    return label;
  },
  createDestroyButton: function () {
    // TODO: Align to the exiting convention
    // Take the business logic and element name itself
    // Take the todoInput and label as example
    let display = document.createElement("div");
    display.setAttribute("class", "display");
    let destroy = document.createElement("button");
    destroy.setAttribute("class", "destroy");
    destroy.addEventListener("click", togglesDestroy);
    display.appendChild(destroy);
    return display;
  },
  createTodoInput: function (value) {
    let todoInput = document.createElement("input");
    todoInput.setAttribute("class", "todo");
    todoInput.setAttribute("value", value);
    todoInput.addEventListener("dblclick", changeToDo);
    todoInput.addEventListener("blur", todoOnBlur);
    todoInput.readOnly = true;
    return todoInput;
  },
};

// TODO: Check and move close to the scope (private class method)
//change ToDo
function changeToDo(elem) {
  mainElements.value = elem.target.value;
  if (elem.target.readOnly) {
    // TODO: Check and try to reuse this block and todoOnBlur functionality
    elem.target.readOnly = false;
    elem.target.classList.toggle("editing");
    elem.target.nextElementSibling.classList.toggle("displayEditing");
  }
}
//event when focus was lost after changing ToDo
function todoOnBlur(elem) {
  if (!elem.target.readOnly) {
    elem.target.readOnly = true;
    elem.target.classList.toggle("editing");
    elem.target.nextElementSibling.classList.toggle("displayEditing");
  }
  if (
    !(
      // TODO: Move this validation check and reuse
      elem.target.value.trim().length >= 3 &&
      elem.target.value.trim().length <= 200
    )
  ) {
    elem.target.value = mainElements.value;
  }
}

//click event on completion ToDo
function togglesComplete(elem) {
  if (elem.target.checked) {
    counter.increment();
    mainElements.counter.textContent = counter.getCount();
    counter.decrementCompleted();
    elem.target.checked = false;
  } else {
    counter.decrement();
    mainElements.counter.textContent = counter.getCount();
    counter.incrementCompleted();
    elem.target.checked = true;
  }
  toggleDone(elem.target);
  inputDone(elem.target.nextElementSibling);

  checkFilter();
  checkCompleted();
  toggleAllCheck();
}

function toggleDone(elem) {
  elem.classList.toggle("toggle_done");
}
function inputDone(elem) {
  elem.classList.toggle("done");
}

//click event on completion of all ToDo
export function toggleAll() {
  if (counter.getCountCompleted === 0) {
    modelArray.getArray().forEach((elem) => {
      // TODO: Dont relate on the UI elements for state
      // Better approach it is patch model, and then rerender the template
      toggleDone(elem.element.firstChild);
      inputDone(elem.element.firstChild.nextElementSibling);
      elem.element.firstChild.checked = true;
      counter.incrementCompleted();
    });
    mainElements.counter.textContent = counter.resetCount();
  } else if (counter.getCount() === 0) {
    modelArray.getArray().forEach((elem) => {
      toggleDone(elem.element.firstChild);
      inputDone(elem.element.firstChild.nextElementSibling);
      elem.element.firstChild.checked = false;
      counter.increment();
    });
    mainElements.counter.textContent = counter.getCount;
    counter.resetCountCompleted();
  } else {
    modelArray.getArray().forEach((elem) => {
      if (!elem.element.firstChild.checked) {
        toggleDone(elem.element.firstChild);
        inputDone(elem.element.firstChild.nextElementSibling);
        elem.element.firstChild.checked = true;
        counter.incrementCompleted();
        counter.decrement();
      }
    });
    mainElements.counter.textContent = counter.getCount();
  }
  checkFilter();
  checkCompleted();
  toggleAllCheck();
}

function toggleAllCheck() {
  // TODO: Check toggle instead
  if (counter.getCount() === 0 && counter.getCountCompleted() > 0) {
    mainElements.toggleAllElement.classList.add("checked");
  } else {
    mainElements.toggleAllElement.classList.remove("checked");
  }
}

function checkCompleted() {
  // TODO: Check toggle instead
  if (counter.getCountCompleted() > 0)
    mainElements.clearCompletedElement.classList.remove("button_true");
  else mainElements.clearCompletedElement.classList.add("button_true");
}

//Delete all completed ToDo event
export function clearCompleted() {
  modelArray.getArray().forEach((elem) => {
    if (elem.element.firstChild.checked) {
      elem.destroy = true;
      elem.element.remove();
    }
  });
  counter.resetCountCompleted();
  checkCompleted();
  clearArray();
  checkFooter();
  toggleAllCheck();
  checkFilter();
}

//ToDo delete event
function togglesDestroy(elem) {
  modelArray.getArray().forEach((toDo) => {
    if (toDo.element === elem.target.parentNode.parentNode) {
      // TODO: Check if we need to store this flag instead of removing this record instead
      toDo.destroy = true;
    }
  });
  clearArray();
  elem.target.parentElement.parentElement.remove();
  if (!elem.target.parentElement.parentElement.firstChild.checked) {
    counter.decrement();
    mainElements.counter.textContent = counter.getCount();
  } else counter.decrementCompleted();

  checkFooter();
  toggleAllCheck();
}

function clearArray() {
  modelArray.setArray(
    modelArray.getArray().filter((elem) => elem.destroy === false)
  );
}

//Add New ToDo Event

export function addNewToDo(event) {
  if (
    event.key == "Enter" &&
    event.target.value.trim().length >= 3 &&
    event.target.value.trim().length <= 200
  ) {
    modelArray.setElement(new InputElement(input.value));
    mainElements.todoList.appendChild(
      // Move into variables
      modelArray.getArray()[modelArray.getArray().length - 1].element
    );
    counter.increment();
    mainElements.counter.textContent = counter.getCount();
  }
  checkFooter();
  checkFilter();
  toggleAllCheck();
}

function checkFilter() {
  if (location.hash === "#/active") filterActive();
  else if (location.hash === "#/completed") filterCompleted();
  else filterAll();
}

//Filter show all ToDo
// TODO: Dont wire the state dependency within template 
export function filterAll(event) {
  if (event) selectFilter(event.target);
  modelArray.getArray().forEach((elem) => {
    if (elem.element.classList.contains("noActive")) {
      elem.element.classList.remove("noActive");
    }
  });
  mainElements.counter.textContent =
    counter.getCount() + counter.getCountCompleted();
}

//Filter show all active ToDo
export function filterActive(event) {
  if (event) selectFilter(event.target);
  modelArray.getArray().forEach((elem) => {
    if (elem.element.firstChild.checked) {
      elem.element.classList.add("noActive");
    } else if (
      elem.element.classList.contains("noActive") &&
      !elem.element.firstChild.checked
    ) {
      elem.element.classList.remove("noActive");
    }
  });
  mainElements.counter.textContent = counter.getCount();
}

//Filter show all completed ToDo
export function filterCompleted(event) {
  if (event) selectFilter(event.target);
  modelArray.getArray().forEach((elem) => {
    if (!elem.element.firstChild.checked)
      elem.element.classList.add("noActive");
    else if (
      elem.element.classList.contains("noActive") &&
      elem.element.firstChild.checked
    ) {
      elem.element.classList.remove("noActive");
    }
    return elem;
  });
  mainElements.counter.textContent = counter.getCountCompleted();
}

//change the style of the selected filter
function selectFilter(target) {
  let filters = document.querySelectorAll(".filters a");
  filters.forEach((elem) => {
    if (elem === target && !elem.classList.contains("selected")) {
      elem.classList.add("selected");
    } else if (elem.classList.contains("selected")) {
      elem.classList.remove("selected");
    }
  });
}

//Sort Ascending
// TODO: Use lowerCamelCase
export function sortASC() {
  mainElements.asc.classList.add("selected");
  mainElements.desc.classList.remove("selected");
  modelArray.getArray().sort(function (a, b) {
    let valueA = a.element.firstChild.nextElementSibling.value.toLowerCase();
    let valueB = b.element.firstChild.nextElementSibling.value.toLowerCase();
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;

    return a.dateCreate - b.dateCreate;
  });
  // TODO: Check, move and reuse this functionality
  mainElements.todoList.innerHTML = "";
  modelArray.getArray().forEach((elem) => {
    mainElements.todoList.appendChild(elem.element);
  });
}

//descending sort
export function sortDESC() {
  mainElements.desc.classList.add("selected");
  mainElements.asc.classList.remove("selected");
  modelArray.getArray().sort(function (a, b) {
    let valueA = a.element.firstChild.nextElementSibling.value.toLowerCase();
    let valueB = b.element.firstChild.nextElementSibling.value.toLowerCase();
    if (valueA > valueB) return -1;
    if (valueA < valueB) return 1;

    return b.dateCreate - a.dateCreate;
  });
  mainElements.todoList.innerHTML = "";
  modelArray.getArray().forEach((elem) => {
    mainElements.todoList.appendChild(elem.element);
  });
}

function checkFooter() {
  // TODO: Remove all development only code
  console.log("check footer");
  if (counter.getCount() !== 0 || counter.getCountCompleted() !== 0)
    mainElements.filters.classList.add("visible");
  else mainElements.filters.classList.remove("visible");
}

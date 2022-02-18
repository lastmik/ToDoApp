import {counter, modelArray, InputElement} from '../Models/Data.js';
import {mainElements} from '../main.js';

export let viewInput = {
    input: document.querySelector("#input"),
    createInputBlock: function(value){
      let todoItem = document.createElement("div");
      todoItem.setAttribute("class", "imputBlock");
      todoItem.appendChild(this.createToggle());
      todoItem.appendChild(this.createTodoInput(value));
      todoItem.appendChild(this.createDestroyButton());
      input.value = "";
      return todoItem;
    },
    createToggle:function(){
      let label = document.createElement("label");
      label.setAttribute("class", "toggle");
      label.addEventListener("click", togglesComplete);
      return label;
    },
    createDestroyButton:function(){
      let display = document.createElement("div");
      display.setAttribute("class", "dispaly");
      let destroy = document.createElement("button");
      destroy.setAttribute("class", "destroy");
      destroy.addEventListener("click", togglesDestroy);
      display.appendChild(destroy);
      return display;
    },
    createTodoInput: function(value){
      let todoInput = document.createElement("input");
      todoInput.setAttribute("class", "todo");
      todoInput.setAttribute("value", value);
      todoInput.addEventListener("dblclick", changeToDo);
      todoInput.addEventListener("blur", todoOnBlur);
      todoInput.readOnly = true;
      return todoInput;
    }
  }

//change ToDo
function changeToDo(elem) {
    mainElements.value = elem.target.value;
    if (elem.target.readOnly) {
      elem.target.readOnly = false;
      elem.target.classList.toggle("editing");
      elem.target.nextElementSibling.classList.toggle("dispalyEditing");
    }
  }
  //event when focus was lost after changing ToDo
  function todoOnBlur(elem) {
    if (!elem.target.readOnly) {
      elem.target.readOnly = true;
      elem.target.classList.toggle("editing");
      elem.target.nextElementSibling.classList.toggle("dispalyEditing");
    }
    if(!(elem.target.value.trim().length >= 3 &&
    elem.target.value.trim().length <= 200)){
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
      counter.decrement()
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
      modelArray.getArray().forEach(elem=> {
        toggleDone(elem.element.firstChild);
        inputDone(elem.element.firstChild.nextElementSibling);
        elem.element.firstChild.checked = true;
        counter.incrementCompleted()
      });
      mainElements.counter.textContent = counter.resetCount();
    } else if (counter.getCount() === 0) {
      modelArray.getArray().forEach(elem=> {
        toggleDone(elem.element.firstChild);
        inputDone(elem.element.firstChild.nextElementSibling);
        elem.element.firstChild.checked = false;
        counter.increment();
      });
      mainElements.counter.textContent = counter.getCount;
      counter.resetCountCompleted();
    } else {
      modelArray.getArray().forEach(elem=> {
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
    if (counter.getCount() === 0 && counter.getCountCompleted() > 0) {
      mainElements.toggleAllElement.classList.add("checked");
    } else {
      mainElements.toggleAllElement.classList.remove("checked");
    }
  }
  
  function checkCompleted() {
    if (counter.getCountCompleted() > 0) mainElements.clearCompletedElement.classList.remove("button_true");
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
        toDo.destroy = true;
      }
    });
    clearArray();
    elem.target.parentElement.parentElement.remove();
    if (!elem.target.parentElement.parentElement.firstChild.checked){
      counter.decrement();
      mainElements.counter.textContent = counter.getCount();
    }
    else counter.decrementCompleted();
  
    checkFooter();
    toggleAllCheck();
  }
  
  function clearArray() {
    modelArray.setArray(modelArray.getArray().filter((elem) => elem.destroy === false));
  }
  
  //Add New ToDo Event
  
  export function addNewToDo(event) {
    if (
      event.key == "Enter" &&
      event.target.value.trim().length >= 3 &&
      event.target.value.trim().length <= 200
    ) {
      modelArray.setElement(new InputElement(input.value));
      mainElements.todoList
      .appendChild(modelArray.getArray()[modelArray.getArray().length - 1].element);
      counter.increment();
      mainElements.counter.textContent = counter.getCount();
    }
    checkFooter();
    checkFilter();
  }
  
  function checkFilter() {
    if (location.hash === "#/active") filterActive();
    else if (location.hash === "#/completed") filterCompleted();
    else filterAll();
  }
  
  //Filter show all ToDo
  export function filterAll(event) {
    if (event) selectFilter(event.target);
    modelArray.getArray().forEach(elem=> {
      if (elem.element.classList.contains("noactive")) {
        elem.element.classList.remove("noactive"); 
      }
    });
    mainElements.counter.textContent = counter.getCount()+counter.getCountCompleted();
  }
  
  //Filter show all active ToDo
  export function filterActive(event) {
    if (event) selectFilter(event.target);
    modelArray.getArray().forEach(elem => {
      if (elem.element.firstChild.checked) {
        elem.element.classList.add("noactive");
      } else if (elem.element.classList.contains("noactive") 
      && !elem.element.firstChild.checked) {
      elem.element.classList.remove("noactive");
    }
    });
    mainElements.counter.textContent = counter.getCount();
  }
  
  //Filter show all completed ToDo
  export function filterCompleted(event) {
    if (event) selectFilter(event.target);
    modelArray.getArray().forEach(elem => {
      if (!elem.element.firstChild.checked)
        elem.element.classList.add("noactive");
      else if (
        elem.element.classList.contains("noactive") &&
        elem.element.firstChild.checked
      ){
        elem.element.classList.remove("noactive");
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
  export function sortASC() {
    mainElements.asc.classList.add("selected");
    mainElements.desc.classList.remove("selected");
    modelArray.getArray().sort(function (a, b) {
      let valueA = a.element.firstChild.nextElementSibling.value.toLowerCase();
      let valueB = b.element.firstChild.nextElementSibling.value.toLowerCase();
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
  
      return a.dateCreate-b.dateCreate;
    });
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
  
      return b.dateCreate-a.dateCreate;
    });
    mainElements.todoList.innerHTML = "";
    modelArray.getArray().forEach((elem) => {
      mainElements.todoList.appendChild(elem.element);
    });
  }
  
  function checkFooter() {
    console.log("check footer");
    if (counter.getCount() !== 0 || counter.getCountCompleted() !== 0) 
    mainElements.filters.classList.add("visible");
    else mainElements.filters.classList.remove("visible");
  }
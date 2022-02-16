let input = document.querySelector("#input");
let todo_list = document.querySelector("#todo_list");
let clearCompleted = document.querySelector("#clear");
let toggle_all = document.querySelector("#toggle_all");
let filters = document.querySelector(".footer");
let asc = document.querySelector("#asc");
let desc = document.querySelector("#desc");
let counter = document.querySelector("#count");

document.querySelector("#all").addEventListener("click", filter_All);
document.querySelector("#active").addEventListener("click", filter_Active);
document
  .querySelector("#completed")
  .addEventListener("click", filter_Completed);

clearCompleted.addEventListener("click", clear_Completed);
toggle_all.addEventListener("click", toggleAll);
asc.addEventListener("click", sortASC);
desc.addEventListener("click", sortDESC);

let count = 0;
let count_copleted = 0;
location.hash = "#/";

let array = []; //Array of all ToDos
class InputElement {
  element;
  complete = false;
  dateCreate;
  destroy = false;
  constructor(value) {
    let todo_item = document.createElement("div");
    todo_item.setAttribute("class", "imputBlock");

    let label = document.createElement("label");
    label.setAttribute("class", "toggle");
    label.addEventListener("click", toggles_complete);

    let display = document.createElement("div");
    display.setAttribute("class", "dispaly");

    let destroy = document.createElement("button");
    destroy.setAttribute("class", "destroy");
    destroy.addEventListener("click", toggles_destroy);

    display.appendChild(destroy);

    let todo_input = document.createElement("input");
    todo_input.setAttribute("class", "todo");
    todo_input.setAttribute("value", value);
    todo_input.addEventListener("dblclick", change_ToDo);
    todo_input.addEventListener("blur", todo_onblure);

    input.value = "";
    todo_input.readOnly = true;

    todo_item.appendChild(label);
    todo_item.appendChild(todo_input);
    todo_item.appendChild(display);
    this.element = todo_item;
    this.dateCreate = Date.now();
  }
}

//change ToDo
function change_ToDo(elem) {
  if (elem.target.readOnly) {
    elem.target.readOnly = false;
    elem.target.classList.toggle("editing");
    elem.target.nextElementSibling.classList.toggle("dispalyEditing");
  }
}
//event when focus was lost after changing ToDo
function todo_onblure(elem) {
  if (!elem.target.readOnly) {
    elem.target.readOnly = true;
    elem.target.classList.toggle("editing");
    elem.target.nextElementSibling.classList.toggle("dispalyEditing");
  }
}

//click event on completion ToDo
function toggles_complete(elem) {
  if (elem.target.checked) {
    counter.textContent = ++count;
    --count_copleted;
    elem.target.checked = false;
  } else {
    counter.textContent = --count;
    ++count_copleted;
    elem.target.checked = true;
  }
  toggle_done(elem.target);
  input_done(elem.target.nextElementSibling);

  check_filter();
  chek_Completed();
  toggleAll_check();
}

function toggle_done(elem) {
  elem.classList.toggle("toggle_done");
}
function input_done(elem) {
  elem.classList.toggle("done");
}

//click event on completion of all ToDo
function toggleAll() {
  if (count_copleted === 0) {
    array.map(function (elem) {
      toggle_done(elem.element.firstChild);
      input_done(elem.element.firstChild.nextElementSibling);
      elem.element.firstChild.checked = true;
      ++count_copleted;

      return elem;
    });
    counter.textContent = count = 0;
  } else if (count === 0) {
    array.map(function (elem) {
      toggle_done(elem.element.firstChild);
      input_done(elem.element.firstChild.nextElementSibling);
      elem.element.firstChild.checked = false;
      counter.textContent = ++count;

      return elem;
    });
    count_copleted = 0;
  } else {
    array.map(function (elem) {
      if (!elem.element.firstChild.checked) {
        toggle_done(elem.element.firstChild);
        input_done(elem.element.firstChild.nextElementSibling);
        elem.element.firstChild.checked = true;
        ++count_copleted;
        counter.textContent = --count;
      }
      return elem;
    });
  }
  check_filter();
  chek_Completed();
  toggleAll_check();
}

function toggleAll_check() {
  if (count === 0 && count_copleted > 0) {
    toggle_all.classList.add("checked");
  } else {
    toggle_all.classList.remove("checked");
  }
}

function chek_Completed() {
  if (count_copleted > 0) clearCompleted.classList.remove("button_true");
  else clearCompleted.classList.add("button_true");
}

//Delete all completed ToDo event
function clear_Completed() {
  array.forEach((elem) => {
    if (elem.element.firstChild.checked) {
      elem.destroy = true;
      elem.element.remove();
    }
  });
  count_copleted = 0;
  chek_Completed();
  clear_Array();
  check_footer();
  toggleAll_check();
  check_filter();
}

//ToDo delete event
function toggles_destroy(elem) {
  array.forEach((toDo) => {
    if (toDo.element === elem.target.parentNode.parentNode) {
      toDo.destroy = true;
    }
  });
  clear_Array();
  elem.target.parentElement.parentElement.remove();
  if (!elem.target.parentElement.parentElement.firstChild.checked)
  counter.textContent = --count;
  else count_copleted--;

  check_footer();
  toggleAll_check();
}

function clear_Array() {
  array = array.filter((elem) => elem.destroy === false);
}

//Add New ToDo Event
input.addEventListener("keydown", function (event) {
  if (
    event.key == "Enter" &&
    event.target.value.length >= 3 &&
    event.target.value.length <= 200
  ) {
    array.push(new InputElement(input.value));
    todo_list.appendChild(array[array.length - 1].element);
    counter.textContent = ++count;
  }
  check_footer();
  check_filter();
});

function check_filter() {
  if (location.hash === "#/active") filter_Active();
  else if (location.hash === "#/completed") filter_Completed();
  else filter_All();
}

//Filter show all ToDo
function filter_All(event) {
  if (event) selectFilter(event.target);
  array.map(function (elem) {
    if (elem.element.classList.contains("noactive")) {
      elem.element.classList.remove("noactive"); 
    }
    return elem;
  });
  counter.textContent = count+count_copleted;
}

//Filter show all active ToDo
function filter_Active(event) {
  if (event) selectFilter(event.target);
  array.map(function (elem) {
    if (elem.element.firstChild.checked) {
      elem.element.classList.add("noactive");
    } else if (elem.element.classList.contains("noactive") 
    && !elem.element.firstChild.checked) {
    elem.element.classList.remove("noactive");
  }
    return elem;
  });
  counter.textContent = count;
}

//Filter show all completed ToDo
function filter_Completed(event) {
  if (event) selectFilter(event.target);
  array.map(function (elem) {
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
  counter.textContent = count_copleted;
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
function sortASC() {
  asc.classList.add("selected");
  desc.classList.remove("selected");
  array.sort(function (a, b) {
    let valueA = a.element.firstChild.nextElementSibling.value.toLowerCase();
    let valueB = b.element.firstChild.nextElementSibling.value.toLowerCase();
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;

    return a.dateCreate-b.dateCreate;
  });
  todo_list.innerHTML = "";
  array.forEach((elem) => {
    todo_list.appendChild(elem.element);
  });
}

//descending sort
function sortDESC() {
  desc.classList.add("selected");
  asc.classList.remove("selected");
  array.sort(function (a, b) {
    let valueA = a.element.firstChild.nextElementSibling.value.toLowerCase();
    let valueB = b.element.firstChild.nextElementSibling.value.toLowerCase();
    if (valueA > valueB) return -1;
    if (valueA < valueB) return 1;

    return b.dateCreate-a.dateCreate;
  });
  todo_list.innerHTML = "";
  array.forEach((elem) => {
    todo_list.appendChild(elem.element);
  });
}

function check_footer() {
  console.log("check footer");
  if (count !== 0 || count_copleted !== 0) filters.classList.add("visible");
  else filters.classList.remove("visible");
}

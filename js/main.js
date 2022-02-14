
let input = document.querySelector("#input");
let todo_list = document.querySelector("#todo_list");
let clearCompleted = document.querySelector("#clear");
let toggle_all = document.querySelector('#toggle_all');
let count = 0;
let count_copleted = 0;
location.hash="#/";

let array =[];
class InputElement{
  element;
  complete = false;
  dateCreate;
  destroy = false;
  constructor(value){
    let todo_item = document.createElement('div');
      todo_item.setAttribute('class', 'imputBlock');

      let label = document.createElement('label');
      label.setAttribute('class','toggle');
      label.addEventListener('click', toggles_complete);

      let display = document.createElement('div');
      display. setAttribute('class', 'dispaly');

      let destroy = document.createElement('button');
      destroy.setAttribute('class', 'destroy');
      destroy.addEventListener('click', toggles_destroy);

      display.appendChild(destroy);


      let todo_input = document.createElement('input');
      todo_input.setAttribute('class', 'todo');
      todo_input.setAttribute('value', value);
      todo_input.addEventListener('dblclick', change_ToDo);
      todo_input.addEventListener('blur', todo_onblure);

      input.value='';
      todo_input.readOnly = true;

      todo_item.appendChild(label);
      todo_item.appendChild(todo_input);
      todo_item.appendChild(display);
      this.element = todo_item;
      this.dateCreate = Date();
      
    
  }
  
}

function change_ToDo(elem){
  if(elem.target.readOnly){
  elem.target.readOnly = false;
  elem.target.classList.toggle('editing');
  elem.target.nextElementSibling.classList.toggle('dispalyEditing');
}
}

function todo_onblure(elem){
  if(!elem.target.readOnly){
  elem.target.readOnly = true;
  elem.target.classList.toggle('editing');
  elem.target.nextElementSibling.classList.toggle('dispalyEditing');
}
}

function toggles_complete(elem){
  if(elem.target.checked){
    document.querySelector("#count").textContent=++count;
    --count_copleted;
    elem.target.checked= false;
    
  }else{
    document.querySelector("#count").textContent=--count;
    ++count_copleted;
    elem.target.checked= true;
  }
  toggle_done(elem.target);
  input_done( elem.target.nextElementSibling);
  
  
  check_filter();
  chek_Completed();

}



function toggle_done(elem){
  elem.classList.toggle('toggle_done');
}
function input_done(elem){
  elem.classList.toggle('done');
}

toggle_all.addEventListener('click', toggleAll);

function toggleAll(){

  if(count_copleted ===0)
    {
    array.map(function(elem){
      toggle_done(elem.element.firstChild);
      input_done( elem.element.firstChild.nextElementSibling);
      elem.element.firstChild.checked = true;
      ++count_copleted;

      return elem;
  });
  document.querySelector("#count").textContent=count=0;
  
  }else if(count ===0){
    array.map(function(elem){
      toggle_done(elem.element.firstChild);
      input_done( elem.element.firstChild.nextElementSibling);
      elem.element.firstChild.checked = false;
      document.querySelector("#count").textContent=++count;

      return elem;
  });
  count_copleted = 0;
  }else{
    array.map(function(elem){
      if(!elem.element.firstChild.checked){
      toggle_done(elem.element.firstChild);
      input_done( elem.element.firstChild.nextElementSibling);
      elem.element.firstChild.checked = true;
      ++count_copleted;
      document.querySelector("#count").textContent=--count;
    }
      return elem;
    
  });
  }
  check_filter();
  chek_Completed();
}


clearCompleted.addEventListener('click', clear_Completed);

function chek_Completed(){
  if(count_copleted > 0)
  clearCompleted.classList.add('button_true');
  else
  clearCompleted.classList.remove('button_true');
}

function clear_Completed(){

  array.forEach(elem=>{
    if(elem.element.firstChild.checked){
      elem.destroy = true
      elem.element.remove();

    }
  });
  count_copleted = 0;
  chek_Completed();
  clear_Array();
}



function toggles_destroy(elem){
  array.forEach(toDo=>{
    if(toDo.element === elem.target.parentNode.parentNode){
      toDo.destroy = true;
    }
  });
  clear_Array();
  elem.target.parentElement.parentElement.remove();
  
  document.querySelector("#count").textContent=--count;
}

function clear_Array(){
  array = array.filter(elem => elem.destroy ===false);
}


input.addEventListener('keydown', function(event) {
    if (event.key == 'Enter'&&event.target.value.length >=3&&event.target.value.length <=200) {
      array.push(new InputElement(input.value))
      todo_list.appendChild(array[array.length-1].element);
      document.querySelector("#count").textContent=++count;
      check_filter();
    }
  });

  function check_filter(){
    if(location.hash ==="#/active")
      filter_Active();
      else if(location.hash ==="#/completed")
      filter_Completed();
  }

document.querySelector("#all").addEventListener('click', filter_All);
document.querySelector("#active").addEventListener('click', filter_Active);
document.querySelector("#completed").addEventListener('click', filter_Completed);

  function filter_All(event){
    if(event)
    selectFilter(event.target);
    array.map(function(elem){
      if(elem.element.classList.contains('noactive')){
       elem.element.classList.remove('noactive');
      }
      return elem;
    });
  }
  function filter_Active(event){
    if(event)
    selectFilter(event.target);
    array.map(function(elem){
      if(elem.element.firstChild.checked){
       elem.element.classList.add('noactive');
      }else if(elem.element.classList.contains('noactive')&&!elem.element.firstChild.checked)
      elem.element.classList.remove('noactive');
      
      return elem;

    });
  }
  function filter_Completed(event){
    if(event)
    selectFilter(event.target);

    array.map(function(elem){
      if(!elem.element.firstChild.checked)
       elem.element.classList.add('noactive');
      else if(elem.element.classList.contains('noactive')&&elem.element.firstChild.checked)
      elem.element.classList.remove('noactive');
      return elem;
    });
  }

  function selectFilter(target){
    let filters = document.querySelectorAll(".filters a");
    filters.forEach(elem=>{
      if(elem === target&&!elem.classList.contains('selected')){
        elem.classList.add('selected');
      }else if(elem.classList.contains('selected')){
        elem.classList.remove('selected');
      }
    })
    
  }





  

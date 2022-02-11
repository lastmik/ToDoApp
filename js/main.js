
let input = document.querySelector("#input");
let todo_list = document.querySelector("#todo_list");
let count = 0;
location.hash="#/";

let array =[];
class InputElement{
  element;
  complete = false;
  dateCreate;
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
    elem.target.checked= false;
  }else{
    document.querySelector("#count").textContent=--count;
    elem.target.checked= true;
  }

  elem.target.nextElementSibling.classList.toggle('done');
  elem.target.classList.toggle('toggle_done');
  check_filter();

}

function toggles_destroy(elem){
  elem.target.parentElement.parentElement.remove();
  document.querySelector("#count").textContent=--count;
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
    selectFilter(event.target);
    array.map(function(elem){
      if(elem.element.classList.contains('noactive')){
       elem.element.classList.remove('noactive');
      }
      return elem;
    });
  }
  function filter_Active(event){
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





  

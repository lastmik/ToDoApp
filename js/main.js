
let input = document.querySelector("#input");
let todo_list = document.querySelector("#todo_list");
let count = 0;
let toggles_done = [];
let buttons_destroy=[];
let array =[];
class InputElement{
  element;
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
      input.value='';
      todo_input.readOnly = true;

      todo_item.appendChild(label);
      todo_item.appendChild(todo_input);
      todo_item.appendChild(display);
      this.element = todo_item;
      this.dateCreate = Date();
    
  }
 
}
let classelement = new InputElement('sgedg');

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
  

}

function toggles_destroy(elem){
  elem.target.parentElement.parentElement.remove();
}



input.addEventListener('keydown', function(event) {
    if (event.code == 'Enter'&&event.target.value.length >=3&&event.target.value.length <=200) {
      array.push(new InputElement(input.value))
      todo_list.appendChild(array[array.length-1].element);
      document.querySelector("#count").textContent=++count;
    }
  });

  function filter_All(){

  }




  

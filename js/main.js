
var input = document.querySelector("#input");
var todo_list = document.querySelector("#todo_list");

input.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
      let todo_item = document.createElement('div');
      todo_item.setAttribute('class', 'imputBlock');

      let label = document.createElement('label');
      label.setAttribute('class','toggle');

      let display = document.createElement('div');
      display. setAttribute('class', 'dispaly');

      let destroy = document.createElement('button');
      destroy.setAttribute('class', 'destroy');

      display.appendChild(destroy);


      let todo_input = document.createElement('input');
      todo_input.setAttribute('class', 'todo');
      todo_input.setAttribute('value', input.value);
      input.value='';
      todo_input.readOnly = true;

      todo_item.appendChild(label);
      todo_item.appendChild(todo_input);
      todo_item.appendChild(display);
      todo_list.appendChild(todo_item);

    }
  });


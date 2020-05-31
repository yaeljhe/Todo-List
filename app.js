//Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const clear = document.querySelector('.clear');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('change',filterTodo);
clear.addEventListener('click',clearLocalstorage);

//Date
date();

//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();

    //Display error message when Input is empty 
    if(todoInput.value === ""){
        window.alert("Please enter text, field is empty")
    }
    else {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo")
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //ADD TODO TO LOCAL STORAGE
        saveLocalTodos(todoInput.value);
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
        //Clear Todo INPUT VALUE
        todoInput.value = "";
    }
}

function deleteCheck(event){
    const item = event.target;
    //DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        //Removes element after transition ends
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
        
    }

    //CHECK MARK
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        markCompleted(todo); //NEW
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;

            }
    })
}

function clearLocalstorage(){
    const todos = todoList.childNodes
    const values = Object.values(todos)

    for(const value of values){
        value.remove()
    }

    localStorage.clear()
}

function saveLocalTodos(todo){
    //CHECK---DO ITEMS EXISTS ALREADY?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let data = {
        todo: todo,
        status: "uncompleted"
    };

    todos.push(data);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
     //CHECK --- DO ITEMS EXISTS ALREADY?
     let todos;
     if(localStorage.getItem('todos')===null){
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function(todo){
         //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo")
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo["todo"];
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
        let status = todo.status;
        if(status === "completed") {
            todoDiv.classList.toggle("completed");
            console.log(status);
        } 
     });

}

function removeLocalTodos(todo){
    //CHECK --- DO ITEMS EXISTS ALREADY?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    let index = todos.findIndex(obj => obj.todo==todoIndex);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function markCompleted(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    let index = todos.findIndex(obj => obj.todo==todoIndex);
    if(todos[index].status === "uncompleted") {
        todos[index].status = "completed";
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    else {
        todos[index].status = "uncompleted";
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function date(){
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    n = new Date();
    d = n.getDay()

    let day = weekdays[d]
    document.getElementById("day").innerHTML = day; 
}
















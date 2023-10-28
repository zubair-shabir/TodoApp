// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos')
const ErrorContainer = document.querySelector('.error')


// Event Listerners

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)
todoInput.addEventListener("keypress", function(event) { 
    if (event.key === "Enter") {
        addTodo(event)
    }
})
// Functions


function addTodo(e){
e.preventDefault();

if(todoInput.value == ""){
    showError(true);
    return;
}else{

    showError(false);

// Todo div

const todoDiv = document.createElement('div');
todoDiv.classList.add('todo');
// Create Li
const newTodo = document.createElement('li');
newTodo.innerText = todoInput.value;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);


// add Todo to localStorage
saveLocalTodos(todoInput.value)

// completed button
const completedButton = document.createElement('button');
completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
completedButton.classList.add('complete-btn');
todoDiv.appendChild(completedButton);

const trashButton = document.createElement('button');
trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton)


// Append to list

todoList.appendChild(todoDiv);


// clear Input Value
todoInput.value = ""
}
}




function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall')
        removeTodosLocally(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }


    // check mark

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo)  {
        if(todo.nodeName != '#text' ){
        switch(e.target.value){
            case 'all':
                todo.style.display= 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display= 'flex'
                }else{
                    todo.style.display= 'none'

                }
                break;
            case 'unCompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display= 'flex'
                }else{
                    todo.style.display= 'none'

                }
                break;
        }
    }
    })
}


function saveLocalTodos(todo){
    // check if todos are in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    
    }

    todos.forEach((todo) => {
        // Todo div

const todoDiv = document.createElement('div');
todoDiv.classList.add('todo');
// Create Li
const newTodo = document.createElement('li');
newTodo.innerText = todo;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);

// completed button
const completedButton = document.createElement('button');
completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
completedButton.classList.add('complete-btn');
todoDiv.appendChild(completedButton);

const trashButton = document.createElement('button');
trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton)


// Append to list

todoList.appendChild(todoDiv);
    })
}

function removeTodosLocally(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    
    }

    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem('todos', JSON.stringify(todos))


}


function showError(value){
    if(value == true){

        ErrorContainer.classList.add('show')
        document.querySelector('.form').style.animation = 'shake 0.2s 5';
        setTimeout(() => {
            ErrorContainer.classList.remove('show');
            document.querySelector('.form').style.animation = '';
        }, 3000);
    }else{
        ErrorContainer.classList.remove('show')

    }
}
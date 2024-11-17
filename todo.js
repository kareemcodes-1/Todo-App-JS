const todoInput = document.querySelector('.todo-input');
let editModal = document.querySelector('.edit-modal');
let editModalInput = document.querySelector('.edit-modal>input');
let tasks = JSON.parse(localStorage.getItem('userTasks')) || [];

//Function to add tasks to array and store in localStorage
function addTasks(){
    //Storing the value we add in the input in the variable task so we could use it
    const task = todoInput.value;
    if(task){
        tasks.push(task);
        localStorage.setItem('userTasks', JSON.stringify(tasks));
        todoInput.value = '';
        getTasks();
    }else{
        alert('Add a task');
    }
}

function getTasks (){

    if(tasks.length === 0){
        document.getElementById('todo-form').classList.add('hide');
    }
    document.querySelector('.todo-list').innerHTML = '';

    tasks.forEach((task, index) => {
        const todoText = document.createElement('div');
        const todoActions = document.createElement('div');

        todoText.className = 'todo-texts';
        todoActions.className = 'todo-actions';


        const div = document.createElement('div');
        div.className = 'todo';
        const h2 = document.createElement('h2');
        h2.className = 'todo-h2';
        const button = document.createElement('button');
        const editButton = document.createElement('button');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // checkbox.setAttribute("type", "checkbox");


        h2.id = index;
        h2.textContent = task;
        button.textContent = 'Delete';
        editButton.textContent = 'Edit';
        button.id = index;
        editButton.id = index;
        checkbox.id = index;
        checkbox.style.cursor = 'pointer';

        document.querySelector('.todo-list').appendChild(div);
        div.appendChild(todoText);
        div.appendChild(todoActions);

        todoText.appendChild(checkbox);
        todoText.appendChild(h2);

        todoActions.appendChild(button);
        todoActions.appendChild(editButton);

        checkbox.addEventListener('click', () => {
            if(h2.id === checkbox.id){
                h2.classList.toggle('add');
            }
        })

        button.addEventListener('click', () => {
           deleteTask(button.id);
        });

        editButton.addEventListener('click', () => {
            editTask(button.id);
        })
    })
}


function deleteTask(index){
    tasks.splice(index, 1);
    localStorage.setItem('userTasks', JSON.stringify(tasks));
    getTasks();
}

function editTask(index){
    editModal.classList.add('show');
    document.querySelector('.closeBtn').addEventListener('click', () => {
        editModal.classList.remove('show');
    });


    editModalInput.value = tasks[index];

    document.querySelector('.saveEdit').addEventListener('click', () => {
        tasks[index] = editModalInput.value;
        localStorage.setItem('userTasks', JSON.stringify(tasks));
        getTasks();
        editModal.classList.remove('show');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    getTasks();
})


const result = JSON.parse(localStorage.getItem('result')) || [
    { name: 'Learn new skill', dueDate: '2024-01-01', completed: false },
    { name: 'Go to gym', dueDate: '2024-01-01', completed: false }
];

document.querySelector('.js-add-button').addEventListener('click', () => {
    const textInput = document.querySelector('.text-input');
    const dateInput = document.querySelector('.date-input');
    const name = textInput.value;
    const dueDate = dateInput.value;

    if (name === '') {
        alert('You must type your task');
    } else if (dueDate === '') {
        alert('You need to select the date');
    } else {
        result.push({ name, dueDate, completed: false });
        textInput.value = '';
        renderTodo();
        saveToStorage();
        displayCount();
    }
});

function displayCount() {
    const countValue = document.querySelector('.count-value');
    const incompleteTasks = result.filter(task => !task.completed).length;
    countValue.innerText = incompleteTasks;
}

function renderTodo() {
    let todolist = '';
    result.forEach(function(todoObject, index) {
        const { name, dueDate, completed } = todoObject;
        const checked = completed ? 'checked' : '';
        const strikethroughClass = completed ? 'strikethrough' : '';

        const html = `
            <div class="row task"> 
                <input type="checkbox" class="task-check" ${checked} data-index="${index}">

                <div class="input-task col-md-8 col-sm-8 col-8 ${strikethroughClass}">${name}</div> 

                <div class="input col-md-3 col-sm-3 col-4 ${strikethroughClass}">${dueDate}</div> 

                <button class="delete-button js-delete-button" data-index="${index}"><i class="bi bi-trash-fill"></i></button> 
            </div>`;
        todolist += html;
    });
    document.querySelector('.js-result').innerHTML = todolist;

    document.querySelectorAll('.js-delete-button').forEach((deleteButton) => {
        deleteButton.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            result.splice(index, 1);
            renderTodo();
            saveToStorage();
            displayCount();
        });
    });

    document.querySelectorAll('.task-check').forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            result[index].completed = e.target.checked;
            renderTodo();
            saveToStorage();
            displayCount();
        });
    });
}

function saveToStorage() {
    localStorage.setItem('result', JSON.stringify(result));
}

// Initial render and count display
renderTodo();
displayCount();
// Select elements
const clear = document.getElementById('clear');
const list = document.getElementById('list-container');
const input = document.querySelector('input');
const listrow = document.getElementById('list-row');

// Classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const OPACITYDOWN = "opacity-down";

// Varriables

let LIST = [];
let i = 0;
let index = 0;
let spalvosIndex = -1;

// Get Items from local storage

let data = localStorage.getItem("TODO");
let iData = localStorage.getItem("INDEX");
let colorData = localStorage.getItem("COLORINDEX");

if (data) {
    LIST = JSON.parse(data);
    index = JSON.parse(iData);
    spalvosIndex = JSON.parse(colorData);
    i = LIST.length;
    loadList(LIST);
    
} else {
    LIST = [];
    i = 0;
}

// Function to load local storage list

function loadList(array) {
    array.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash, element.spalva);
    });
}

// Add To Do

function addToDo(what, id, done, trash, spalvosIndex){
    if (trash) {return;}
    const DONE = done ? CHECK : UNCHECK;
    const OPACITY = done ? OPACITYDOWN : "";
    const item = `<li class="list-row color${spalvosIndex} ${OPACITY}">
    <span class="fa ${DONE} co" job="complete" id="${id}"></span>
    <p class=todo-item-text>${what}</p>
    <span class="fa fa-trash-o de" job="delete" id="${id}"></span>
</li>`;
    const position = 'beforeend'
    list.insertAdjacentHTML(position, item);
}

// Add on enter key

document.addEventListener("keydown", function(event){
    if (event.keyCode == 13) {
        if (index==13) {
            alert("First complete the tasks you've already set out to accomplish. Slow and steady wins the race.");
            input.value = "";
        }
        // if there is input in the text field and the todo list does not exceed maximum
        if(input.value && index < 13) {
            if (spalvosIndex !== 3) {
                spalvosIndex++;
            } else {
                spalvosIndex = 0;
            }
            addToDo(input.value, i, false, false, spalvosIndex);
            LIST.push({
                name : input.value,
                id : i,
                done : false,
                trash : false,
                spalva : spalvosIndex
        });
             i++;
             index++;
            localStorage.setItem("TODO", JSON.stringify(LIST));
            localStorage.setItem("INDEX", JSON.stringify(index));
            localStorage.setItem("COLORINDEX", JSON.stringify(spalvosIndex));
            input.value = "";
        }
        
    }
});

// Complete To Do

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.classList.toggle(OPACITYDOWN);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove To Do
 
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    index--;
    localStorage.setItem("INDEX", JSON.stringify(index));

    LIST[element.id].trash = true;
}

// Done and remove event listener

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
})

// Clear event listener

clear.addEventListener("click", function(){
    list.innerHTML = "";
    i=0;
    index=0;
    spalvosIndex = -1;
    LIST = [];
});





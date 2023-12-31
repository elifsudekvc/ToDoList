//HTML etiketlerini seçmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput=document.querySelector("#todoSearch");
let todos=[];
runEvents()

function runEvents(e) {
 form.addEventListener("submit",addToDo);
 document.addEventListener("DOMContentLoaded",pageLoaded);
 secondCardBody.addEventListener("click",removeTodoToUI);
 clearButton.addEventListener("click",allTodosEverywhere);
 filterInput.addEventListener("keyup",filter);
};

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addToDoUI(todo);
    });

}

function filter(e){

    const filterValue=e.target.value.toLowerCase().trim();
    console.log(filterValue);
    const todoListesi =document.querySelectorAll(".list-group-item");
    
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style", "display:block");
            }else{
                todo.setAttribute("style", "display:none !important");
            }
        });

        
    }else{
        showAlert("warning","Arama yapabilmeniz için en az 1 todo olmalıdır.")
    }
};

function allTodosEverywhere(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            todo.remove();
        });

        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Başarılı bir şekilde temizlendi");

    }else{
        showAlert("warning","Silmek için to do olması gerek.");
    }

}

function removeTodoToUI(e){
if(e.target.className==="fa fa-remove"){
    const todo=e.target.parentElement.parentElement;
    todo.remove();
    //storagedan silme
    removeTodoToStorage(todo.textContent);
    showAlert("success","todo başarıyla silindi");
}}

function removeTodoToStorage(removeTodo){

    todos.forEach(function(todo,index){

        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addToDo(e) {
    const inputText = addInput.value.trim();
    if(inputText==""){
        showAlert("warning","Lütfen bir değer giriniz");
    }
    else{
    //arayüz 
        addToDoUI(inputText);
    //storage
        addToDoStorage(inputText);
        showAlert("success","ToDo eklendi.")
    }
    console.log("submit çalıştı");
    e.preventDefault();
};


function addToDoUI(newToDo){
    // <!--
    //                     <li class="list-group-item d-flex justify-content-between">Todo 1
    //                         <a href="#" class="delete-item">
    //                             <i class="fa fa-remove"></i>
    //                         </a>
    //                     </li>
    //                 -->

    const li= document.createElement("li");
    li.className="list-group-item d-flex justify-content-between"
    li.textContent=newToDo

    const a= document.createElement("a");
    a.className="delete-item"
    a.href="#"

    const i=document.createElement("i");
    i.className="fa fa-remove"

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value="";

};

function addToDoStorage(newToDo) {
    checkTodosFromStorage();
    todos.push(newToDo);
    localStorage.setItem("todos",JSON.stringify(todos));
};

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
//     <div class="alert alert-warning" role="alert">
//   This is a warning alert—check it out!
// </div>

const div=document.createElement("div");
div.className="mt-2 alert alert-"+type;
div.textContent=message;
firstCardBody.appendChild(div);

setTimeout(function(){
div.remove();

},2000);

}
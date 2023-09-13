//HTML etiketlerini seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".list-group")[0];
const secondCardBody = document.querySelectorAll(".list-group")[1];
const clearButton = document.querySelector("#clearButton");

runEvents();

function runEvents() {

    form.addEventListener("submit",addToDo);

}

function addToDo(e){

    const inputText = addInput.value.trim();
    if(inputText==null || inputText==""){
        alert("Lütfen bir değer giriniz...");
    }
    else{
    //arayüze ekleme 
    addToDoUI(inputText);
    }
    
    //storage ekleme

    console.log("Submit eventi çalıştı");
    e.preventDefault(); //submitte farklı bir sayfaya yönlendirdiği için farklı sayfaya yönlendirmeyi engelledik.

}

function addToDoUI(newTodo){
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li>
                        */
const li = document.createElement("li");
li.className="list-group-item d-flex justify-content-between"
li.textContent=newTodo;

const a=document.createElement("a");
a.href = "#"
a.className="delete-item";

const i=document.creatElement(i);
i.className="fa fa-remove";
}
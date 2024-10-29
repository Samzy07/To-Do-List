let inputEl = document.getElementById("input")
let addTaskBtn = document.getElementById('add')
let ulEl = document.getElementById("item-list")
let btnDiv = document.getElementById("btn-box")

btnDiv.addEventListener('click', btnTodo)

// geting Item-List back to array
let arrList = JSON.parse(localStorage.getItem("todoTask"))
updateTask()


if (!arrList) {

    arrList = []

}


addTaskBtn.addEventListener('click', function(e){
   e.preventDefault()
   let objTask = {
        taskId: arrList.length + 1,
        taskName: inputEl.value,
        status: "pending"
   }

     arrList.push(objTask)

    //  saving Item-List to LocalStorage
     localStorage.setItem("todoTask", JSON.stringify(arrList))
     updateTask()

})


// Creating Ul , Li , Complete, Undo , Delete Element
function updateTask(){

    ulEl.innerHTML = ""
    inputEl.value = ""

       arrList.forEach((taskName,taskId)=>{

        // Updating Status of Items
    let isCompleted = arrList[taskId].status == "completed" ? "active" : "todo"

        let todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
        todoDiv.classList.add(isCompleted)

        let li = document.createElement('li')
        

        let compBtn = document.createElement('button')
        compBtn.classList.add("compbtn")
        compBtn.innerText = "Complete"
       


        let undoBtn = document.createElement('button')
        undoBtn.classList.add("undobtn")
        undoBtn.innerText = "Undo"
     

        let deleteBtn = document.createElement('button')
        deleteBtn.classList.add("deletebtn")
        deleteBtn.innerText = "Delete"
        deleteBtn.addEventListener("click", deleteTask)
        deleteBtn.taskId = arrList[taskId].taskId

        li.innerText = arrList[taskId].taskName

        todoDiv.append(li, undoBtn, compBtn, deleteBtn)
        ulEl.appendChild(todoDiv)
        

        compBtn.addEventListener("click", function(e){
        
            const item = e.target
        
            if (item.classList[0] === "compbtn") {
             
                const todo = item.parentElement
                
                todo.classList.toggle("active")
                 arrList[taskId].status = "completed"
                compBtn.style.display = "none"
                undoBtn.style.display = "block"

                localStorage.setItem("todoTask", JSON.stringify(arrList))
                
            }
        })
    

    
        undoBtn.addEventListener('click', function(e){
               
            const item = e.target
           
            if (item.classList[0] === "undobtn") {
                // debugger
                const todon = item.parentElement
                
                
                todon.classList.remove('active')
                 arrList[taskId].status = "pending"
                undoBtn.style.display = "none"
                compBtn.style.display = "block"
                localStorage.setItem("todoTask", JSON.stringify(arrList))
               
            }

                
            })

    })

    localStorage.setItem("todoTask", JSON.stringify(arrList))

}



// Deleting task with the Delete Button
function deleteTask(e){
    let del = arrList.findIndex(value =>value.taskId == e.target.taskId)

    arrList.splice(del,1)
    localStorage.setItem("todoTask", JSON.stringify(arrList))
    updateTask()

}


// All , Completed , Pending , Clear Button
function btnTodo(e){
    
    const itemsEl = ulEl.childNodes
    

     itemsEl.forEach((todos)=>{
        
   
        switch (e.target.value){
            case "all":
                todos.style.display = "flex"
                break;
            
            case "comp":
                if (todos.classList.contains('active')) {
                    todos.style.display = "flex"
                } else {
                    todos.style.display = "none"
                }
                break;

            case "pend":
                if (!todos.classList.contains('active')) {
                    todos.style.display = "flex"
                } else {
                    todos.style.display = "none"
                }
                break;
            
            case "clear":
                ulEl.innerHTML = ""
                arrList = []
                break;
        }

        
    })

    localStorage.setItem("todoTask", JSON.stringify(arrList))
  

}



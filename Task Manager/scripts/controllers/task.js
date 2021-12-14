window.addEventListener("load",init);
function init(){
    bindevents();
    countUpdate();
}
function bindevents(){
    document.getElementById('add').addEventListener('click',addTask);
    document.getElementById('delete').addEventListener('click',deletetask);
    document.getElementById('update').addEventListener('click',updatetask);
    document.getElementById('sort').addEventListener('click',sorttask);
    document.getElementById('save').addEventListener('click',savetask);
    document.getElementById('load').addEventListener('click',loadtask);
    document.getElementById('clearall').addEventListener('click',clearall);
    document.getElementById('priority').addEventListener('change',currpr);
}
function currpr(){
    document.getElementById('currpr').innerText = this.value;
}
function addTask(){
    const fields = ["id","name","desc","date","url","priority"];
    const task = {};
    for(let field of fields){
        task[field] = document.getElementById(field).value;
    }
    opns.add(task);
    printtask(task);
    clearall();
    console.log(task);
}
function deletetask(){
    opns.remove();
    printTasks();
}
function updatetask(){
    for(let key in taskobj){
        if(key == "markdel"){
            continue;
        }
        taskobj[key] = document.getElementById(key).value;
    }
    printTasks();
}
function sorttask(){
    opns.sort();
    printTasks();
}
function savetask(){
    if(window.localStorage){
        localStorage.task = JSON.stringify(opns.tasks);
        alert("Saved...")
    }
    else{
        alert("Window does not support local storage...");
    }
}
function loadtask(){
    if(window.localStorage){
        if(localStorage.task){
            let task = JSON.parse(localStorage.task);
            opns.convertobjintotask(task);
            printTasks();
            countUpdate();
        }
        else{
            alert("No data...")
        }
    }
    else{
        alert("Window does not support local storage");
    }
}
function clearall(){
    const fields = ["id","name","desc","date","url","priority"];
    for(let field of fields){
        document.getElementById(field).value = "";
    }
}
let taskobj;
function edit(){
    console.log("I am edit icon");
    let id = this.getAttribute("taskid");
    taskobj = opns.searchbyId(id);
    printtaskinbar(taskobj);
    // console.log(taskobj);
}
function delicon(){
    console.log("I am delete icon");
    let id = this.getAttribute("taskid");
    opns.mark(id);
    let tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    countUpdate();
}
function createicon(classname, fn, taskId){
    let icon = document.createElement('i');
    icon.className = classname;
    icon.setAttribute("taskid",taskId);
    icon.addEventListener("click",fn);
    return icon;
}
function printTasks(){
    document.getElementById('databody').innerHTML = "";
    opns.tasks.forEach(printtask);
}
function printtask(task){
    let tbody = document.getElementById('databody');
    let tr = tbody.insertRow();
    var index = 0;
    for(let key in task){
        if(key == "markdel")
        {
            continue;
        }
        let td = tr.insertCell(index);
        td.innerText = task[key];
        index++;
    }
    let td = tr.insertCell(index);
    let editicon = createicon("far fa-edit me-2 click", edit, task.id);
    let deleteicon = createicon("far fa-trash-alt click", delicon,task.id);
    td.appendChild(editicon);
    td.appendChild(deleteicon);
    countUpdate();
} 
function printtaskinbar(task){
    for(let key in task){
        if(key == "markdel"){
            continue;
        }
        let boxid = `#${key}`;
        document.querySelector(boxid).value = task[key];
    }
}
function countUpdate(){
    let cttotal = opns.countRecords();
    let ctmark = opns.countmark();
    document.querySelector('#markrecord').innerText = ctmark;
    document.querySelector('#unmarkrecord').innerText = cttotal - ctmark;
    document.getElementById('trecord').innerText = cttotal;
}
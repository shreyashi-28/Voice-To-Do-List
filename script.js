const taskList =[]  //Empty Array
const listElemet=document.getElementById("taskList"); //this list element will represent ul tag
const statusText=document.getElementById("status");

// Speech Recognition
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new SpeechRecognition(); //Object created so that we can use it
recognition.continuous = false;
recognition.lang="en-US";

// Handeling the command provided by user
recognition.onresult=(event) =>{
    const transcript=event.results[0][0].transcript.toLowerCase();
    statusText.innerText=`Heard: "${transcript}"`;
    if(transcript.startsWith("new task")){ //transcript is a string and startsWith is a method.
        const taskText=transcript.replace("new task","").trim();
        if(taskText)
            addTask(taskText);
    }
    else if(transcript.startsWith("delete task")){
        const num=parseInt(transcript.split(" ")[2])-1; // when it is splitted on the basis of space then it returns string
        if(!isNaN(num))
            deleteTask(num);
    }   
    else if (transcript.startsWith("mark task")){
        const num=parseInt(transcript.split(" ")[2])-1;
        if(!isNaN(num))
            markTaskDone(num);
    }
}
function addTask(task){
    taskList.push({text:task,done:false});
    renderTasks();
}
function deleteTask(num){
    if(taskList[num]){
        taskList.splice(num,1);
        renderTasks();
    }
}
function markTaskDone(num){
    if(taskList[num]){
        taskList[num].done=true;
        renderTasks();
    }
}
function renderTasks(){
    listElemet.innerHTML="";
    taskList.forEach((task,idx)=>{
        const li=document.createElement("li");
        li.innerText = `${idx + 1}. ${task.text} ${task.done ? "✅" : ""}`;
        listElemet.appendChild(li);
    });
}

function startVoice(){
    statusText.innerText="Listening....";
    recognition.start();
}

document.getElementById("startBtn").addEventListener("click",startVoice);
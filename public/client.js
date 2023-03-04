//  client side
 const socket = io("http://localhost:3000");


let namme;

 
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector('.massage_area');

do{
     namme = prompt("Enter your name to join GossipGrid");

}while(!namme);

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        
      sendMessage(e.target.value)
    }
})
const sendMessage = (message)=>{
    
    let msg = {
        user: namme,
        message: message.trim()
    }
    appendMessage(msg,'outgoing');
    textarea.value=" ";
    scrollToBottom();
    socket.emit("message",msg);
}

const appendMessage = (message, type) => {
   
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");
    let markUp = `
        <h4>${message.user}</h4>
        <p>${message.message}</p>
    `
    
    mainDiv.innerHTML = markUp;
    messageArea.appendChild(mainDiv)
}

socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
    scrollToBottom()
})
const scrollToBottom = ()=>{
    messageArea.scrollTop = messageArea.scrollHeight;
}
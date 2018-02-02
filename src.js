
let user = prompt("Skriv ditt namn");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC8L06cksUfIip-DEMbLc9Xgf2pnBSuoY8",
    authDomain: "lab1-7fa59.firebaseapp.com",
    databaseURL: "https://lab1-7fa59.firebaseio.com",
    projectId: "lab1-7fa59",
    storageBucket: "lab1-7fa59.appspot.com",
    messagingSenderId: "619341925518"
};
firebase.initializeApp(config);

let database = firebase.database();

let messageList = document.getElementById("messageList");
let inputBoard = document.getElementById("inputBoard");
let sendButton = document.getElementById("sendButton");

database.ref('/').on('value', function(snapshot) {
    console.log("Något hände i databasen!");
    let data = snapshot.val();
    let listOfMessages = [];
    
    while( messageList.firstChild ) {
        messageList.removeChild( messageList.firstChild );
    }
    
    for( let object in data ) {
        let r = data[object];
        listOfMessages.push(r.user + ": " + r.message);
    }
    
    listOfMessages.reverse();
    console.log(listOfMessages);
    
    for(let i = 0; i < listOfMessages.length; i++) {
        let newNode = document.createElement('li');
        newNode.innerHTML = listOfMessages[i];
        messageList.appendChild(newNode);
    }
    
})

sendButton.addEventListener("click", function() {
    let d = new Date();
    
    let newDate = {
        year : d.getFullYear(),
        month: d.getMonth(), 
        day: d.getDate(),
        hour: d.getHours()
    }
    let newMessage = {
        user : user,
        message : inputBoard.value,
        date : newDate
    };
    
    database.ref('/').push(newMessage);
});






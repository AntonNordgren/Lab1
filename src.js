
logIn();

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
let logoutButton = document.getElementById("logoutButton");

database.ref('/').on('value', function(snapshot) {
    console.log("Något hände i databasen!");
    let data = snapshot.val();
    let listOfMessages = [];
    
    while( messageList.firstChild ) {
        messageList.removeChild( messageList.firstChild );
    }
    
    for( let object in data ) {
        let r = data[object];
        let time = {
            year : r.date.year,
            month : r.date.month,
            date : r.date.day,
            hour: r.date.hour,
            minute: r.date.minute
        }
        let newData = {
            user: r.user,
            message: r.message,
            time : time
        }
        listOfMessages.push(newData);
    }
    
    listOfMessages.reverse();
    console.log(listOfMessages);
    
    for(let i = 0; i < listOfMessages.length; i++) {
        
        let user = listOfMessages[i].user;
        let message = listOfMessages[i].message;
        let year = listOfMessages[i].time.year;
        let month = listOfMessages[i].time.month;
        let date = listOfMessages[i].time.date;
        let hour = listOfMessages[i].time.hour;
        let minute = listOfMessages[i].time.minute;
        
        let newNode = document.createElement('div');
        
        let content = document.createElement('div');
        
        content.className = "messageContent";
        newNode.appendChild(content);
        
        let userLabel = document.createElement('span');
        userLabel.className = 'userLabel';
        userLabel.innerHTML = user + ":  ";
        newNode.appendChild(userLabel);
        
        let messageLabel = document.createElement('span');
        messageLabel.className = 'messageLabel';
        messageLabel.innerHTML = message;
        newNode.appendChild(messageLabel);
        
        let timeLabel = document.createElement('span');
        timeLabel.className = 'timeLabel';
        
        switch(month) {
            case 0:
                month = "Jan"
                break;
            case 1:
                month = "Feb"
                break;
            case 2:
                month = "Mar"
                break;
            case 3:
                month = "Apr"
                break;
            case 4:
                month = "May"
                break;
            case 5:
                month = "June"
                break;
            case 6:
                month = "July"
                break;
            case 7:
                month = "Aug"
                break;
            case 8:
                month = "Sept"
                break;
            case 9:
                month = "Oct"
                break;
            case 10:
                month = "Nov"
                break;
            case 11:
                month = "Dec"
                break;
        }
        
        if(minute < 10){
            minute = "0" + minute;
        }
        
        timeLabel.innerHTML = year + ", " + month + ", " + date + ", " + hour + ":" + minute;
        newNode.appendChild(timeLabel);
        
        let votePanel = document.createElement("form");
        votePanel.className = "votePanel";
        
        let nrOfLikes = document.createElement("span");
        let nrOfLikesCounter = 0;
        nrOfLikes.className = "counter";
        nrOfLikes.innerHTML = nrOfLikesCounter;
        votePanel.appendChild(nrOfLikes);
        
        let upVoteButton = document.createElement("input");
        upVoteButton.type = "radio";
        upVoteButton.name = "test";
        votePanel.appendChild(upVoteButton);
        
        let nrOfdislikes = document.createElement("span");
        let nrOfdislikesCounter = 0;
        nrOfdislikes.className = "counter";
        nrOfdislikes.innerHTML = nrOfdislikesCounter;
        votePanel.appendChild(nrOfdislikes);
        
        let downVoteButton = document.createElement("input");
        downVoteButton.type = "radio";
        downVoteButton.name = "test";
        votePanel.appendChild(downVoteButton);
        
        content.appendChild(votePanel);
        
        newNode.className = "messageDiv";
        newNode.appendChild(content);
        messageList.appendChild(newNode);
    }
    
})

sendButton.addEventListener("click", function() {
    let d = new Date();
    
    let newTime = {
        year : d.getFullYear(),
        month: d.getMonth(), 
        day: d.getDate(),
        hour: d.getHours(),
        minute: d.getMinutes()
    }
    let newMessage = {
        user : localStorage.getItem('user'),
        message : inputBoard.value,
        date : newTime
    };
    
    database.ref('/').push(newMessage);
});

logoutButton.addEventListener("click", function() {
    logIn();
});

function logIn() {
    let user = prompt("Enter User");
    localStorage.setItem('user', "Anton");
}







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

let keyList = [];

database.ref('/').on('value', function(snapshot) {
    let data = snapshot.val();
    let listOfMessages = [];
    
    if(data !== null) {
        let keys = Object.keys(data);
        keys.reverse();
        keyList = keys;
    }
    
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
            time : time,
            likers : r.likers,
            dislikers : r.dislikers,
            likes : r.likes,
            dislikes : r.dislikes
        }
        listOfMessages.push(newData);
    }
    
    listOfMessages.reverse();
    
    for(let i = 0; i < listOfMessages.length; i++) {
        
        let key = keyList[i];
        
        let user = listOfMessages[i].user;
        let message = listOfMessages[i].message;
        let year = listOfMessages[i].time.year;
        let month = listOfMessages[i].time.month;
        let date = listOfMessages[i].time.date;
        let hour = listOfMessages[i].time.hour;
        let minute = listOfMessages[i].time.minute;
        let likes = listOfMessages[i].likes;
        let dislikes = listOfMessages[i].dislikes;
        let likers = listOfMessages[i].likers;
        let dislikers = listOfMessages[i].dislikers;
        
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
        nrOfLikes.className = "counter";
        nrOfLikes.innerHTML = likes;
        votePanel.appendChild(nrOfLikes);
        
        let upVoteButton = document.createElement("input");
        upVoteButton.type = "checkbox";
        upVoteButton.name = "test";
        upVoteButton.checked = false;
        upVoteButton.addEventListener("click", function(){
            if(upVoteButton.checked == true) {
                
                let users = [];
                
                database.ref(key + '/').once('value', function(){
                    console.log("Något hände på " + key);
                    
                    likes = likes + 1;
                    let time = {
                        year : year,
                        month : month,
                        day : date,
                        hour : hour,
                        minute : minute
                    }
                    
                    let newLiker = {
                        user : user,
                        message : message,
                        date : time,
                        likers : likers,
                        dislikers : dislikers,
                        likes : likes,
                        dislikes : dislikes
                    }
                    
                    database.ref(key).set(newLiker);
                    database.ref(key + "/likers").push({
                        user : localStorage.getItem('user'),
                        key : key,
                        vote : 1                       
                    });
                    
                })
            }
            else {
                downVoteButton.disabled = false;
            }
        })
        votePanel.appendChild(upVoteButton);
        
        let nrOfDislikes = document.createElement("span");
        let nrOfDislikesCounter = dislikes;
        nrOfDislikes.className = "counter";
        nrOfDislikes.innerHTML = nrOfDislikesCounter;
        votePanel.appendChild(nrOfDislikes);
        
        let downVoteButton = document.createElement("input");
        downVoteButton.type = "checkbox";
        downVoteButton.name = "test";
        downVoteButton.checked = false;
        downVoteButton.addEventListener("click", function(){
            if(downVoteButton.checked == true) {
                upVoteButton.disabled = true;
                database.ref(key + '/').once('value', function(){
                    console.log("Något hände på " + key);
                    dislikes++;
                    let time = {
                        year : year,
                        month : month,
                        day : date,
                        hour : hour,
                        minute : minute
                    }
                    let newDisliker = {
                        user : user,
                        message : message,
                        date : time,
                        likers : likers,
                        dislikers : dislikers,
                        likes : likes,
                        dislikes : dislikes
                    }
                    database.ref(key).set(newDisliker);
                    database.ref(key + "/dislikers").push({
                        user : localStorage.getItem('user'),
                        key : key,
                        vote : 1                       
                    });
                })
            }
            else {
                upVoteButton.disabled = false;
            }
        })
        votePanel.appendChild(downVoteButton);
        
        content.appendChild(votePanel);
        
        newNode.className = "messageDiv";
        newNode.appendChild(content);
        messageList.appendChild(newNode);
    }
    
})

function elementExist(list, user) {
    for(let i = 0; i < list.length; i++) {
        if(list[i] == user){
            return true;
        }
    }
    return false;
}

sendButton.addEventListener("click", function() {
    let d = new Date();
    
    let newTime = {
        year : d.getFullYear(),
        month: d.getMonth(), 
        day: d.getDate(),
        hour: d.getHours(),
        minute: d.getMinutes()
    };
    
    let likers = {
        test : ""
    }
    
    let dislikers = {
        test : ""
    }
    
    let newMessage = {
        user : localStorage.getItem('user'),
        message : inputBoard.value,
        date : newTime,
        likers : likers,
        dislikers : dislikers,
        likes : 0,
        dislikes : 0
    };
    database.ref("/").push(newMessage);
});

logoutButton.addEventListener("click", function() {
    logIn();
});

function logIn() {
    let user = prompt("Enter User");
    localStorage.setItem('user', "Anton");
}


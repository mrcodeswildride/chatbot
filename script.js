var messageInput = document.getElementById("message");
var sendButton = document.getElementById("send");
var messagesContainer = document.getElementById("messages");

var numberMode = false;
var jokeMode = false;

messageInput.addEventListener("keydown", keyPressed);
sendButton.addEventListener("click", send);
messageInput.focus();

function keyPressed(event) {
    if (event.keyCode == 13) {
        send();
    }
}

function send() {
    var message = messageInput.value.trim();

    if (message != "") {
        var messageDiv = document.createElement("div");
        messageDiv.innerHTML = "<strong>You</strong>: " + message;
        messagesContainer.insertBefore(messageDiv, messagesContainer.children[0]);

        if (!numberMode) {
            message = cleanMessage(message);
        }

        var response = null;

        if (numberMode) {
            response = processNumber(message);
        }
        else if (jokeMode) {
            response = processJokeAnswer(message);
        }
        else {
            response = processMessage(message);
        }

        if (response) {
            setTimeout(showResponse, 400, response);
        }

        messageInput.value = "";
        messageInput.focus();
    }
}

function cleanMessage(message) {
    return message.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

function showResponse(response) {
    var responseDiv = document.createElement("div");
    responseDiv.innerHTML = "<strong>Bot</strong>: " + response;
    messagesContainer.insertBefore(responseDiv, messagesContainer.children[0]);
}

function processMessage(message) {
    if (message == "how are you") {
        var possibleResponses = ["I'm doing great.", "I'm fine.", "I'm okay."];

        return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    }
    else if (message == "what time is it") {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var amPm = "AM";

        if (hours >= 12) {
            hours = hours - 12;
            amPm = "PM";
        }

        if (hours == 0) {
            hours = 12;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return "The time is " + hours + ":" + minutes + " " + amPm + ".";
    }
    else if (message == "do a square root") {
        numberMode = true;

        return "Please type a number.";
    }
    else if (message == "tell a joke") {
        jokeMode = true;

        return "What do you call 2000 mockingbirds?";
    }
    else {
        return null;
    }
}

function processNumber(message) {
    if (isNaN(message)) {
        return "Please type a number.";
    }
    else {
        numberMode = false;

        return "The square root of " + message + " is " + Math.sqrt(message) + ".";
    }
}

function processJokeAnswer(message) {
    jokeMode = false;

    if (message == "two kilo mockingbird" || message == "2 kilo mockingbird") {
        return "That is correct.";
    }
    else {
        return "Two kilo mockingbird.";
    }
}

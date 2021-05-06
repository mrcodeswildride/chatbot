let message = document.getElementById(`message`)
let sendButton = document.getElementById(`sendButton`)
let you = document.getElementById(`you`)
let bot = document.getElementById(`bot`)

let jokeMode = false
let squareRootMode = false

sendButton.addEventListener(`click`, send)

message.addEventListener(`keydown`, keyPressed)
message.focus()

function send() {
  let messageValue = message.value.trim().toLowerCase()
  you.innerHTML = `<strong>You:</strong> ${messageValue}`

  if (jokeMode) {
    if (messageValue == `two kilo mockingbird`) {
      bot.innerHTML = `<strong>Bot:</strong> you must have heard this joke before`
    } else {
      bot.innerHTML = `<strong>Bot:</strong> two kilo mockingbird`
    }

    jokeMode = false
  } else if (squareRootMode) {
    if (messageValue == ``) {
      bot.innerHTML = `<strong>Bot:</strong> type a number`
    } else {
      let squareRoot = Math.sqrt(messageValue)
      bot.innerHTML = `<strong>Bot:</strong> the square root of ${messageValue} is ${squareRoot}`
      squareRootMode = false
    }
  } else {
    if (messageValue == `how are you`) {
      bot.innerHTML = `<strong>Bot:</strong> I'm doing great`
    } else if (messageValue == `tell a joke`) {
      bot.innerHTML = `<strong>Bot:</strong> what do you call 2000 mockingbirds?`
      jokeMode = true
    } else if (messageValue == `do a square root`) {
      bot.innerHTML = `<strong>Bot:</strong> type a number`
      squareRootMode = true
    } else if (messageValue == `xyzzy`) {
      bot.innerHTML = `<strong>Bot:</strong> nothing happens`
    } else {
      bot.innerHTML = `<strong>Bot:</strong> I don't understand`
    }
  }

  message.value = ``
  message.focus()
}

function keyPressed(event) {
  if (event.keyCode == 13) {
    send()
  }
}

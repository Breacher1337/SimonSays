function nextSequence() {
    let num = Math.floor(Math.random() * 4)
    return num
}

function playSound(name) {
    this.name = name
    
    switch (this.name) {
        case "green":
            audioGreen.play()
            break;
        case "red":
            audioRed.play()
            break;
        case "blue":
            audioBlue.play()
            break;
        case "yellow":
            audioYellow.play()
            break;
        default:
            break;
    }
}

function animatePress(currentColour) {
    $("#" + currentColour).attr("class", "btn " + currentColour + " pressed")
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
       }, 100);
       
    
}

function computerPlayPattern(color) {
    setTimeout(() => {
        $("#" + color).animate(animateproperties).animate(animateproperties)
        playSound(color)
    }, 1000);
    
    }
    

function checkAnswer(currentLevel) {
    console.log(currentLevel)

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(gamePattern.push(buttonColours[nextSequence()]), 1000)
            userClickedPattern = []
            computerPlayPattern(gamePattern[gamePattern.length-1])
            console.log("correct")
        }
    } else {
        audioWrong.play()
        $("body").addClass("game-over")
        setTimeout(function() {$("body").removeClass("game-over")}, 200)
        console.log("wrong")
        startOver()
    }


}

function startOver() {
    $("#level-title").html("Press any key to start")
    level = -1
    gamePattern = []
    userClickedPattern = []

    start = false

    
    
}

let level = 0

const audioGreen = new Audio("sounds/green.mp3");
const audioYellow = new Audio("sounds/yellow.mp3");
const audioBlue = new Audio("sounds/blue.mp3");
const audioRed = new Audio("sounds/red.mp3");
const audioWrong = new Audio("sounds/wrong.mp3");

let gamePattern = []
let userClickedPattern = []

let buttonColours = ["red", "blue", "green", "yellow"]

let randomChosenColour = buttonColours[nextSequence()]
gamePattern.push(randomChosenColour)

const animateproperties = {
    opacity: "toggle",
    duration: 100
}

$(document).on("click", function() {
    if (level == 0) {
        level++

        $("#level-title").html("Level " + level)
        computerPlayPattern(gamePattern)
    } else if (level == -1) {
        level = 0
    }
}
)

$("div.btn").click(function(event) {
    let userChosenColour = event.target.attributes[1].value
    animatePress(userChosenColour)
    playSound(userChosenColour)
    
    userClickedPattern.push(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
    

})


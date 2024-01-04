var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

//Button Click Listener
$(".btn").click(function() {

    if(!started)
    {
        alert("Press Any Key To Start");
        return;
    }

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    animatePress(userChosenColor);
    
    
    //For testing purpose
    // console.log(gamePattern);
    // console.log(userChosenColor);
});

//Double Button Click Listener
$(".btn").dblclick(function() {
    alert("Error: Double Click Detected!");

    //For testing purpose
    console.log("Game Pattern: " + gamePattern);
    console.log("User Pattern: " + userClickedPattern);

    playSound("Wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
})

//Keyboard Click Listener
$(document).keypress(function(event) {
    if(!started) {
       $("h1").text("Level " + level);
        nextSequence();
        started = true; 
    }
});

//Triggers for next sequence
function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

//Checks User Input is Correct or Not
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        playSound(gamePattern[currentLevel]);

        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {

        //For testing purpose
        console.log("Game Pattern: " + gamePattern);
        console.log("User Pattern: " + userClickedPattern);
        var errorMusic = "wrong";
        playSound(errorMusic);
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var music = "./sounds/" + name + ".mp3";
    var audio = new Audio(music);
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var level = 0;
var started = false;

/** function used to start the game when a letter is pressed */
$(document).keypress(function () {
   if (!started) {
    
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
   } 
});


/** Function used to detect a click, and play animation and sound*/
$(".btn").click( function () {
    var userChoosenColor = $(this).attr("id");

    userClickedPattern.push(userChoosenColor);
 
    playSound(userChoosenColor);
    animtePress(userChoosenColor);
    chechAnswer((userClickedPattern.length)- 1);
});

/** holds the sequence of colors used in the game  */

function nextSequence() {
   
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*(3 - 0 + 1)+ 0);
    
    var randomChoosenColor = buttonColor[randomNumber];

    gamePattern.push(randomChoosenColor);

$("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}
/** plays sounds file when clicked */
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
/** plays animation when clicked */
function animtePress(currentColor) {
      $("#" + currentColor).addClass("pressed");

        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    };
/**checks the user input sequence against the computer sequence */
function chechAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
       
       setTimeout(function()  {
        $("body").removeClass("game-over");
       }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart.");

       startOver();
    }
};
/** resets the game to play again */
    function startOver() {
        level =0;
        started =false;
        gamePattern = [];
    }
       
    
  

  
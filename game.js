var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = "false";   //Only call nextSequence() on the first keypress.
var level = 0;

//Create a New Sequence
function nextSequence() {

  //reset userClickedPattern at the start of each sequence
  //necessary to allow for each userChosenColor check
  userClickedPattern = [];

  //each time nextSequence is called, level++
  level++;

  //change h1 to match level
  $("#level-title").text("Level " + level);

  //choose random color, using math.Random and add to pattern
  //math.random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  //select next color, using array[random number]
  var randomChosenColor = buttonColors[randomNumber];
  //add next color to pattern[]
  gamePattern.push(randomChosenColor);

  //animate last random color
  $("#" + randomChosenColor).css({opacity: 0});
  $("#" + randomChosenColor).animate({opacity: 1}, 700 );
  playSound(randomChosenColor);

}

//listen for when button click to define userChosenColor
$(".btn").click(function() {
  //store ID of button chosen
  var userChosenColor = $(this).attr("id");
  //add to userClickedPattern
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  //call checkAnswer to confirm last clicked button === corresponding gamePattern
  checkAnswer(userClickedPattern.length - 1);

})

//play sound of userClickedPattern AND nextSequence
function playSound(name){
  //play sound
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//add .pressed to any button click
function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");

  // //timeout 100ms and remove .pressed
setTimeout(function(){
  $("." + currentColor).removeClass("pressed"); }, 100)
}

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).keydown(function() {

  if (gameStarted = "false"){
    $("h1").text("Level 0")
    nextSequence();
    gameStarted = "true";
  }
});

//check that userClickedPattern matches gamePattern
function checkAnswer(lastColorChosen) {

  // last array of gamePattern = last userClickedPattern
  if (userClickedPattern[lastColorChosen] === gamePattern[lastColorChosen]) {
    // if OK, initiate next Sequence
    console.log("success");

    // if userClickedPattern.length = gamePattern.length then initiate next sequence
    // and reset userClickedPattern to 0 - in
    if (userClickedPattern.length == gamePattern.length){
      setTimeout(nextSequence, 1000);
      console.log("level up!");

    }

  }

  //else, GAME OVER
  //GAME OVER: display h1 GAME OVER
  else {
    //change body css to game-over for 200ms
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }
};

//GAME OVER: reset Level, user Pattern, Game Pattern, started
function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}

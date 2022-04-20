var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColor = [];



function nextSequence() {

  userChosenColor = [];
  level++;

  $("#level-title").text("Level : " + level);

  function random_generator() {
    var random = Math.random();
    random = Math.floor(random * 4);
    return random;
  }

  var randomChosenColor = buttonColors[random_generator()];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound("sounds\\" + randomChosenColor + ".mp3")
}
var level = 0;
var started = false;

$(document).on("keypress", function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});




$(".btn").click(function() {
  var userColor = $(this).attr("id");
  userChosenColor.push(userColor);
  playSound("sounds\\" + userColor + ".mp3")
  animatePress(userColor);
  checkAnswer(userChosenColor.length - 1);
});

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenColor[currentLevel]) {
    if (gamePattern.length === userChosenColor.length) {
        setTimeout(nextSequence, 1000);
    }
  } else {
    gameover();
  }
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}
function gameover() {
  playSound("sounds\\wrong.mp3");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}

function startOver(){
  level = 0;
  gamePattern = [];
  $("#level-title").text("Press Any Key To Start");
  started = false;
}

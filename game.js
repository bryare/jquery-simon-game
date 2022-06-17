var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var toggle = false;

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

// var j = $("#" + grabColor(nextSequence()));
// $(j).fadeOut(100).fadeIn(100);

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  switch (name) {
    case "blue":
      var blue = new Audio("./sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("./sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("./sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("./sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      break;
  }
}

// var audio = new Audio("./sounds/wrong.mp3");
// audio.play();

// $(".btn").click(function () {
//   if ($(".btn").hasClass("green")) {
//     var userChosenColor = "green";
//   }
//   console.log(userChosenColor);
// });

$(".btn").click(function (e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("userClickedPattern" + userClickedPattern);

  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function (e) {
  if (!toggle) {
    $("#level-title").text("Level " + level);
    nextSequence();
    toggle = true;
  }
});

// $(document).on('keypress', function (e) {
//     if()
// })

// function checkAnswer(currentLevel) {
//   console.log("CURRENT LEVEL" + currentLevel);
//   console.log("GAME PATTERN " + gamePattern);
//   if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
//     console.log("success");

//     setTimeout(nextSequence(), 1000);
//     userClickedPattern = [];
//   }
///////////
//   else {
//       nextSequence();
//       userClickedPattern = [];
//     }
// if (userClickedPattern.length > gamePattern.length) {
//   console.log(userClickedPattern.length + " " + gamePattern.length);
//   $("body").addClass("game-over");
//   gamePattern = [];
// } else {
//   setTimeout(nextSequence(), 1000);
// }

///////////
//   else {
//     console.log(userClickedPattern.length + " SEPER " + gamePattern.length);
//     if (userClickedPattern.length > gamePattern.length) {
//       gamePattern = [];
//       console.log("GAME OVER");
//     }
//     console.log("Wrong");
//     nextSequence();
//   }
// }

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      console.log(userClickedPattern);
      userClickedPattern = [];
      setTimeout(nextSequence(), 1000);
    }
  } else {
    console.log("Wrong.");

    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    $("#level-title").text("Game Over, Press any key to restart.");
  }
}

function startOver() {
  level = 0;
  toggle = false;
  gamePattern = [];
  userClickedPattern = [];
}

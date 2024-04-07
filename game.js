var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 1;
var patternCount = 0;
console.log("newHit");
var finish = 0;
bindKeyDownOnce();


function bindKeyDownOnce() {
    $(document).on("keydown", function () {
        console.log("i am pressed");
        finish = 0;
        $("h1").text("Level " + level);
        nextSequence();
    });
}

function nextSequence() {
    $(document).off("keydown");
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour); // gamepattern add
    $("#" + randomChosenColour).animate({ opacity: 0.5 }).animate({ opacity: 1 });
    press();
}

function press() {
    $(".btn").on("click", function (e) {

        console.log("a");
        var userChosenColour = e.target.id;
        console.log(userChosenColour);
        userClickedPattern.push(userChosenColour); // userchosencolor add
        setTimeout(function () {
            togglePress(userChosenColour);
        }, 100);
        playSound(userChosenColour);
        togglePress(userChosenColour);
        patternCount++;
        if (!(checkAnswer(userClickedPattern, gamePattern))) {
            $(".btn").off("click");
            failed();
            finish = 1;
        }
        if ((patternCount == gamePattern.length) && (finish == 0)) {
            $(".btn").off("click");
            if (checkAnswer(userClickedPattern, gamePattern)) {
                setTimeout(function () {
                    updateLevel(); // Update level text
                    console.log("imposible");
                    nextSequence();
                    patternCount = 0;
                }, 1000);

            } else {
                failed();
            }
        }
    })
}

function playSound(name) {
    $("#audio-" + name)[0].play();
}

function togglePress(currentColour) {
    $("#" + currentColour).toggleClass("pressed");
}

function updateLevel() {
    level++;
    $("h1").text("Level " + level);
}

/**
 * Checks if two arrays are equal.
 * @param {any[]} MyArray - The first array.
 * @param {any[]} Answer - The second array.
 * @returns {boolean} True if the arrays are equal, false otherwise.
 */

function checkAnswer(MyArray, Answer) {
    for (var i = 0; i < MyArray.length; i++) {
        if (MyArray[i] != Answer[i]) {
            console.log("false");
            return false;
        }
    }
    if (patternCount == gamePattern.length) {
        userClickedPattern = [];
    }
    console.log(true);
    return true;
}

function failed() {
    $(document.body).addClass("game-over");
    patternCount = 0;
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    setTimeout(function () {
        $(document.body).removeClass("game-over");
    }, 200);
    setTimeout(function () {
        $("h1").text("Game Over, Press Any Key to Restart")
    }, 200);
    bindKeyDownOnce(); 
}
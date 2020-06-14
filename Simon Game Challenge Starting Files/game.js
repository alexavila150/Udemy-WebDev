let level = 0;
let sequence = [];
let index = 0;
let gameOver = true;
let buttons = [];
let animationIsRunning = false;

buttons.push($(".green"));
buttons.push($(".red"));
buttons.push($(".yellow"));
buttons.push($(".blue"));


$(document).keypress(function () {
    if(gameOver){
        gameStart();
    }
})

$(".btn").click(function (event) {
    console.log("sequence: " + sequence);
    if(!gameOver && !animationIsRunning){

        //clicked button is green
        if(event.target.classList.contains("green")){
            pressAnimation(".green");
            if(sequence[index] !== 0){
                lose();
            }
        }

        //clicked button is red
        if(event.target.classList.contains("red")){
            pressAnimation(".red");
            if(sequence[index] !== 1){
                lose();
            }
        }

        //clicked button is yellow
        if(event.target.classList.contains("yellow")){
            pressAnimation(".yellow");
            if(sequence[index] !== 2){
                lose();
            }
        }

        //clicked button is blue
        if(event.target.classList.contains("blue")){
            pressAnimation(".blue");
            if(sequence[index] !== 3){
                lose();
            }
        }

        if(!gameOver && index >= sequence.length - 1){
            setTimeout(function () {
                nextSequence();
                index = 0;
            }, 1000);
        }

        else if(!gameOver){
            index++;
        }
    }
})

//raises level and adds random number to sequence
function nextSequence() {
    level++;
    $("h1").text("level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    sequence.push(randomNumber);
    sequenceAnimation();
}

/**************************************************************************************
 *                              Animations
 * ************************************************************************************/


function sequenceAnimation() {
    console.log("sequence animation");
    //wait until animation is done
    animationIsRunning = true;
    setTimeout(function () {
        animationIsRunning = false;
        console.log("animation is done");
    }, sequence.length * 1000 + 1000);

    //recursive loop to call animation
    let i = 0;
    console.log("i: " + i);
    function loop() {
        //next button in sequence
        $(buttons[sequence[i]]).fadeTo(400, .2);

        setTimeout(function () {
            switch (sequence[i]) {
                case 0:
                    new Audio("sounds/green.mp3").play();
                    break;
                case 1:
                    new Audio("sounds/red.mp3").play();
                    break;
                case 2:
                    new Audio("sounds/yellow.mp3").play();
                    break;
                case 3:
                    new Audio("sounds/blue.mp3").play();
                    break;
            }
        }, 200);

        setTimeout(function () {
            $(buttons[sequence[i]]).fadeTo(400, 1);

            //continue loop until i == sequence.length
            i++;
            console.log("i: " + i);
            if(i < sequence.length){
                loop();
            }

        }, 1200);
    }

    console.log("loop()");
    loop();
}

function pressAnimation(buttonClass){
    //Play sound
    setTimeout(function () {
        switch (buttonClass) {
            case ".green":
                new Audio("sounds/green.mp3").play();
                break;
            case ".red":
                new Audio("sounds/red.mp3").play();
                break;
            case ".yellow":
                new Audio("sounds/yellow.mp3").play();
                break;
            case ".blue":
                new Audio("sounds/blue.mp3").play();
                break;
        }
    }, 200);

    $(buttonClass).addClass("pressed");
    setTimeout(function () {
        $(buttonClass).removeClass("pressed");
    }, 200);
}

function gameStart(){
    index = 0;
    level = 1;
    gameOver = false;
    sequence = [];
    sequence.push(Math.floor(Math.random() * 4));
    $("h1").text("level " + 1);
    sequenceAnimation();
}

function lose() {
    new Audio("sounds/wrong.mp3").play();
    index = 0;
    level = 0;
    gameOver = true;
    sequence = [];
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    animationIsRunning = true;
    setTimeout(function () {
        $("body").removeClass("game-over");
        animationIsRunning = false;
    }, 200);
}
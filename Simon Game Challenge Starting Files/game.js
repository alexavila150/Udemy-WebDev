let level = 0;
let sequence = [0, 2, 3];
let userSequence = [];
let gameOver = true;
let buttons = [];
let animationIsRunning = false;

buttons.push($(".green"));
buttons.push($(".red"));
buttons.push($(".yellow"));
buttons.push($(".blue"));


$(document).keypress(function () {
    if(gameOver){
        gameOver = false;
        nextSequence();
        $("h1").text("level " + level);
        sequenceAnimation();
    }
})

$(".btn").click(function (event) {
    console.log(animationIsRunning);
    if(!gameOver && !animationIsRunning){
        nextSequence();
        $("h1").text("level " + level);

        //clicked button is green
        if(event.target.classList.contains("green")){
            pressAnimation(".green");
            userSequence.push(0);
        }

        //clicked button is red
        if(event.target.classList.contains("red")){
            pressAnimation(".red");
            userSequence.push(1);
        }

        //clicked button is yellow
        if(event.target.classList.contains("yellow")){
            pressAnimation(".yellow");
            userSequence.push(2);
        }

        //clicked button is blue
        if(event.target.classList.contains("blue")){
            pressAnimation(".blue");
            userSequence.push(3);
        }

    }
})

function nextSequence() {
    level++;
    let randomNumber = Math.floor(Math.random() * 3);
    sequence.push(randomNumber);
}

/**************************************************************************************
 *                              Animations
 * ************************************************************************************/


function sequenceAnimation() {
    //wait until animation is done
    animationIsRunning = true;
    setTimeout(function () {
        animationIsRunning = false;
    }, sequence.length * 1000 + 1000);

    //recursive loop to call animation
    let i = 0;
    function loop() {
        //next button in sequence
        $(buttons[sequence[i]]).fadeTo(1000, .2);

        setTimeout(function () {
            $(buttons[sequence[i]]).fadeTo(1000, 1);

            //continue loop until i == sequence.length
            i++;
            if(i < sequence.length){
                loop();
            }

        }, 1000);
    }

    loop();
}

function pressAnimation(buttonClass){
    $(buttonClass).addClass("pressed");
    setTimeout(function () {
        $(buttonClass).removeClass("pressed");
    }, 200);
}

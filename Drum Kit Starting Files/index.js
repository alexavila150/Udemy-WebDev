let buttons = document.querySelectorAll(".drum");
for(let i = 0; i < buttons.length; i++) {
    let keyIsDown = false;

    buttons[i].addEventListener("click", function () {
        let buttonInnerHTML = this.innerHTML;
        charToSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });

}

document.addEventListener("keydown", function (event) {
    let char = event.key;
    charToSound(char);
    buttonAnimation(char);
})


function charToSound(char) {
    switch (char) {
        case "w":
            audio = new Audio("sounds/tom-1.mp3");
            break;
        case "a":
            audio = new Audio("sounds/tom-2.mp3");
            break;
        case "s":
            audio = new Audio("sounds/tom-3.mp3");
            break;
        case "d":
            audio = new Audio("sounds/tom-4.mp3");
            break;
        case "j":
            audio = new Audio("sounds/crash.mp3");
            break;
        case "k":
            audio = new Audio("sounds/kick-bass.mp3");
            break;
        case "l":
            audio = new Audio("sounds/snare.mp3");
    }

    audio.play();
}

function buttonAnimation(key) {
    let activeButton = document.querySelector("." + key);
    activeButton.classList.add(`pressed`);

    setTimeout(function () {
        activeButton.classList.remove('pressed');
    }, 100);
}

let randomNumber = Math.floor(Math.random() * 6 + 1);

let diceImg1 = document.querySelector(".img1");
diceImg1.src = "images/dice" + randomNumber + ".png";

let randomNumber2 = Math.floor(Math.random() * 6 + 1);

let diceImg2 = document.querySelector(".img2");
diceImg2.src = "images/dice" + randomNumber2 + ".png";


let header = document.querySelector("h1");

//Decide the winner
if(randomNumber > randomNumber2){
    header.innerHTML = "Player 1 Wins!";
}else if(randomNumber2 > randomNumber){
    header.innerHTML = "Player 2 Wins!";
}else {
    header.innerHTML = "Draw!";
}
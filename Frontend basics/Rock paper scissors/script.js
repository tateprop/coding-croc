const options = ["rock", "paper", "scissors"];
const winningCombos = {
    rock : "scissors",
    paper : "rock",
    scissors : "paper",
};
let scoreBoard = {
    playerScore : 0,
    computerScore : 0,
}
let welcomeMessage = "Lets Play!!"

function initiateGameLoop(){
    let popupElem = document.querySelector(".popup-container")
    popupElem.style.display = "none"
    setElementText("outcome", welcomeMessage)
    setElementText("score", "")
}
function endGame(){
    let newGameMessage = (scoreBoard.playerScore == 5) ? "You Won the Game" : "You Lost the Game :("
    let newGameMessageCont = (scoreBoard.playerScore == 5) ? "That's a pretty awesome achievement. Well done!" : "Lmao you lost. Loooooooooserrrrr!"
    scoreBoard.playerScore = 0
    scoreBoard.computerScore = 0
    let popupElem = document.querySelector(".popup-container")
    popupElem.style.display = "flex"
    setElementText("gameStatus", newGameMessage)
    setElementText("gameMessage", newGameMessageCont)
    clearAllFilters()
}
function clearAllFilters(){
    let idList = ["computerChoice", "rock", "paper", "scissors"];
    for (let i = 0; i < idList.length; i++) {
        let element = idList[i];
        document.getElementById(element).classList.remove("red-outline")
        document.getElementById(element).classList.remove("green-outline")
    }
}
function parsePlayerChoice(playerChoice){
    let computerChoice = getComputerChoice()
    clearAllFilters()
    playRound(playerChoice, computerChoice)

    let currentScore= `${scoreBoard.playerScore} vs ${scoreBoard.computerScore}`
    setElementText("score", currentScore)

    if (scoreBoard.playerScore == 5 || scoreBoard.computerScore ==5){
        endGame()
    }
}
function processDraw(){
    setElementText("outcome", "It's a draw :/")
}
function processWin(playerChoice){
    scoreBoard.playerScore++
    setElementText("outcome", "You won!")
    document.getElementById("computerChoice").classList.add("red-outline")
    document.getElementById(playerChoice).classList.add("green-outline")
}
function processLoss(playerChoice){
    scoreBoard.computerScore++
    setElementText("outcome", "You lost :(")
    document.getElementById("computerChoice").classList.add("green-outline")
    document.getElementById(playerChoice).classList.add("red-outline")
}
function getComputerChoice(){
    let optionsLength = options.length;
    let choice = options[Math.floor(Math.random()*optionsLength)];
    return choice
}
function playRound(playerChoice, computerChoice){
    let imageSrc = `images/${computerChoice}.svg`;
    document.getElementById("computerChoice").src = imageSrc;
    (playerChoice==computerChoice) ? processDraw() : (winningCombos[playerChoice]==computerChoice) ? processWin(playerChoice) : processLoss(playerChoice);
}
function setElementText(id,text){
    document.getElementById(id).textContent = text;
}

document.addEventListener('DOMContentLoaded', function() {
    initiateGameLoop(welcomeMessage)
});

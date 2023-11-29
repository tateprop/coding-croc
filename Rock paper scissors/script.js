const options = ["rock", "paper", "scissors"];
const winningCombos = {
    rock : "scissors",
    paper : "rock",
    scissors : "paper",
};

function getComputerChoice(){
    let optionsLength = options.length;
    let choice = options[Math.floor(Math.random()*optionsLength)];
    return choice
}
function playRound(playerChoice, computerChoice){
    let outcome = (playerChoice==computerChoice) ? "draw" : (winningCombos[playerChoice]==computerChoice) ? "won" : "lost"
    return outcome
}

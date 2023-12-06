let gameBoard = []
let pieceOrder = ["rook", "knight", "bishop","queen", "king", "bishop", "knight", "rook"]
let pieceMovement = {
  "rook" : {"moves" : [[1,0], [0, 1]], "many": true},
  "knight" : {"moves" : [[2,1], [1, 2]], "many": false},
  "bishop" : {"moves" : [[1,1]], "many": true},
  "queen" : {"moves" : [[1,0], [0, 1], [1, 1]], "many": true},
  "king" : {"moves" : [[1,0], [0, 1], [1, 1]], "many": false},
  "pawn" : {"moves" : [[1,0]], "many": false}
}

class ConstructBoardElement {
  constructor(index) {
    let row = Math.trunc(index / 8);
    this.bgColor = ((index + row) % 2) ? "black" : "white";
    this.color = (row <= 1) ? "black" : (row >= 6) ? "white" : null;
    this.piece = (row == 0 || row == 7) ? pieceOrder[index % 8] : (row == 1 || row == 6) ? "pawn" : null;
    this.hasMoved = false
  }
}
function between(x, min, max) {
  return x >= min && x <= max;
}
function moveIsLegal(index, movePair){
 let row = Math.trunc(index / 8)
 let column = index % 8
 if (between(row+movePair[0], 0, 7) && between(column+movePair[1], 0, 7)){
  let newIndex = index + movePair[0] * 8 + movePair[1]
  if (gameBoard[newIndex]["color"]){
    return gameBoard[newIndex]["color"]
  }
  else
    return true
 }
 return false
}
function getLegalMoves(index){
  let pieceData = gameBoard[index]
  let pairs = [[1,1], [-1, -1], [1, -1], [-1,1]]

  if (pieceData["piece"]){
    let legalMoves = []
    let pieceMoves = pieceMovement[pieceData["piece"]]
    let captures = []
    for (let i = 0; i < pieceMoves["moves"].length; i++) {
      const movePair = pieceMoves["moves"][i];

      let loops = (pieceMoves["many"]) ? 7 : 1
      let allMovePairs = Array.from({ length: (!!movePair[0] + !!movePair[1])*2 }, (v ,x) => [movePair[0]*pairs[x][0], movePair[1]*pairs[x][1]]);
      for (let x = 0; x < allMovePairs.length; x++) {
        let singleMovePair = allMovePairs[x];
        for (let y = 0; y < loops; y++) {
          let currMovePair = [singleMovePair[0]*(y+1), singleMovePair[1]*(y+1)]
          let legal = moveIsLegal(index, currMovePair)
          switch (legal){
            case true:
              legalMoves.push(currMovePair)
            case false:
              continue
            default:
              if (legal != pieceData["color"]){
                captures.push(currMovePair)
              }
              y = loops
          }
        }
      }
    }
    return [legalMoves, captures]
  }
}
function clearSelected(){
  a = document.querySelectorAll(".selected")
  a.forEach((i) => {
    i.classList.remove("selected")
  });
  b = document.querySelectorAll(".capture")
  b.forEach((i) => {
    i.classList.remove("capture")
  });
}
function displayMoves(index){
  let [legalMoves, captures] = getLegalMoves(index)
  clearSelected()
  for (let x = 0; x < legalMoves.length; x++) {
    let id = legalMoves[x][0]*8+legalMoves[x][1] + index;
    document.querySelector(`#a${id}`).classList.add("selected")
  }
  for (let x = 0; x < captures.length; x++) {
    let id = captures[x][0]*8+captures[x][1] + index;
    document.querySelector(`#a${id}`).classList.add("capture")
  }
}
function generateBoard(){
  let parent = document.querySelector(".board-container")
  for (let i = 0; i < 64; i++) {
    let boardElement = new ConstructBoardElement(i) 
    gameBoard.push(boardElement)
    let newDiv = document.createElement("div")
    newDiv.innerHTML = boardElement["piece"]
    newDiv.className = `board-square ${boardElement["bgColor"]}`
    newDiv.id = "a"+i
    parent.appendChild(newDiv)
  }
}

document.addEventListener('DOMContentLoaded', function(){
  generateBoard()
}, false);
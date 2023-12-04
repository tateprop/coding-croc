let gameBoard = []
let pieceOrder = ["rook", "knight", "bishop","queen", "king", "bishop", "knight", "rook"]

function generateBoard(){
    for (let i = 0; i < 64; i++) {
        let row = Math.trunc(i/8)
        let tempDict = {}
        tempDict["bg-color"] = ((i+row)%2) ? "black" : "white"
        tempDict["color"] = (row <= 1) ? "black" : (row >= 6) ? "white" : null
        tempDict["piece"] = (row == 0 || row == 7) ? pieceOrder[i%8] : (row == 1 || row == 6) ? "pawn" : null
        gameBoard.push(tempDict)
    }
}
function initGame(){
    generateBoard()
    
}
let screenWidth;
let screenHeight;
let randomCounter;
let foundPosition;
let x;
let y;
let elemX;
let elemY;
let elemXb;
let elemYb;
let elem;
let elemList = [];
let conflict;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
function getCoordinates(centerPoint, elemSize, elemList, padding){
    screenWidth = screen.width/8*6 - elemSize;
    screenHeight= screen.height - elemSize - screen.height/6;
    randomCounter = 0;
    foundPosition = false;
    while (randomCounter<50 && !foundPosition){
        x = randomInt(0, screenWidth) + screen.width/8;
        y = randomInt(0, screenHeight);
        conflict = true
        foundPosition = false;
        if (! (centerPoint[0] <= x && x <= centerPoint[2] && centerPoint[1] <= y && y <= centerPoint[3] )) {
            conflict = false
            for (let i = 0; i < elemList.length; i++) {
                elem = elemList[i]
                elemX = elem[0] - padding
                elemY = elem[1] -padding
                elemXb = elemX + elemSize + padding
                elemYb = elemY + elemSize + padding
                
                if (elemX <= x && x <= elemXb && elemY <= y && y <= elemYb ) {
                    conflict = true
                }
            }
        }
        randomCounter++;
        if (!conflict){
            foundPosition = true;
        }
    }
    if (foundPosition){
        return [x, y]
    }
    else{
        return [undefined, undefined]
    }
}
let coordinates = [];
let doodleName;
let centerPoint;
let padding;
function placeDoodles(centerPoint){
    padding = 200;
    elemList = []
    for (let a = 0; a < 10; a++){
        doodleName = "doodle" + (a+1)
        coordinates = getCoordinates(centerPoint, screen.height/10, elemList ,padding)
        if (coordinates[0]){
            elemList.push(coordinates)
            console.log(coordinates)
            document.getElementsByClassName(doodleName)[0].style.left = Math.round(coordinates[0]/screen.width*100)+ "vw"
            document.getElementsByClassName(doodleName)[0].style.top = Math.round(coordinates[1]/screen.height*100) + "vh"
        } 
        else{
            document.getElementsByClassName(doodleName)[0].style.display = "None"
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let starty = screen.height/6
    let startx = (screen.width < 500) ? screen.width/5 : screen.width/3
    let endx = (screen.width < 500) ? screen.width/5*4: startx + 600
    centerPoint = [startx, starty, endx + 600, starty*3]
    placeDoodles(centerPoint);
  });

  window.onscroll = function() {myFunction()};

  function myFunction() {
    let scrolled = document.body.scrollTop || document.documentElement.scrollTop;
    if (!(scrolled % 20)){
        let starty = screen.height/6
        let startx = (screen.width < 500) ? screen.width/5 : screen.width/3
        let endx = (screen.width < 500) ? screen.width/5*4: startx + 600
        centerPoint = [startx, starty, endx + 600, starty*3]
        placeDoodles(centerPoint);
    }
}
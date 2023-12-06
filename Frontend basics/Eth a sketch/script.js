let randomMode = false
let eraserMode = false
let color = "#000000"
let mouseDown = 0;

function changeColor(gridElem){
    if (mouseDown<0){
        mouseDown=0
    }
    if (mouseDown>1){
        mouseDown=0
    }
    if (mouseDown){
        color = document.querySelector("#colorpicker").value
        if (randomMode){
            color = `#${Math.floor(Math.random()*16777215).toString(16)}`
        }
        if (eraserMode){
            color = "#ffffff"
        }
        gridElem.style.background = color
    }
}
function addGrid(n){
    let gridParent = document.querySelector(".grid-container")
    let gridElems = document.querySelectorAll(".grid-elem")
    gridElems.forEach((elem) => elem.remove())
    for (let i = 0; i < n**2; i++) {
        let gridElem = document.createElement('div');
        gridElem.classList.add('grid-elem');
        gridElem.style.width = `${100/n}%`
        gridElem.style.height = `${100/n}%`
        gridElem.addEventListener('mouseover', () => changeColor(gridElem))

        gridParent.appendChild(gridElem)
    }
}
function getValue(){
    let width = screen.width;
    if (width < 800){
        let elem = document.querySelector("#gridInput");
        let gridSize = elem.value;
        elem.value = "";
        (+gridSize <= 100) ? addGrid(gridSize) : "";
    }
    else{
        let slider = document.querySelector("#gridSlider")
        let gridSize = slider.value;
        addGrid(gridSize)
    }
}
function setRandomMode(){
    randomMode = (randomMode==true) ? false : true
    let randomButton = document.querySelector("#random")
    randomButton.innerHTML = `Random: ${(randomMode) ? "On" : "Off"}`
}
function setEraserMode(){
    eraserMode = (eraserMode==true) ? false : true
    let eraserButton = document.querySelector("#eraser")
    eraserButton.innerHTML = `Eraser: ${(eraserMode) ? "On" : "Off"}`
}
window.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('mousedown', function() {++mouseDown;console.log(mouseDown)})
    document.addEventListener('mouseup', function() {--mouseDown;console.log(mouseDown)})

    let slider = document.querySelector("#gridSlider")
    let output = document.querySelector("#sliderValue")

    slider.addEventListener('input', function(){
        output.innerHTML = `Grid size: ${this.value}`;
    }, false);
}, false);

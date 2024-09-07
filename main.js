//Movement Variables
const movement_speed = 10;
const sprint_speed = 30;
const radius = 30;
const canvasWidth = 700;
const canvasHeight = 400;
const minX = 10;
const maxX = 690;
const minY = 10;
const maxY = 390;
var x = 30;
var y = 30;
var sprintMode = false;
const dx = getRandomNumber(10, 680);
const dy = getRandomNumber(10, 380);

//setup
console.log("destinationX = " + dx);
console.log("destinationY = " + dy);

document.addEventListener('DOMContentLoaded', distance);
window.addEventListener('keydown', keyDown);
document.addEventListener('keydown', function (e) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'F12', ' '].includes(e.key)) {
        e.preventDefault();
    }
     if((e.ctrlKey && e.shiftKey) && '73') {
        e.preventDefault();
     } else if((e.ctrlKey && e.shiftKey) && '74') {
        e.preventDefault();
     }
});
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

//P5.js functions
function preload() {

}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("#canvas");
    background(255, 255, 255);
}

function draw() {
    background(255, 255, 255);
    fill(0, 0, 255);
    stroke(0, 100, 255);
    circle(x, y, radius);
    noFill();
    noStroke();
}

//game control functions
function moveUp() {
    if (sprintMode === false) {
        y = Math.max(y - movement_speed, minY);
    } else {
        y = Math.max(y - sprint_speed, minY);
    }
    update();
}

function moveDown() {
    if (sprintMode === false) {
        y = Math.min(y + movement_speed, maxY);
    } else {
        y = Math.min(y + sprint_speed, maxY);
    }
    update();
}

function moveLeft() {
    if (sprintMode === false) {
        x = Math.max(x - movement_speed, minX);
    } else {
        x = Math.max(x - sprint_speed, minX);
    }
    update();
}

function moveRight() {
    if (sprintMode === false) {
        x = Math.min(x + movement_speed, maxX);
    } else {
        x = Math.min(x + sprint_speed, maxX);
    }
    update();
}

function sprint() {
    if (sprintMode === false) {
        sprintMode = true;
        document.getElementById("sprint_status").innerHTML = "Sprint mode is on";
        document.getElementById("sprint_status").style.color = "green";
        console.log("Sprint Mode On");
    } else {
        sprintMode = false;
        document.getElementById("sprint_status").innerHTML = "Sprint mode is off";
        document.getElementById("sprint_status").style.color = "rgb(167, 0, 0)";
        console.log("Sprint Mode Off");
    }
}

function update() {
    document.getElementById("coordinates").innerHTML = "x = " + x + ", y = " + y;
    console.log("x = " + x + ", y = " + y);
    distance();
}

function getRandomNumber(min, max) {
    min = Math.ceil(min / 10) * 10;
    max = Math.floor(max / 10) * 10;

    const range = (max - min) / 10 + 1;
    const randomMultiple = Math.floor(Math.random() * range);
    return min + randomMultiple * 10;
}

function distance() {
    if (Math.abs(x - dx) >= 300) {
        document.getElementById("x-check").style.backgroundColor = "red";
    } else if (Math.abs(x - dx) >= 150) {
        document.getElementById("x-check").style.backgroundColor = "yellow";
    } else if (Math.abs(x - dx) > 0) {
        document.getElementById("x-check").style.backgroundColor = "green";
    } else if (x == dx) {
        document.getElementById("x-check").style.backgroundColor = "rgb(0, 0, 255)";
    }

    if (Math.abs(y - dy) >= 300) {
        document.getElementById("y-check").style.backgroundColor = "red";
    } else if (Math.abs(y - dy) >= 150) {
        document.getElementById("y-check").style.backgroundColor = "yellow";
    } else if (Math.abs(y - dy) > 0) {
        document.getElementById("y-check").style.backgroundColor = "green";
    } else if (y == dy) {
        document.getElementById("y-check").style.backgroundColor = "rgb(0, 0, 255)";
    }

    if (x == dx && y == dy) {
        document.getElementById("win-statement").innerHTML = "You Win!!, Restarting game...";
        setInterval(() => {
            window.location.reload();
            clearInterval(interval);
        }, 1500);
    }
}

function keyDown(e) {
    keyPressed = e.keyCode;
    console.log(keyPressed);

    if (keyPressed == '38') {
        moveUp();
        console.log("UP");
    }
    if (keyPressed == '40') {
        moveDown();
        console.log("DOWN");
    }
    if (keyPressed == '37') {
        moveLeft();
        console.log("LEFT");
    }
    if (keyPressed == '39') {
        moveRight()
        console.log("RIGHT");
    }
    if (keyPressed == '32') {
        sprint();
        console.log("SPRINT");
    }
}

//timer functions
function timer_start() {
    let time = 15;
    const interval = setInterval(() => {
        time--;
        document.getElementById("time").innerHTML = time;
        if (time <= 0) {
            clearInterval(interval);
            if (document.getElementById("win-statement").innerHTML == "You win, Restarting game...") {
                document.getElementById("win-statement").innerHTML = "You win, Restarting game..."
            } else {
                document.getElementById("win-statement").innerHTML = "Time's out, Restarting..."
            }
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }, 1000);
}

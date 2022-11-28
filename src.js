const corgi = document.getElementById('corgi');
let makeAJump = false; // keeps the jump from happening twice, you can only jump once, if it's true corgi cannot jump 
let speed = 0.7;
let gameOver = false;
const message = document.getElementById('message');
document.getElementById("start-over").style.display = "none";
let score = 0;
const increment = document.getElementById("increment-counter");
increment.innerHTML = score;
const startOverButton = document.getElementById("start-over");
let bottom = 0;
let goRight = false;
let right = 0;
let goLeft = false;
let left = 0;
let rightTimerId
let leftTimerId
let obstacleX = 0;
let width = window.innerWidth;


function move(e) {
    if (e.keyCode === 38) { // when spacebar is pressed do makeAJump
        if (makeAJump === false) { // you can't jump twice, only once 
            let makeAJump = true; // invoke the jump
            jump()  // move corgi up and down 
            makeObstacles()
            increment.innerHTML = ++score;
            makeBoneAppear()
        }
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 37) {
        moveLeft();
    }
}

document.addEventListener('keydown', move); // event listener that listens for spacebar
let position = 0;

function jump() {
    let count = 0;
    if (makeAJump) return;
    const timerId = setInterval(function () {
        // move down 
        if (count === 15) { // sets the max height to jump
            clearInterval(timerId)
            let downTimerId = setInterval(function () {
                if (count === 0) {
                    clearInterval(downTimerId); // stop the up function
                    makeAJump = false;  // makes it so corgi can jump again 
                }
                position -= 5;
                count--
                position = position * speed; // makes it look less jerkish and more natural
                corgi.style.bottom = position + 'px';
            }, 20) // happens every 20 milliseconds until timer ID is cleared 
        }
        //move up
        makeAJump = true;
        count++
        position += 100;
        position = position * speed;
        corgi.style.bottom = position + 'px';
    }, 20);
}

const canvas = document.getElementById('canvas');

function makeObstacles() {
    let randomNum = Math.floor(Math.random() * 100) + 10000;
    let obstacleX = 2500;
    const obstacle = document.createElement('div');
    if (gameOver == false) obstacle.setAttribute('id', 'obstacle');
    console.log(obstacle)
    canvas.appendChild(obstacle); // go into  canvas 
    obstacle.style.left = obstacleX + 'px';

    let timerId = setInterval(function () {
        if (position < 60 && Math.round(left/10)*10 == Math.round(obstacleX/10)*10) { 
            clearInterval(timerId);
            message.innerHTML = "GAME OVER!"
            gameOver = true;
            if (canvas.firstChild) {
                canvas.removeChild(canvas.lastChild);
            }
            document.getElementById("corgi").style.display = "none";
            document.getElementById("title").style.display = "none";
            document.getElementById("instructions1").style.display = "none";
            document.getElementById("start-over").style.display = "block";
            document.getElementById("instructions2").style.display = "none";
        }
        obstacleX -= 2;
        obstacle.style.left = obstacleX + 'px';
    }, 5)

    if (gameOver == false)
        setTimeout(makeObstacles, randomNum);
}

startOverButton.onclick = () => {
    location.reload();
};

// create a div that is for the bone 
function makeBoneAppear() {
    if (increment.innerHTML > 3) {
        let randomNum = Math.floor(Math.random() * 100) + 10000;
        let obstacleX = 800;
        const treat = document.createElement('div');
        if (gameOver == false) treat.setAttribute('id', 'treat');
        console.log(treat)
        canvas.appendChild(treat); // go into  canvas 
        treat.style.left = obstacleX + 'px';
    }
}

function moveLeft() {
    if (goRight) {
        clearInterval(rightTimerId);
        goRight = false;
    }
    goLeft = true;
    leftTimerId = setInterval(function () {
        left -= 5;
        corgi.style.left = left + 'px';
        if (left < 0) {
            moveRight();
        }
    }, 20)
}

function moveRight() {
    if (goLeft) {
        clearInterval(leftTimerId)
        goLeft = false;
    }
    goRight = true;
    rightTimerId = setInterval(function () {
        left += 5;
        corgi.style.left = left + 'px';
        if (left > width) {
            moveLeft();
        }
    }, 20)
}












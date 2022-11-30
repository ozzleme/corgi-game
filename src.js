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
document.addEventListener('keyup', move); // event listener that listens for up
let position = 0;
const canvas = document.getElementById('canvas');
let randomNum = 0;
let isBone = false;
let boneX = 0;
const myBackgroundAudio = document.createElement("audio");
const dogBarkAudio = document.createElement("audio");
const dogWhineAudio = document.createElement("audio");



function move(e) {
    document.getElementById("instructions1").style.display = "none";
    document.getElementById("instructions2").style.display = "none";
    if (e.keyCode === 38) { // when up arrow is pressed do makeAJump
        if (makeAJump === false) { // you can't jump twice, only once 
            let makeAJump = true; // invoke the jump
            jump()  // move corgi up and down 
            makeObstacles()
            if (isBone == false) {
                makeBoneAppear()
            }
            myBackgroundAudio.src = "/music/forest-background.mp3";
            myBackgroundAudio.play();
        }
    } else if (e.keyCode === 39) { 
        moveRight()
    } else if (e.keyCode === 37) {
        moveLeft();
    }
}

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


function makeObstacles() {
    let randomNum = Math.random() * 100000
    console.log(randomNum)
    let obstacleX = width + 500;
    const obstacle = document.createElement('div');
    if (gameOver == false) obstacle.setAttribute('id', 'obstacle');
    canvas.appendChild(obstacle); // go into  canvas 
    obstacle.style.left = obstacleX + 'px';

    let timerId = setInterval(function () {
        if (position < 60 && Math.round(left / 10) * 10 == Math.round(obstacleX / 10) * 10) {
            clearInterval(timerId);
            message.innerHTML = "You are slower than a turtle.<br> Game Over! 🐢 "
            document.getElementById("start-over").style.display = "block";
            myBackgroundAudio.pause();
            dogWhineAudio.src = "/music/whine.mp3"
            dogWhineAudio.play()
            gameOver = true;
            if (canvas.firstChild) {
                canvas.removeChild(canvas.lastChild);
            }
            document.getElementById("corgi").style.display = "none";
            document.getElementById("obstacle").style.display = "none";
            document.getElementById("title").style.display = "none";
            document.getElementById("instructions1").style.display = "none";
            document.getElementById("instructions2").style.display = "none";
        }
        obstacleX -= 2;
        obstacle.style.left = obstacleX + 'px';
    }, 20)

    if (gameOver == false)
        setTimeout(makeObstacles, randomNum);
}

startOverButton.onclick = () => {
    location.reload();
    dogWhineAudio.pause();
};

// create a div that is for the bone

function makeBoneAppear() {
    let randomNum = Math.random() * 100000
    let obstacleX = width + 500;
    let max = 800;
    let min = 200;
    let boneLocation = (Math.floor(Math.random() * (max - min + 1)) + min)
    const treat = document.createElement('div');
    if (gameOver == false) treat.setAttribute('id', 'treat');
        canvas.appendChild(treat); // go into  canvas 
        treat.style.left = boneLocation + 'px';
        isBone = true;

    let timerId = setInterval(function () {
        if (position < 60 && Math.round(left / 10) * 10 == Math.round(boneLocation / 10) * 10) {
            clearInterval(timerId);
            increment.innerHTML = ++score;
            dogBarkAudio.src="/music/single-bark.mp3";
            dogBarkAudio.play();
            isBone = false;
            if (canvas.firstChild) {
                canvas.removeChild(canvas.lastChild);
            }
            document.getElementById("treat").style.display = "none";
        }
        obstacleX -= 2;
        obstacle.style.left = obstacleX + 'px';
    }, 20)

    if (isBone == false)
    setTimeout(makeBoneAppear, randomNum);
    dogBarkAudio.pause();
}




function moveLeft() {
    if (goRight) {
        clearInterval(rightTimerId);
        goRight = false;
    }
    goLeft = true;
    leftTimerId = setInterval(function () {
        left -= 3;
        corgi.style.left = left + 'px';
        if (left < 0) {
            moveRight();
            left = 0;
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
        left += 3;
        corgi.style.left = left + 'px';
        if (left > width) {
            moveLeft();
            left = width;
        }
    }, 20)
}













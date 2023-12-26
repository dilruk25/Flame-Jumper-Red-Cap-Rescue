var runSound = new Audio("assets/run.mp3");
var jumpSound = new Audio("assets/jump.mp3");
var deadSound = new Audio('assets/dead.mp3');

runSound.loop = true;

function keyCheck(event) {
    //enter
    if (event.which == 13) {
        if (runWorkerId == 0) {
            blockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlock, 100);
            runWorkerId = setInterval(run, 100);
            runSound.play();
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100)
        }
    }
    //space
    if (event.which == 32) {
        if (jumpWorkerId == 0) {
            clearInterval(runWorkerId);
            runWorkerId = -1;
            runSound.pause();
            jumpWorkerId = setInterval(jump, 100);
            jumpSound.play();
        }
    }
}

var player = document.getElementById("player");

//run
var runWorkerId = 0;
var runImageNumber = 1;

function run() {
    runImageNumber = (runImageNumber % 8) + 1;
    player.src = "assets/Run (" + runImageNumber + ").png";
}

//jump
var jumpWorkerId = 0;
var jumpImageNumber = 1;
var playerMarginTop = 310;

function jump() {
    jumpImageNumber++;

    //fly
    if (jumpImageNumber <= 7) { 
        playerMarginTop -= 30;
        moveBlocksUp(30);
        
    }
    //land
    if (jumpImageNumber >= 8) { 
        playerMarginTop += 30;
        moveBlocksDown(30);
    }

    player.style.marginTop = playerMarginTop + "px";

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run, 100);
        runSound.play();

        jumpWorkerId = 0;

        if (backgroundWorkerId === 0) {
            backgroundWorkerId = requestAnimationFrame(moveBackground);
        }
        
        if (blockWorkerId == 0) {
            blockWorkerId = setInterval(createBlock, 100);
        }

        if (moveBlockWorkerId === 0) {
            moveBlockWorkerId = requestAnimationFrame(moveBlock);
        }

        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore, 300);
        }
    }

    player.src = "assets/Jump (" + jumpImageNumber + ").png";
}

function moveBlocksUp(amount) {
    for (var i = 1; i < blockNumber; i++) {
        var currentBlock = document.getElementById("block" + i);
        var newMarginTop = parseInt(currentBlock.style.marginTop) - amount;
        currentBlock.style.marginTop = newMarginTop + "px";
    }
}

function moveBlocksDown(amount) {
    for (var i = 1; i < blockNumber; i++) {
        var currentBlock = document.getElementById("block" + i);
        var newMarginTop = parseInt(currentBlock.style.marginTop) + amount;
        currentBlock.style.marginTop = newMarginTop + "px";
    }
}

// background
var background = document.getElementById("background");

// move backward
var positionX = 0;
var backgroundWorkerId = 0;

function moveBackground() {
    positionX -= 5;
    background.style.backgroundPositionX = positionX + "px";
    requestAnimationFrame(moveBackground);
}

// create block
var blockWorkerId = 0;
var blockMarginLeft = 700;
var blockNumber = 1;

function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockNumber++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = gap + blockMarginLeft;
    block.style.marginLeft = blockMarginLeft + "px";

    background.appendChild(block);
}

//move blocks
var moveBlockWorkerId = 0;

function moveBlock() {
    if (!isGameOver) {
        for (var i = 1; i < blockNumber; i++) {
            var currentBlock = document.getElementById("block" + i);
            var newMarginLeft = parseInt(currentBlock.style.marginLeft) - 20;
            currentBlock.style.marginLeft = newMarginLeft + "px";

            if (newMarginLeft < 178 && newMarginLeft > 58 && playerMarginTop > 260) {
                handleCollision();
            }
        }
        requestAnimationFrame(moveBlock);
    }
}


// handle collision
function handleColiison() {
    clearInterval(runWorkerId);
    runSound.pause();
    clearInterval(backgroundWorkerId);
    clearInterval(blockWorkerId);
    clearInterval(moveBlockWorkerId);
    clearInterval(scoreWorkerId);
    clearInterval(jumpWorkerId);
    jumpWorkerId -= 1;
    deadWorkerId = setInterval(dead, 100);
    deadSound.play();
}

// update score
var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore() {
    score.innerHTML = ++newScore;
}

//Dead
var deadWorkerId = 0;
var deadImageNumber = 1;

function dead() {
    deadImageNumber++;
    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        player.style.marginTop = "310px";
        player.style.transition = "none";

        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }

    player.src = "assets/Dead (" + deadImageNumber + ").png";
}

function reload() {
    location.reload();
}
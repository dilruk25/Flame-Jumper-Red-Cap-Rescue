function keyCheck(event) {

    //enter
    if (event.which == 13) {

        if (runWorkerId == 0) {

            runWorkerId = setInterval(run, 100);
            backgroundWorkerId = setInterval(moveBackground, 100);

        }

    }
    //space
    if (event.which == 32) {

        if (jumpWorkerId == 0) {

            clearInterval(runWorkerId);
            jumpWorkerId = setInterval(jump, 100);
        }

    }
}

var player = document.getElementById("player");

//run
var runWorkerId = 0;
var runImageNumber = 1;


function run() {
    
    runImageNumber++; // 2 3 4 5 6 7 8 9

    if (runImageNumber == 9) {
        runImageNumber = 1
    }

    player.src = "Run (" + runImageNumber + ").png"; // 2 3 4 5 6 7 8 - 1
}

//jump
var jumpWorkerId = 0;
var jumpImageNumber = 1;
var playerMarginTop = 320;

function jump() {
    jumpImageNumber++;

    //fly
    if (jumpImageNumber <= 7) { // jump images 2 - 7
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";
    }

    //land
    if (jumpImageNumber >= 8) { // jump images 8 - 1
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";
    }


    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run, 100);
        jumpWorkerId = 0;

    }

    player.src = "Jump (" + jumpImageNumber + ").png";
}

//background
var background = document.getElementById("background");

//move background
var positionX = 0;
var backgroundWorkerId = 0;

function moveBackground() {
    positionX = positionX - 20;

    background.style.backgroundPositionX = positionX + "px";

}
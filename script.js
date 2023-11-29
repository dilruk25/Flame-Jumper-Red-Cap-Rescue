function keyCheck(event) {

    //enter
    if (event.which == 13) {
        setInterval(run, 100)

    }
    //space
    if (event.which == 32) {
        alert("Space");
    }
}

var player = document.getElementById("player")
//run
var runImageNumber = 1;

function run() {
    runImageNumber++;
    if (runImageNumber == 9) {
        runImageNumber = 1
    }
    player.src = "Run (" + runImageNumber + ").png";
}
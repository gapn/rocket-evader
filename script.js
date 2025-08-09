console.log("Game project initialized.");

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext('2d');

const player = {
    xPosition: 300,
    yPosition: 580,
    width: 20,
    height: 20,
    speed: 5 // pixels perframe
};

const keys = {
    ArrowLeft: false,
    ArrowRight: false
}

document.addEventListener("keydown", (pressed) => {
    keys[pressed.key] = true;
})

document.addEventListener("keyup", (depressed) =>{
    keys[depressed.key] = false;
})

function movePlayer() {
    if (keys.ArrowLeft) {
        player.xPosition -= player.speed;
    } else if (keys.ArrowRight) {
        player.xPosition += player.speed;
    };
}

function enforceCanvasLimits() {
    if (player.xPosition < 0) {
        player.xPosition = 0;
    } else if (player.xPosition + player.width > canvas.width) {
        player.xPosition = canvas.width - player.width;
    }
}

function gameLoop() {
    movePlayer();
    enforceCanvasLimits();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "red";
    context.fillRect(player.xPosition, player.yPosition, player.width, player.height);
    requestAnimationFrame(gameLoop);
}

gameLoop();
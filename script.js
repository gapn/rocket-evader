console.log("Game project initialized.");

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext('2d');
const playerDimension = 20;
const obstacleDimension = 10;
const currentObstacleSpeed = 1;

const player = {
    xPositionPlayer: canvas.width / 2 - playerDimension / 2,
    yPositionPlayer: canvas.height - playerDimension,
    playerWidth: playerDimension,
    playerHeight: playerDimension,
    playerSpeed: 5 // pixels perframe
};

const keys = {
    ArrowLeft: false,
    ArrowRight: false
}

const obstaclesArray = [];

document.addEventListener("keydown", (pressed) => {
    keys[pressed.key] = true;
})

document.addEventListener("keyup", (depressed) =>{
    keys[depressed.key] = false;
})

function movePlayer() {
    if (keys.ArrowLeft) {
        player.xPositionPlayer -= player.playerSpeed;
    } else if (keys.ArrowRight) {
        player.xPositionPlayer += player.playerSpeed;
    };
}

function enforceCanvasLimits() {
    if (player.xPositionPlayer < 0) {
        player.xPositionPlayer = 0;
    } else if (player.xPositionPlayer + player.playerWidth > canvas.width) {
        player.xPositionPlayer = canvas.width - player.playerWidth;
    }
}

function gameLoop() {
    movePlayer();
    enforceCanvasLimits();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "red";
    context.fillRect(player.xPositionPlayer, player.yPositionPlayer, player.playerWidth, player.playerHeight);
    movingObjects();
    deleteObject();
    requestAnimationFrame(gameLoop);
}

function spawnObject() {
    const obstacle = {
        xPositionObstacle: Math.floor(Math.random() * (canvas.width - obstacleDimension/2)),
        yPositionObstacle: 0,
        obstacleWidth: obstacleDimension,
        obstacleHeight: obstacleDimension,
        obstacleSpeed: currentObstacleSpeed
    }
    obstaclesArray.push(obstacle);
}

function movingObjects() {
    obstaclesArray.forEach(element => {
        element.yPositionObstacle += element.obstacleSpeed;
        context.fillStyle = "green";
        context.fillRect(element.xPositionObstacle, element.yPositionObstacle, obstacleDimension, obstacleDimension);
    });
}

function deleteObject() {
    for (let i = obstaclesArray.length - 1; i >= 0; i--) {
        if (obstaclesArray[i].yPositionObstacle > canvas.height) {
            obstaclesArray.splice(i, 1);
        }
    }
}

setInterval(spawnObject, 1500)

gameLoop();
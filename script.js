console.log("Game project initialized.");

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext('2d');
const playerDimension = 20;
const obstacleDimension = 10;
const obstacleHalfDimension = obstacleDimension / 2;
const currentObstacleSpeed = 1;
let isGameOver = false;
let score = 0;
let scoreIncrement = 10;

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

function updateObjects() {
    obstaclesArray.forEach(element => {
        element.yPositionObstacle += element.obstacleSpeed;
    })
}

function drawObjects() {
    obstaclesArray.forEach(element => {
        context.fillStyle = "green";
        context.fillRect(element.xPositionObstacle, element.yPositionObstacle, obstacleDimension, obstacleDimension);
    })
}

function deleteObject() {
    for (let i = obstaclesArray.length - 1; i >= 0; i--) {
        if (obstaclesArray[i].yPositionObstacle > canvas.height) {
            obstaclesArray.splice(i, 1);
            score += scoreIncrement;
        }
    }
}

function collisionDetection() {
    obstaclesArray.forEach(element => {
        if (
            element.xPositionObstacle < player.xPositionPlayer + playerDimension &&
            element.xPositionObstacle + obstacleDimension > player.xPositionPlayer &&
            element.yPositionObstacle < player.yPositionPlayer + playerDimension &&
            element.yPositionObstacle + obstacleDimension > player.yPositionPlayer            
        ) {
            isGameOver = true;
            alert("GAME OVER");
        }
    })
}

function gameLoop() {
    if (!isGameOver) {
        movePlayer();
        enforceCanvasLimits();
        updateObjects();
        deleteObject();
        collisionDetection();
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "red";
    context.fillRect(player.xPositionPlayer, player.yPositionPlayer, player.playerWidth, player.playerHeight);
    drawObjects();
    context.font = "24px Bitcount Prop Double";
    context.fillStyle = "white";
    context.fillText("Score: " + score, 10, 30);
    
    requestAnimationFrame(gameLoop);
}

setInterval(spawnObject, 1500)

gameLoop();
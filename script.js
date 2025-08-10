const rocketImage = new Image;
rocketImage.src = "assets/images/rocket.png";

const obstaclesProperties = [
    { sourceUrl: "assets/images/planet-blue.png" },
    { sourceUrl: "assets/images/planet-green.png" },
    { sourceUrl: "assets/images/planet-orange.png" },
    { sourceUrl: "assets/images/planet-ring-blue.png" },
    { sourceUrl: "assets/images/planet-ring-yellow.png" },
    { sourceUrl: "assets/images/comet-black.png" },
    { sourceUrl: "assets/images/comet-orange.png" },
    { sourceUrl: "assets/images/black-hole.png" }
]

const obstacleImages = obstaclesProperties.map((type) => {
    const image = new Image();
    image.src = type.sourceUrl;
    return image;
})

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const dodgeSound = document.getElementById("dodgeSound");
const speedUpSound = document.getElementById("speedUpSound");
const gameOverSound = document.getElementById("gameOverSound");
const playerDimension = 30;
const obstacleDimension = 30;
const obstacleHalfDimension = obstacleDimension / 2;
let speedUpCoefficient = 1;
let currentObstacleSpeed = 1;
let isGameOver = false;
let score = 0;
let scoreIncrement = 10;
let nextSpeedIncreasePoints = 100;
let activeObstacleType;
let spawnerInterval;

function playSoundDuration(soundElement, durationInSeconds) {
    soundElement.currentTime = 0;
    soundElement.play();
    setTimeout(() => {
        soundElement.pause();
    }, durationInSeconds * 1000);
}

function selectObstacleForTheGame() {
    const randomObstacleIndex = Math.floor(Math.random() * obstaclesProperties.length);
    activeObstacleType = obstaclesProperties[randomObstacleIndex];
    activeObstacleType.image = obstacleImages[randomObstacleIndex];
}

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
        obstacleSpeed: currentObstacleSpeed,
        obstacleImage: activeObstacleType.image
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
        context.drawImage(element.obstacleImage, element.xPositionObstacle, element.yPositionObstacle, obstacleDimension, obstacleDimension);
    })
}

function deleteObject() {
    for (let i = obstaclesArray.length - 1; i >= 0; i--) {
        if (obstaclesArray[i].yPositionObstacle > canvas.height) {
            obstaclesArray.splice(i, 1);
            score += scoreIncrement;
            playSoundDuration(dodgeSound, 0.2);
            if (score >= nextSpeedIncreasePoints) {
                currentObstacleSpeed += 0.5;
                nextSpeedIncreasePoints +=100;
                playSoundDuration(speedUpSound, 0.7);
                if (speedUpCoefficient > 0.2) {
                    speedUpCoefficient -= 0.1;
                };
                clearInterval(spawnerInterval);
                spawnerInterval = setInterval(spawnObject, speedUpCoefficient * 1000);
            }
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
            gameOverSound.play();
            clearInterval(spawnerInterval);
        }
    })
}

document.addEventListener("keydown", (pressed) => {
    if (isGameOver && pressed.key === "Enter") {
        resetGame();
    }
});

function resetGame() {
    player.xPositionPlayer = canvas.width / 2 - playerDimension / 2;
    player.yPositionPlayer = canvas.height - playerDimension;
    obstaclesArray.length = 0;
    score = 0;
    isGameOver = false;
    scoreIncrement = 10;
    currentObstacleSpeed = 1;
    nextSpeedIncreasePoints = 100;
    speedUpCoefficient = 1;
    selectObstacleForTheGame();

    spawnerInterval = setInterval(spawnObject, speedUpCoefficient * 1000);

    gameLoop();
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
    context.drawImage(rocketImage, player.xPositionPlayer, player.yPositionPlayer, player.playerWidth, player.playerHeight);
    drawObjects();
    context.font = "24px Bitcount Prop Double";
    context.textAlign = "left";
    context.fillStyle = "white";
    context.fillText("Score: " + score, 10, 30);
    
    if (isGameOver) {
        context.font = "60px Bungee";
        context.textAlign = "center"; // Use the correct property name here
        context.fillStyle = "greenyellow";
        context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        return
    }

    requestAnimationFrame(gameLoop);
}

resetGame();
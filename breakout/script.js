// MAIN
const main = document.querySelector('main');
const startButton = document.querySelector('.main-button');

// CANVAS
const canvas = document.querySelector('canvas');
canvas.setAttribute('width', (window.innerWidth - 2) + 'px');
canvas.setAttribute('height', (window.innerHeight - 3) + 'px');
const ctx = canvas.getContext('2d');
const audio = document.querySelector('#audio');
audio.play();
// PADDLE
let paddleWidth = 100;
let paddleHeight = 30;
let paddleX = (canvas.width - paddleWidth) / 2, paddleY = canvas.height - 40;
let paddleSpeed = 4;
let leftPressed = false;
let rightPressed = false;
// BALL
let ballRadius = 20;
let ballX = (canvas.width - ballRadius) / 2, ballY = canvas.height - 70;
let ballXDirArr = [2, -2, 1, 3, -1];
let ballXDir = ballXDirArr[Math.floor(Math.random() * ballXDirArr.length)], ballYDir = -2;
// BRICKS
const bricks = [];
let bricksColumn = 15;
let bricksRow = 10;
let brickWidth = 80;
let brickHeight = 30;
let brickPaddle = 15;
let brickOffsetLeft = (canvas.width - ((brickWidth * bricksColumn) + (brickPaddle * bricksColumn))) / 2;
let brickOffsetTop = 50;

for (let c = 0; c < bricksColumn; c++) {
    bricks[c] = [];
    for (let r = 0; r < bricksRow; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 2 };
    };
};
// POINTS AND LIVES
let points = 0;
let lives = 3;

// DRAW POINTS

function drawPoints() {
    ctx.beginPath();
    ctx.font = '1rem sans-serif';
    ctx.fillStyle = 'blue';
    ctx.fillText(`POINTS: ${points}`, 15, 30);
};

// DRAW LIVES

function drawLives() {
    ctx.beginPath();
    ctx.font = '1rem sans-serif';
    ctx.fillStyle = 'red';
    ctx.fillText(`LIVES: ${lives}`, canvas.width - 80, 30);
};

// DRAW BRICKS

function drawBricks() {
    for (let c = 0; c < bricksColumn; c++) {
        for (let r = 0; r < bricksRow; r++) {
            const brickX = c * (brickWidth + brickPaddle) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPaddle) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;

            if (bricks[c][r].status === 2) {
                ctx.beginPath();
                ctx.drawImage(brickBlue100Image, brickX, brickY, brickWidth, brickHeight);
                ctx.closePath();
            } else if (bricks[c][r].status === 1) {
                ctx.beginPath();
                ctx.drawImage(brickBlue50Image, brickX, brickY, brickWidth, brickHeight);
                ctx.closePath();
            };
        };
    };
};

// MAKE HIT SOUND

function makeHitSound(audioSource) {
    const audio = document.createElement('audio');
    audio.volume = 0.1;
    audio.src = audioSource;
    audio.play();
};

// DETECT COLLISION

function detectCollision() {
    for (let c = 0; c < bricksColumn; c++) {
        for (let r = 0; r < bricksRow; r++) {
            const brick = bricks[c][r];
            if (brick.status > 0) {
                if (ballX > brick.x - ballRadius && ballX < brick.x + brickWidth && ballY > brick.y - ballRadius && ballY < brick.y + brickHeight) {
                    ballYDir = -ballYDir;
                    brick.status--;
                    makeHitSound('./assets/tile-hit.mp3');
                };
            };
        };
    };
};

// CLEAR CANVAS

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// DRAW PADDLE

function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(paddleImage, paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.closePath();
};

// DRAW BALL

function drawBall() {
    ctx.beginPath();
    ctx.drawImage(ballImage, ballX, ballY, ballRadius, ballRadius);
    ctx.closePath();
};

// TRACKING THE POINTS

function trackingThePoints() {
    points = 0;
    for (let c = 0; c < bricksColumn; c++) {
        for (let r = 0; r < bricksRow; r++) {
            const brick = bricks[c][r];
            
            if (brick.status === 0) {
                points += 10;
            };
        };
    };
};

// DRAW

function draw() {
    clearCanvas();
    drawPaddle();
    drawBall();
    detectCollision();
    drawBricks();
    drawPoints();
    drawLives();
    trackingThePoints();

    // MOVING THE BALL
    ballX += ballXDir;
    ballY += ballYDir;

    // MOVING THE PADDLE
    if (leftPressed) {
        if (paddleX > 5) {
            paddleX -= paddleSpeed;
        };
    } else if (rightPressed) {
        if (paddleX < canvas.width - (paddleWidth + 5)) {
            paddleX += paddleSpeed;
        };
    };

    // COLLISION BETWEEN THE BALL AND THE PADDLE
    if (ballY > paddleY - ballRadius && ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballYDir = -ballYDir;

        // BALL X
        if (ballX > paddleX - ballRadius && ballX < paddleX + 20) {
            ballXDir = -2;
        } else if (ballX > paddleX && ballX < paddleX + 30) {
            ballXDir = -1;
        } else if (ballX > paddleX && ballX < paddleX + 55) {
            ballXDir = 0;
        } else if (ballX > paddleX && ballX < paddleX + 70) {
            ballXDir = 1;
        } else if (ballX > paddleX && ballX < paddleX + 100) {
            ballXDir = 2;
        };

        // HANDLE THE SOUND EFFECT
        makeHitSound('./assets/paddle-hit.mp3');
    };

    // HANDLING THE COLLISION BETWEEN THE BALL AND THE WALLS
    if (ballY < 0) {
        ballYDir = -ballYDir;
        // HANDLE THE SOUND EFFECT
        makeHitSound('./assets/wall-hit.mp3');
    };
    if (ballX < 0 || ballX > canvas.width - ballRadius) {
        ballXDir = -ballXDir;
        // HANDLE THE SOUND EFFECT
        makeHitSound('./assets/wall-hit.mp3');
    };

    // CHECKING IF THE GAME HAS BEEN WON
    if (points === (bricksColumn * bricksRow * 10)) {
        // HANDLE THE SOUND EFFECT
        makeHitSound('./assets/win.mp3');
        points = 0;
        document.location.reload();
        alert('Congtratulations, You won!');
    };


    if (ballY > canvas.height + 20) {
        if (lives > 0) {
            ballX = (canvas.width - ballRadius) / 2;
            ballY = canvas.height - 70;
            lives--;
            ballXDir = ballXDirArr[Math.floor(Math.random() * ballXDirArr.length)];
            ballYDir = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
            // HANDLE THE SOUND EFFECT
            makeHitSound('./assets/life-lost.mp3');
        } else {
            // HANDLE THE SOUND EFFECT
            makeHitSound('./assets/lose.mp3');
            lives = 3;
            document.location.reload();
            alert('Opps, you lost. Try again!!!');
        };
    };

    // REQUESTING A FRAME ANIMATION
    requestAnimationFrame(draw);
};

// PADDLE MOVEMENT
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('mousemove', handleMouseMove);

function handleKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
        leftPressed = true;
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        rightPressed = true;
    };
};

function handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
        leftPressed = false;
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        rightPressed = false;
    };
};

function handleMouseMove(e) {
    if (paddleX > 5 || paddleX < canvas.width - (paddleWidth + 5)) {
        paddleX = e.clientX - (paddleWidth / 2);
    };
};

// START THE GAME
startButton.addEventListener('click', () => {
    main.classList.add('main-hidden');
    draw();
});
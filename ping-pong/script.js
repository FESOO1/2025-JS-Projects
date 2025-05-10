const canvas = document.querySelector('canvas');
canvas.setAttribute('width', (window.innerWidth - 2) + 'px');
canvas.setAttribute('height', (window.innerHeight - 4) + 'px');
const ctx = canvas.getContext('2d');
// BOARD
let boardWidth = canvas.width;
let boardHeight = canvas.height - 30;
let boardX = 0, boardY = -5;
// PLAYER 1
let player1Points = 0;
let player1Width = 20;
let player1Height = 120;
let player1PosX = 15, player1PosY = (canvas.height - player1Height) / 2;
let wPressed = false;
let sPressed = false;
let player1MovementSpeed = 5;
// PLAYER 2
let player2Points = 0;
let player2Width = 20;
let player2Height = 120;
let player2PosX = canvas.width - 35, player2PosY = (canvas.height - player2Height) / 2;
let upPressed = false;
let downPressed = false;
let player2MovementSpeed = 5;
// BALL
let ballSize = 25;
let ballX = 40, ballY = (canvas.height - ballSize) / 2;
let ballYDirArr = [4, -4];
let ballXDir = 4, ballYDir = ballYDirArr[Math.floor(Math.random() * ballYDirArr.length)];

// DRAW PLAYER ONE

function drawPlayerOne() {
    ctx.beginPath();
    ctx.drawImage(player1Image, player1PosX, player1PosY, player1Width, player1Height);
    ctx.closePath();
};

// DRAW PLAYER TWO

function drawPlayerTwo() {
    ctx.beginPath();
    ctx.drawImage(player2Image, player2PosX, player2PosY, player2Width, player2Height);
    ctx.closePath();
};

// DRAW PLAYER ONE POINTS

function drawPlayerOnePoints() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '1rem sans-serif';
    ctx.fillText(`P1: ${player1Points}`, 15, 30);
    ctx.closePath();
};

// DRAW PLAYER TWO POINTS

function drawPlayerTwoPoints() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '1rem sans-serif';
    ctx.fillText(`P2: ${player2Points}`, canvas.width - 50, 30);
    ctx.closePath();
};

// CLEAR CANVAS

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// DRAW THE BOARD

function drawTheBoard() {
    ctx.beginPath();
    ctx.drawImage(boardImage, boardX, boardY, boardWidth, boardWidth);
    ctx.closePath();
};

// DRAW THE BALL

function drawTheBall() {
    ctx.beginPath();
    ctx.drawImage(ballImage, ballX, ballY, ballSize, ballSize);
    ctx.closePath();
};

// DRAW

function draw() {
    clearCanvas();
    drawTheBoard();
    drawPlayerOne();
    drawPlayerTwo();
    drawTheBall();
    drawPlayerOnePoints();
    drawPlayerTwoPoints();

    // MOVING THE BALL
    ballX += ballXDir;
    ballY += ballYDir;

    // TOP AND BOTTOM WALLS COLLISION
    if (ballY < 0 || ballY > canvas.height - ballSize) {
        ballYDir = -ballYDir;
    };

    // PLAYER1 BALL AND PADDLE COLLISION
    if (ballX < player1PosX + player1Width && ballY > player1PosY && ballY < player1PosY + player1Height) {
        ballXDir = -ballXDir;
    };

    // PLAYER2 BALL AND PADDLE COLLISION
    if (ballX > player2PosX - player1Width && ballY > player2PosY && ballY < player2PosY + player2Height) {
        ballXDir = -ballXDir;
    };

    // PLAYER1 MOVEMENT
    if (wPressed) {
        if (player1PosY > 5) {
            player1PosY -= player1MovementSpeed;
        };
    } else if (sPressed) {
        if (player1PosY < canvas.height - player1Height - 5) {
            player1PosY += player1MovementSpeed;
        };
    };
    // PLAYER1 MOVEMENT
    if (upPressed) {
        if (player2PosY > 5) {
            player2PosY -= player2MovementSpeed;
        };
    } else if (downPressed) {
        if (player2PosY < canvas.height - player1Height - 5) {
            player2PosY += player2MovementSpeed;
        };
    };

    requestAnimationFrame(draw);
};

draw();

// HANDLE THE KEY PRESSES
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(e) {
    if (e.key === 'w') {
        wPressed = true;
    } else if (e.key === 's') {
        sPressed = true;
    };

    if (e.key === 'ArrowUp' || e.key === 'Up') {
        upPressed = true;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        downPressed = true;
    };
};

function handleKeyUp(e) {
    if (e.key === 'w') {
        wPressed = false;
    } else if (e.key === 's') {
        sPressed = false;
    };

    if (e.key === 'ArrowUp' || e.key === 'Up') {
        upPressed = false;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        downPressed = false;
    };
};
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// SNAKE
let snakeSize = 50;
let snakeX = 150, snakeY = 100;
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let snakeDir = 'right';
let snakeSpeed = 50;

// MAP
const map = [];
let gridColumn = 12;
let gridRow = 12;
let gridBoxSize = 50;
let gridX = 0, gridY = 0;

for (let c = 0; c < gridColumn; c++) {
    map.push([]);
    for (let r = 0; r < gridRow; r++) {
        map[c].push({ x: 0, y: 0, status: 0 });
    };
};

function drawTheMap() {
    gridX = 0;
    gridY = 0;
    for (let c = 0; c < gridColumn; c++) {
        for (let r = 0; r < gridRow; r++) {
            if (map[c][r].status === 0) {
                map[c][r].x = gridX;
                map[c][r].y = gridY;

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeRect(map[c][r].x, map[c][r].y, gridBoxSize, gridBoxSize);
                ctx.strokeStyle = 'rgba(255,255,255,0.2)';

                gridX += gridBoxSize;
            };
        };
        gridX = 0;
        gridY += gridBoxSize;
    };
};

// DRAW THE SNAKE

function drawTheSnake() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
    ctx.closePath();
};

// CLEAR THE CANVAS

function clearTheCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// DRAW

function draw() {
    clearTheCanvas();
    drawTheSnake();
    drawTheMap();

    requestAnimationFrame(draw);
};

draw();

// HANDLE THE KEYS
document.addEventListener('keydown', handlePress);

function handlePress(e) {
    if (e.key === 'ArrowUp' || e.key === 'Up') {
        if (snakeY > 0) {
            snakeY -= snakeSpeed;
        };
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        if (snakeY < canvas.height - snakeSpeed) {
            snakeY += snakeSpeed;
        };
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        if (snakeX > 0) {
            snakeX -= snakeSpeed;
        };
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        if (snakeX < canvas.width - snakeSize) {
            snakeX += snakeSpeed;
        };
    };
};
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// SNAKE
let snakeX = 150, snakeY = 150;
let snakeSize = 50;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

// MAP
const map = [];
let mapDirX = 0, mapDirY = 0;
let mapColumn = 8;
let mapRow = 8;
let mapPieceSize = 50;

for (let c = 0; c < mapColumn; c++) {
    map.push([]);
    for (let r = 0; r < mapRow; r++) {
        map[c].push({ x: 0, y: 0, status: 0 });
    };
};

map[1][1].status = 1;
map[6][1].status = 1;
map[6][5].status = 1;
map[1][5].status = 1;

// DRAW MAP

function drawMap() {
    mapDirX = 0;
    mapDirY = 0;
    for (let c = 0; c < mapColumn; c++) {
        for (let r = 0; r < mapRow; r++) {
            if (map[c][r].status === 0) {
                ctx.beginPath();
                ctx.lineWidth = 0.07;
                ctx.strokeRect(map[c][r].x, map[c][r].y, mapPieceSize, mapPieceSize);
                ctx.strokeStyle = 'rgba(255,255,255,0.8)';
                ctx.fill();
                ctx.closePath();
            } else if (map[c][r].status === 1) {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255,255,255,0.8)';
                ctx.fillRect(map[c][r].x, map[c][r].y, mapPieceSize, mapPieceSize);
                ctx.fill();
                ctx.closePath();  
            };

            mapDirX += mapPieceSize;
            map[c][r].x = mapDirX;
            map[c][r].y = mapDirY;
        };
        mapDirX = 0;
        mapDirY += mapPieceSize;
    };
};

// DRAW SNAKE

function drawSnake() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
    ctx.closePath();
};

// CLEAR CANVAS

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// DETECT COLLISION

function detectCollision() {
    for (let c = 0; c < map.length; c++) {
        for (let r = 0; r < map[c].length; r++) {
            if (map[c][r].status === 1) {
                if (snakeX === map[c][r].x && snakeY === map[c][r].y) {
                    map[c][r].status = 0;
                };
            };
        };
    };
};

// DRAW

function draw() {
    clearCanvas();
    drawMap();
    drawSnake();
    detectCollision();

    // HANDLE THE SNAKE MOVEMENT

    requestAnimationFrame(draw);
};

draw();

// HANDLE KEYS
document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'Up') {
        if (snakeY > 0) {
            snakeY -= snakeSize;
        };
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        if (snakeY < canvas.height - snakeSize) {
            snakeY += snakeSize;
        };
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        if (snakeX > snakeSize) {
            snakeX -= snakeSize;
        };
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        if (snakeX < canvas.width - snakeSize) {
            snakeX += snakeSize;
        };
    };
};
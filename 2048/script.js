const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// MAP
const map = {
    map: [
        [{x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}],
        [{x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}],
        [{x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}],
        [{x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}, {x: 0, y: 0, pointText: 0}]
    ],
    mapPositions: {
        mapY: 0,
        mapX: 0,
    },
    mapSize: {
        width: 100,
        height: 100,
    }
};

// DRAW THE MAP

function drawTheMap() {
    map.mapPositions.mapY = 0;
    map.mapPositions.mapX = 0;
    for (let c = 0; c < map.map.length; c++) {
        for (let r = 0; r < map.map[c].length; r++) {
            const y = map.map[c][r].y;
            const x = map.map[c][r].x;
            
            // STROKE
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.strokeRect(map.mapPositions.mapX, map.mapPositions.mapY, map.mapSize.width, map.mapSize.height);
            ctx.closePath();

            // TEXT
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.font = '2rem "Space Grotesk", sans-serif';
            ctx.fillText(`${map.map[c][r].pointText}`, (map.mapSize.width - 45) / 2, map.mapSize.height / 2, 90);
            ctx.closePath();
            
            map.mapPositions.mapX += map.mapSize.width;
        };
        map.mapPositions.mapX = 0;
        map.mapPositions.mapY += map.mapSize.width;
    };
};

// CLEAR THE CANVAS

function clearTheCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// DRAW

function draw() {
    clearTheCanvas();
    drawTheMap();

    requestAnimationFrame(draw);
};

draw();
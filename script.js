
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let ballX = 300;
let ballY = 175;

let speedX = 4;
let speedY = 3;

let player1 = 140;
let player2 = 140;

let score1 = 0;
let score2 = 0;

let running = false;

let keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
});

document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

function draw() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 350);

    ctx.fillStyle = "#39ff14";

    // Центральная линия
    for(let i = 0; i < 350; i += 20) {
        ctx.fillRect(297, i, 5, 10);
    }

    // Первая ракетка
    ctx.fillRect(20, player1, 10, 70);

    // Вторая ракетка
    ctx.fillRect(570, player2, 10, 70);

    // Мяч
    ctx.fillRect(ballX, ballY, 10, 10);
}

function update() {

    if(keys["w"] || keys["W"]) player1 -= 5;
    if(keys["s"] || keys["S"]) player1 += 5;

    if(keys["ArrowUp"]) player2 -= 5;
    if(keys["ArrowDown"]) player2 += 5;

    player1 = Math.max(0, Math.min(280, player1));
    player2 = Math.max(0, Math.min(280, player2));

    ballX += speedX;
    ballY += speedY;

    // Отскок от стен
    if(ballY <= 0 || ballY >= 340) {
        speedY *= -1;
    }

    // Столкновение с первой ракеткой
    if(ballX <= 30 &&
       ballY + 10 >= player1 &&
       ballY <= player1 + 70) {
        speedX = Math.abs(speedX);
    }

    // Столкновение со второй ракеткой
    if(ballX >= 560 &&
       ballY + 10 >= player2 &&
       ballY <= player2 + 70) {
        speedX = -Math.abs(speedX);
    }

    // Очки второго игрока
    if(ballX < 0) {
        score2++;
        updateScore();
        resetBall();
    }

    // Очки первого игрока
    if(ballX > 600) {
        score1++;
        updateScore();
        resetBall();
    }
}

function resetBall() {
    ballX = 300;
    ballY = 175;
    speedX = -speedX;
    speedY = 3;
}

function updateScore() {
    document.getElementById("score").innerText =
        score1 + " : " + score2;
}

function startGame() {
    if(!running) {
        running = true;
        gameLoop();
    }
}

function resetGame() {
    score1 = 0;
    score2 = 0;

    player1 = 140;
    player2 = 140;

    ballX = 300;
    ballY = 175;

    speedX = 4;
    speedY = 3;

    updateScore();
    draw();
}

function gameLoop() {
    if(!running) return;

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

draw();

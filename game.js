const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let birdImg = new Image();
birdImg.src = "bird.png";

let pipeImg = new Image();
pipeImg.src = "obstacle.png";

let bird = { x: 80, y: 250, w: 55, h: 55, vel: 0, gravity: 0.45, jump: -8 };

let pipes = [];
let gap = 170;
let speed = 2.2;

function createPipe() {
    let topHeight = Math.random() * 220 + 60;
    pipes.push({ x: canvas.width, top: topHeight, bottom: topHeight + gap });
}

function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.w, bird.h);
}

function drawPipes() {
    pipes.forEach(p => {
        let w = 90;
        ctx.drawImage(pipeImg, p.x, 0, w, p.top);
        ctx.drawImage(pipeImg, p.x, p.bottom, w, canvas.height - p.bottom);
        p.x -= speed;
    });
}

function update() {
    bird.vel += bird.gravity;
    bird.y += bird.vel;

    if (bird.y + bird.h > canvas.height || bird.y < 0) restart();

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) createPipe();
    pipes = pipes.filter(p => p.x + 90 > 0);

    pipes.forEach(p => {
        if (bird.x + bird.w > p.x && bird.x < p.x + 90 &&
            (bird.y < p.top || bird.y + bird.h > p.bottom)) restart();
    });
}

function restart() {
    location.reload();
}

window.addEventListener("keydown", () => bird.vel = bird.jump);

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
    update();
    requestAnimationFrame(loop);
}

loop();

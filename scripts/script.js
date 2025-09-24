const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width/2;                      // position de la balle (axe des abscisses X)
let y = canvas.height/2;     // centrage vertical dans le canvas
let dx = 3;
let dy = -3;
let rx = canvas.width/2 -50;
let ry = canvas.height - 30;
let rafId;                       // identifiant de la boucle d'animation

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'écran
    ctx.fillStyle = "#0095DD";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawRectangle(){
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(rx, ry, 100, 10);
}

function update() {

    x += dx;
    y += dy;

    // fait rebondir la balle
    if (x > canvas.width - 15|| x < 15) {
        dx = -dx;
        dy += (Math.random()  - 0.5) * 2;
    }
    if(y < 15) {
        dy = -dy;
        dx += (Math.random()  - 0.5) * 2;
    }

    if (y > canvas.height - 30 - 15 && x > rx && x < rx + 100) {
        dy = -dy;
        dx += (Math.random()  - 0.5) * 2;
    }

    if (y > canvas.height - 15){
        gameOver();
    }

}

function moveRectangle(event) {
    let direction = event.key;
    if (direction === 'ArrowLeft' && rx > 0) {
        rx -= 20;
    }
    else if (direction === 'ArrowRight' && rx < canvas.width - 100) {
        rx += 20;
    }
}
document.addEventListener('keydown', moveRectangle);

function loop() {
    update();
    drawBall();
    if  (rafId) {  // si l'animation est en cours
        rafId = requestAnimationFrame(loop);
    }
    drawRectangle();
}

// démarrer l'animation
loop();

//             gestion des boutons

// démarre l'animation si elle n'est pas déjà en cours
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    if (!rafId) {   // si l'animation n'est pas déjà en cours
        dx = 3;
        dy = -3;
        rafId   = requestAnimationFrame(loop);
        compteurScore();
    }
});

// réinitialise la position, la vitesse de la balle et le score
const reinitializeButton = document.getElementById('reinitialize');
reinitializeButton.addEventListener('click', () => {
    cancelAnimationFrame(rafId);
    rafId = null;
    resetBall();
}
);

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 3;
    dy = -3;
    drawBall();
    scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Score: 0';
}

function gameOver() {
    cancelAnimationFrame(rafId);
    rafId = null;
     x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 0;
    dy = 0;
    const scoreElement = document.getElementById('score');
    alert("Game Over! La balle est tombée, votre score est de " + scoreElement.textContent.split(' ')[1]);
    scoreElement.textContent = 'Score: 0';
}

let scoreInterval;
function compteurScore() {
    let score = 0;
    const scoreElement = document.getElementById('score');
    if (scoreInterval) {
        clearInterval(scoreInterval);
    }
    scoreInterval = setInterval(() => {
        if (rafId) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
        } else {
            score = 0;
        }
    }, 1000);

}


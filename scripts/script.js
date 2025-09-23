const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width/2;                      // position de la balle (axe des abscisses X)
let y = canvas.height/2;     // centrage vertical dans le canvas
let dx = 3;
let dy = -3;
let rafId;                       // identifiant de la boucle d'animation

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'écran
    ctx.fillStyle = "#0095DD";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
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
    if (y > canvas.height - 15){
        gameOver();
    }

}

function loop() {
    update();
    drawBall();
    if  (rafId) {  // si l'animation est en cours
        rafId = requestAnimationFrame(loop);
    }
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
    }
});

// réinitialise la position et la vitesse de la balle
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
}

function gameOver() {
    cancelAnimationFrame(rafId);
    rafId = null;
     x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 0;
    dy = 0;
    alert("Game Over! La balle est tombée.");
}
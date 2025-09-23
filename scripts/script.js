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
    if(y > canvas.height - 15 || y < 15) {
        dy = -dy;
        dx += (Math.random()  - 0.5) * 2;
    }

}


function loop() {
    update();
    drawBall();
    rafId = requestAnimationFrame(loop); // planifie la prochaine frame
}

// démarrer l'animation
loop();

// possibilité d'arrêter l'animation avec le bouton 'stop'
let stopAnimation = document.getElementById('stop');
stopAnimation.addEventListener('click', () => {
    cancelAnimationFrame(rafId)
})


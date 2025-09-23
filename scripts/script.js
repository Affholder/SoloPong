const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width/10+2;                      // position de la balle (axe des abscisses X)
const y = canvas.height*0.9;     // centrage vertical dans le canvas
let speed = 2;                 // vitesse de la balle
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
    x += speed;
    // fait rebondir la balle
    if (x > canvas.width - 15) {
        speed = speed*-1;
    }
    if (x < 15) {
        speed = speed*-1;
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


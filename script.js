let ctx = document.getElementById("canvas").getContext("2d");
const gravity = 4/6;
let bird_y = 200;
let box_x = 640;
let box_side = Math.ceil(Math.random() - 0.5);
//add second box here from other side to replicate infinity feel
let speed = -10 / 6;
document.body.addEventListener('mouseup', clicking);
let image = new Image();
image.src = "bird.png";
image.onload = function () {
    requestAnimationFrame(connect);
}
function clicking() {
    speed = 10;
}

function connect() {
    draw();
    speed -= gravity;
    var variables = math();
    if (variables == null) {
        gameover();
    } else {
        bird_y = variables[0];
        box_x = variables[1];
        requestAnimationFrame(connect);
    }
}
function draw() {
    ctx.clearRect(0, 0, 640, 480);
    ctx.fillRect(box_x, box_side * 480, 100, box_side*-300 + 150);
    ctx.drawImage(image, 100, bird_y);
}
function math() {
    bird_y -= speed;
    box_x -= 5/6;
    switch (box_side) {
        case 0:
            if (100 > box_x - 50 && 100 < box_x + 50 && bird_y <= 150 || bird_y > 480 || bird_y < 0) {
                return null;
            }
            break;
        case 1:
            if (100 > box_x - 50 && 100 < box_x + 50 && bird_y >= 330 || bird_y > 480 || bird_y < 0) {
                return null;
            }
            break;
    }
    return [bird_y, box_x];
}

function gameover() {
  ctx.clearRect(0, 0, 640, 480);
  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Game Over', 250, 240);
}

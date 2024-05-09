let ctx = document.getElementById("canvas").getContext("2d");
ctx.fillStyle = 'white';
const gravity = 3/6;
let bird_y = 230;
let box1_x = 690;
let box2_x = 1040;
let box1a_y = Math.floor(Math.random() * 420);
let box1b_y = 470-box1a_y;
let box2b_y = Math.floor(Math.random() * 420);
let box2a_y = 470-box2b_y;
let speed = -8 / 6;
document.body.addEventListener('mouseup', clicking);
let image = new Image();
image.src = "bird.png";
image.onload = function () {
    requestAnimationFrame(connect);
}
function clicking() {
    speed = 8;
}

function connect() {
    draw();
    speed -= gravity;
    var variables = math();
    if (variables == null) {
        gameover();
    } else {
        bird_y = variables[0];
        box1_x = variables[1];
        box2_x = variables[2];
        requestAnimationFrame(connect);
    }
}
function draw() {
    ctx.clearRect(0, 0, 740, 580);
    ctx.fillRect(box1_x, 0, 100, box1a_y);
    ctx.fillRect(box1_x, 580, 100, -box1b_y);
    ctx.fillRect(box2_x, 0, 100, box2a_y);
    ctx.fillRect(box2_x, 580, 100, -box2b_y);
    ctx.drawImage(image, 100, bird_y);
}
function math() {
    bird_y -= speed;
    box1_x -= 5/3;
    box2_x -= 5/3;
    if (box1_x < 0) {
        box1_x = 740;
        box1a_y = Math.floor(Math.random() * 420);
        box1b_y = 470-box1a_y;
    }
    else if (box2_x < 0) {
        box2_x = 740;
        box2b_y = Math.floor(Math.random() * 420);
        box2a_y = 470-box2b_y;
    }
    if (bird_y < 0 || bird_y > 580){
        return null;
    }
    else if (box1_x < 125 && box1_x > 75 && (bird_y-25 < box1a_y || bird_y+25 > box1b_y)){
        return null;
    }
    else if (box2_x < 125 && box2_x > 75 && (bird_y-25 < box2a_y || bird_y+25 > box2b_y)){
        return null;
    }
    return [bird_y, box1_x, box2_x];
}

function gameover() {
  ctx.clearRect(0, 0, 740, 580);
  ctx.font = '30px Arial';
  ctx.fillText('Game Over', 250, 290);
}

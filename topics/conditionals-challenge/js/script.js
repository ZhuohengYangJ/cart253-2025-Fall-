/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 200,
  size: 80,
  fill: "#ff0000ff"
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 50,
  fill: "#000000"
};



const goal = {
    x: 300,
    y: 200,
    size: 100,
    fill: "#100cceff",
    fills: {
        yeah: "#d70bb1",
        boooo: "#12dede"
    }
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  checkOvelap();
  checkGoal();
  // Draw the user and puck
  drawUser();
  drawPuck();
  drawGoal();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

function checkOvelap() {
const d = dist(user.x, user.y, puck.x, puck.y);
const overlap = (d < user.size/2 + puck.size/2);
//hit from left effect
if (overlap && user.x < puck.x){
    puck.x = puck.x + 1;
}

//hit from right effect
if (overlap && user.x > puck.x){
    puck.x = puck.x - 1;
}
}

function drawGoal(){
    push();
    noStroke();
    fill(goal.fill);
    ellipse(goal.x, goal.y, goal.size);
    pop();
}

function checkGoal() {
    const hitGoal = dist(puck.x, puck.y, goal.x, goal.y);
    const isIn = (hitGoal < puck.size/2 + goal.size/2);
    if (isIn){
        goal.fill = goal.fills.yeah;
    }
    else {
        goal.fill = goal.fills.boooo;
    }
}







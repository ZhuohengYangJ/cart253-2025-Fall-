/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let gameState = "title";

let score = 0;

let maxScore = 10;

let eatSound;

const titleText = {
    text: "FROGFROGFROG",
    x: 320,
    y: 150,
    size: 60,
    eaten: false
}

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150,
        baseSize: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3,
    baseY: 200,
    amplitude: 50,
    frequency: 0.02,
    time: 0
};

function preload() {
    eatSound = loadSound('assets/sounds/bark.wav');
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {

    background("#87ceeb");

    if (gameState === "title") {
        drawTitleScreen();
        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueTitleOverlap();
    }
    else if (gameState === "playing") {
        moveFly();
        moveFrog();
        moveTongue();
        checkTongueFlyOverlap();
        updateFrogSize();

        drawFly();
        drawFrog();
        displayScore();

        checkGameOver();
    }
    else if (gameState === "gameOver") {
        drawGameOverScreen();
    }
}

function drawTitleScreen() {
    if(!titleText.eaten) {
        push();
        fill("#ff0000");
        textSize(titleText.size);
        textAlign(CENTER, CENTER);
        text(titleText.text, titleText.x, titleText.y);
        pop();
    }

    push();
    fill("#000000");
    textSize(20);
    textAlign(CENTER, CENTER);
    text("EAT TITLE to START! ", width/2, 250);
    pop();
}

function checkTongueTitleOverlap() {
    if (titleText.eaten) return;
    const d = dist(frog.tongue.x, frog.tongue.y, titleText.x, titleText.y);
    const titleRadius = titleText.size * 3;
    if (d < frog.tongue.size/2 + titleRadius) {
        titleText.eaten = true;
        frog.tongue.state = "inbound";
        setTimeout(() => {
            gameState = "playing";
        }, 500);
    }
}

function updateFrogSize() {
    frog.body.size = frog.body.baseSize + score * 10;
}

function checkGameOver() {
    if (score >= maxScore) {
        gameState = "gameOver";
    }
}

function drawGameOverScreen() {
    push();

    fill(0, 0, 0, 150);
    rect(0, 0, width, height);

    fill('#ff0000');
    textSize(60);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2 - 100);

    fill("#ffffff");
    textSize(30);
    text("The frog exploded!", width/2, height/2 - 30);
    textSize(20);
    text("You ate too many flies!", width/2, height/2 + 10);

    pop();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;

    fly.time += fly.frequency;
    fly.y = fly.baseY + sin(fly.time) * fly.amplitude;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.baseY = random(50, 300);
    fly.y = fly.baseY;
    fly.time = random(0, TWO_PI);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        score++;

        if (typeof eatSound !== 'undefined' && eatSound) {
            eatSound.play();
        }

        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

function displayScore() {
    push();
    fill("#000000");
    textSize(32);
    textAlign(screenLeft, TOP)

    text(`Score: ${score}`, 20, 20);
    pop();
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}
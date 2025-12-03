/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Snake with 2-second pause mechanism
 * 
 * Note: Shared variables (snake, food, gridSize, etc.) are declared in script.js
 */

// Blue variation specific variables
let isPaused = false;
let pauseTimer = 0;
let pauseDuration = 120; // 2 seconds at 60fps
let pauseInterval = 300; // Pause every 5 seconds (300 frames)

/**
 * This will be called just before the blue variation starts
 */
function blueSetup() {
    // Initialize snake in the center
    snake = [{ x: floor(width / gridSize / 2) * gridSize, y: floor(height / gridSize / 2) * gridSize }];
    direction = { x: gridSize, y: 0 };
    nextDirection = { x: gridSize, y: 0 };
    gameOver = false;
    score = 0;
    isPaused = false;
    pauseTimer = 0;
    frameCounter = 0;
    generateFood();
}

function generateFood() {
    let cols = floor(width / gridSize);
    let rows = floor(height / gridSize);
    food = {
        x: floor(random(cols)) * gridSize,
        y: floor(random(rows)) * gridSize
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

/**
 * This will be called every frame when the blue variation is active
 */
function blueDraw() {
    background(20, 20, 20);
    
    if (gameOver) {
        push();
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2 - 30);
        textSize(20);
        text("Score: " + score, width / 2, height / 2 + 10);
        text("Press R to restart", width / 2, height / 2 + 40);
        pop();
        return;
    }
    
    // Handle pause mechanism
    if (!isPaused) {
        pauseTimer++;
        // Check if it's time to pause
        if (pauseTimer >= pauseInterval) {
            isPaused = true;
            pauseTimer = 0;
        }
    } else {
        pauseTimer++;
        // Check if pause duration is over
        if (pauseTimer >= pauseDuration) {
            isPaused = false;
            pauseTimer = 0;
        }
    }
    
    // Draw game elements
    // Draw food
    fill(255, 100, 100);
    rect(food.x, food.y, gridSize, gridSize);
    
    // Draw snake
    fill(100, 200, 255);
    for (let segment of snake) {
        rect(segment.x, segment.y, gridSize, gridSize);
    }
    
    // Draw pause overlay
    if (isPaused) {
        push();
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("PAUSED", width / 2, height / 2);
        textSize(16);
        text("2 seconds...", width / 2, height / 2 + 40);
        pop();
        return; // Don't update game logic while paused
    }
    
    // Update frame counter and only move snake every N frames
    frameCounter++;
    if (frameCounter >= moveSpeed) {
        frameCounter = 0;
        
        // Update snake direction
        direction = { x: nextDirection.x, y: nextDirection.y };
        
        // Move snake
        let head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };
        
        // Check wall collision
        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
            gameOver = true;
            return;
        }
        
        // Check self collision
        for (let segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                gameOver = true;
                return;
            }
        }
        
        snake.unshift(head);
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            generateFood();
        } else {
            snake.pop();
        }
    }
    
    // Draw score
    push();
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);
    text("Game pauses every 5 seconds", 10, 30);
    pop();
}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function blueKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
        return;
    }
    
    if (gameOver && event.keyCode === 82) {
        blueSetup();
        return;
    }
    
    if (gameOver || isPaused) return;
    
    // Arrow keys
    if (event.keyCode === UP_ARROW) {
        if (direction.y === 0) nextDirection = { x: 0, y: -gridSize };
    } else if (event.keyCode === DOWN_ARROW) {
        if (direction.y === 0) nextDirection = { x: 0, y: gridSize };
    } else if (event.keyCode === LEFT_ARROW) {
        if (direction.x === 0) nextDirection = { x: -gridSize, y: 0 };
    } else if (event.keyCode === RIGHT_ARROW) {
        if (direction.x === 0) nextDirection = { x: gridSize, y: 0 };
    }
}

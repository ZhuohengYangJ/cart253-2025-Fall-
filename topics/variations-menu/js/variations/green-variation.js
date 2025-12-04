//G
let blocks = [];
let blockTimer = 0;
let blockInterval = 60; // Create new block every 60 frames
let blockLifetime = 120; // Blocks disappear after 120 frames


//
function greenSetup() {
    snake = [{ x: floor(width / gridSize / 2) * gridSize, y: floor(height / gridSize / 2) * gridSize }];
    direction = { x: gridSize, y: 0 };
    nextDirection = { x: gridSize, y: 0 };
    gameOver = false;
    score = 0;
    blocks = [];
    blockTimer = 0;
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
    

    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
    for (let block of blocks) {
        if (block.x === food.x && block.y === food.y) {
            generateFood();
            return;
        }
    }
}

function createRandomBlock() {
    let cols = floor(width / gridSize);
    let rows = floor(height / gridSize);
    let newBlock = {
        x: floor(random(cols)) * gridSize,
        y: floor(random(rows)) * gridSize,
        lifetime: blockLifetime
    };
    
    // Make sure block doesn't spawn on snake and insta gameover
    for (let segment of snake) {
        if (segment.x === newBlock.x && segment.y === newBlock.y) {
            return;
        }
    }
    if (food.x === newBlock.x && food.y === newBlock.y) {
        return;
    }
    for (let block of blocks) {
        if (block.x === newBlock.x && block.y === newBlock.y) {
            return;
        }
    }
    
    blocks.push(newBlock);
}

function greenDraw() {
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
    
    // Update block timer and create new blocks
    blockTimer++;
    if (blockTimer >= blockInterval) {
        blockTimer = 0;
        createRandomBlock();
    }
    
    // Update new blocks and remove expired ones
    for (let i = blocks.length - 1; i >= 0; i--) {
        blocks[i].lifetime--;
        if (blocks[i].lifetime <= 0) {
            blocks.splice(i, 1);
        }
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
        
        // Check block collision
        for (let block of blocks) {
            if (head.x === block.x && head.y === block.y) {
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
    
    // Draw food
    fill(255, 100, 100);
    rect(food.x, food.y, gridSize, gridSize);

    for (let block of blocks) {
        let opacity = map(block.lifetime, 0, blockLifetime, 100, 255);
        fill(255, 200, 0, opacity);
        rect(block.x, block.y, gridSize, gridSize);
    }
    
    // Draw snake
    fill(100, 255, 100);
    for (let segment of snake) {
        rect(segment.x, segment.y, gridSize, gridSize);
    }
    
    // Draw score
    push();
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);
    text("Avoid the blocks!", 10, 30);
    pop();
}

//keypress
function greenKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
        return;
    }
    
    if (gameOver && event.keyCode === 82) {
        greenSetup();
        return;
    }
    
    if (gameOver) return;
    
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

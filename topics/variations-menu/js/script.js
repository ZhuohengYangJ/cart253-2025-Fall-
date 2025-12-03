/**
 * Variation Menu
 * Pippin Barr
 * 
 * A relatively simple example of a set of variations within a single
 * project. (When we learn Object-Oriented Programming this will be a
 * LOT easier.)
 */

"use strict";

let state = "menu";

// Shared variables for all Snake game variations
let snake;
let food;
const gridSize = 20;
let direction;
let nextDirection;
let gameOver = false;
let score = 0;
let frameCounter = 0;
const moveSpeed = 20;

/**
 * Create the canvas
*/
function setup() {
    createCanvas(500, 500);
}


/**
 * Display the menu or the current variation
*/
function draw() {
    switch (state) {
        case "menu":
            if (typeof menuDraw === 'function') {
                menuDraw();
            }
            break;
        case "red-variation":
            if (typeof redDraw === 'function') {
                redDraw();
            }
            break;
        case "green-variation":
            if (typeof greenDraw === 'function') {
                greenDraw();
            }
            break;
        case "blue-variation":
            if (typeof blueDraw === 'function') {
                blueDraw();
            }
            break;
    }
}

/**
 * Listen for keypressed and call the function for it in the
 * current state
 */
function keyPressed(event) {
    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "red-variation":
            redKeyPressed(event);
            break;
        case "green-variation":
            greenKeyPressed(event);
            break;
        case "blue-variation":
            blueKeyPressed(event);
            break;
    }
}
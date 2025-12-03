/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("pink");

    for (let i = 0; i < height; i++) {
        stroke(i / 2, 100, 150);
        line(i, 0, i, height);
    };

    let x = 0;
    let y = 0;
    let shade = 0;
    while (x <= 500) {
        stroke(shade);
        line(x, 0, y, height);

        x += 50;
        y += 50;
        shade += 25;

    };

    let a = 0;
    let b = 0;
    let shade2 = 0;
    while (b <= 500) {
        stroke(shade2);
        line(0, a, width, b);

        a += 50;
        b += 50;
        shade2 += 25;
    };
};
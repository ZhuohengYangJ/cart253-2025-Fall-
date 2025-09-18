/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  velocity: {
    x: 0,
    y: 1
  },
  // Colour
  fill: {
    r: 225,
    g: 225,
    b: 225
  },
  sky: {
    red: 160,
    green: 180,
    blue: 200
  }
};
//hateful bird
let bird = {
    size: 30,
    x: 40,
    y: 40,
    velocity: {
        x: 1,
        y: 0
    }
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  //draw background
  mrFurious.sky.red = mrFurious.sky.red - 1;
  mrFurious.sky.green = mrFurious.sky.green - 1;
  mrFurious.sky.blue = mrFurious.sky.blue - 1;

  background(mrFurious.sky.red, mrFurious.sky.green, mrFurious.sky.blue);

  //Mr. Furious is getting angry
  mrFurious.fill.g = mrFurious.fill.g - 1;
  mrFurious.fill.b = mrFurious.fill.b - 1;

  //Mr. Furious is shaking
  mrFurious.velocity.y = 10 * sin(frameCount * 0.5);
  mrFurious.x = mrFurious.x + mrFurious.velocity.x;
  mrFurious.y = mrFurious.y + mrFurious.velocity.y;
  

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();


  //bird movement
  bird.velocity.y = 10 * sin(frameCount * 0.5);
  bird.x = bird.x + bird.velocity.x;
  bird.y = bird.y + bird.velocity.y;
  bird.x = constrain(bird.x, 0, width - 30);

  //draw the bird
  push();
  stroke(175, 235, 100);
  strokeWeight(3);
  fill(255, 255, 0);
  ellipse(bird.x, bird.y, bird.size);
}
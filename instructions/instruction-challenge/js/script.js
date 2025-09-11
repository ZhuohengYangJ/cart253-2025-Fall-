/**
 * Drawing Practice
 * Zhuohenvg Yang
 * 
 * Drawing a masterpiece
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED! (Please don't)
 */

"use strict";

/**
create canvas
*/
function setup() {
    createCanvas(800, 800);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    //draw light bku sky as background
    background(173, 216, 230);
    //draw a red sun
    push();
    stroke(255, 165, 0);
    strokeWeight(3);
    fill(200, 0, 0);
    ellipse(70, 70, 70,70);
    pop();

    //draw a greeen circl represents a small island covered with trees
    fill(0, 150, 10);
    ellipse(120, 400, 250, 400);

    // cover the bottom half of the green circle with dark bluee sea water to make it look more like a semicircle island
    fill(0, 0, 139);
    rect(0, 400, 800, 400);


}
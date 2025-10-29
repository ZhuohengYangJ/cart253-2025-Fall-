/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 background
*/
function setup() {
    createCanvas(640, 640);

}


function draw() {
    background("#ADD8E6");
    translate(width / 2, height / 2);
   drawFace(0, 0, 200, 250, 30, 60, 80);
    //drawLEye();


}

//draw my face
function drawFace(x, y, width, height, h, s, b) {
    for (let i = 0; i < 1000; i++){
        let angle = random(TWO_PI);
        let radius = random(0, 1);
        let px = x + cos(angle) * (width / 2) * radius;
        let py = y + sin(angle) * (height / 2) * radius;
        px = x + cos(angle) * (width / 2) * radius;
        py = y + sin(angle) * (height / 2) * radius;
        let hue = h + random(-5, 5);
        let sat = s + random(-10, 10);
        let bright = b + random(-15, 15);
        fill(hue, sat, bright);
        circle(px, py, random(2, 4));
    }
    //left eye
    push();
    fill("#f50808");
    strokeWeight(2);
    stroke("#eddb0d");
    ellipse(-25, 5, 20);
    pop();

    //right eye
    push();
    fill("#f50808");
    strokeWeight(2);
    stroke("#eddb0d");
    ellipse(25, 5, 20);
    pop();

    //mouth
    push();
    fill("#f50808");
    strokeWeight(2);
    stroke("#eddb0d");
    triangle(50, 70, -50, 70, 0, 25);
    pop();


}

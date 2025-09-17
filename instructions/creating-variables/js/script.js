/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";


let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;

let holeShade = 0;
let holeSize = 120;
let holeX = 140;
let holeY = 175;


//create canvas
function setup() {
    createCanvas(480, 480);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    //The cheese
    background(cheeseRed, cheeseGreen, cheeseBlue);

    //The hole
    push();
    noStroke();
    fill(holeShade);
    ellipse(holeX, holeY, holeSize);
    pop();


}
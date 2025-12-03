/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuText = `
SNAKE GAME VARIATIONS

(R) Default Snake
(G) Blocks Appear/Disappear
(B) Auto-Pause Every 5s`

/**
 * Display the main menu
 */
function menuDraw() {
    background(0);

    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(menuText, width / 2, height / 2);
    pop();
}

/**
 * Listen to the keyboard
 */
function menuKeyPressed(event) {
    switch (event.keyCode) { // event.keyCode = 82
        case 82:
            state = "red-variation";
            if (typeof redSetup === 'function') {
                redSetup();
            }
            break;

        case 71:
            state = "green-variation";
            if (typeof greenSetup === 'function') {
                greenSetup();
            }
            break;

        case 66:
            state = "blue-variation";
            if (typeof blueSetup === 'function') {
                blueSetup();
            }
            break;
    }
}
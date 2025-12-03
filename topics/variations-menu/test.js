// function test() {
//     console.log("test");
// }

// test();

// const a = 1;
// a = 2;
// let key = "";
// switch (key) {
//     case "red":
//         console.log("red");
//         break;
//     case "green":
//         console.log("green");
//         break;
//     case "blue":
//         console.log("blue");
//         break;
//     default:
//         console.log("default");
//         break;
// }

function test() {
    array = [1, 2, 3, 4, 5];
    for (let a of array) {
        console.log(a);
        if (a === 2) {
            return;
        }
    }
}

let a = 2;
let b = 2;

let c = {
    x: 1,
    y: 2
}

let d = {
    x: 1,
    y: 2
}

// console.log(0 == '0');
// console.log(0 === '0');

//test();

// console.log(array[5]);

// for (let i = 0; i < array.length; i++) {
//     console.log(array[i]);
// }


// let frameCounter = 0;
// const moveSpeed = 5;

// while (true) {
//     await new Promise(resolve => setTimeout(resolve, 200)); //pause for 200ms
//     frameCounter++;
//     if (frameCounter >= moveSpeed) {
//         //frameCounter = 0;
//         console.log("frameCounter is greater than or equal to moveSpeed");
//     }
// }

a = true;
console.log(!!!a);
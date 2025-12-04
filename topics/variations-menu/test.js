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

a = true;
console.log(!!!a);
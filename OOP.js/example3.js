function check(a, callback) {
    if (a % 2 !== 0) {
        callback("Odd", a);
    } else {
        callback("Even", a);
    }
}

function displayResult(result, num) {
    console.log(`The number ${num} is ${result}`);
}

check(5, displayResult);
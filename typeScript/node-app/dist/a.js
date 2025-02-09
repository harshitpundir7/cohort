"use strict";
const x = 101;
console.log(x);
function greeet(fristName) {
    console.log("hello " + fristName);
}
greeet("Harshit");
function sum(a, b) {
    return a + b;
}
console.log(sum(4, 5));
function isLegal(x) {
    if (x >= 18) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isLegal(34));
function runAftee1Sec(fn) {
    setTimeout(fn, 2000);
}
runAftee1Sec(() => greeet("harshit"));
const realUser = {
    fristName: "Harshit",
    lastName: "Pundir",
    age: 22
};
function isLegal2(user) {
    if (user.age >= 18)
        return true;
    else
        return false;
}
console.log(isLegal2(realUser));
const teamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software developer"
};
function maxValue(arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
console.log(maxValue([1, 2, 3]));

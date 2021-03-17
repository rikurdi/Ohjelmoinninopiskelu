var minValue = 0;
var maxValue = 0;
var answer = null;

function getValues() {
    minValue = document.getElementById("minnumber").value;
    console.log(minValue + "min value");
    maxValue = document.getElementById("maxnumber").value;
    console.log(maxValue + "max value");
}

function myResult(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    answer = Math.floor(Math.random() * (max - min + 1) + min);
    document.getElementById("result").innerHTML = "Result: " + answer;
}
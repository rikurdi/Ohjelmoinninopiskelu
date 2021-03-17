//Tehtävä 1////////////////////////////////////
var taulukko = [];
function getValues() {
    taulukko.push(document.getElementById("eka").value);
    taulukko.push(document.getElementById("toka").value);
    taulukko.push(document.getElementById("kolmas").value);
    console.log(taulukko);
}

function jarjesta() {
    taulukko.sort(function(a, b){return a - b});
    document.getElementById("vastaus").innerHTML = taulukko;
}

//Tehtävä 2///////////////////////////////////
var taulukko2 = [];
function getValues2() {
    taulukko2.push(document.getElementById("eka1").value);
    taulukko2.push(document.getElementById("toka1").value);
    taulukko2.push(document.getElementById("kolmas1").value);
    taulukko2.push(document.getElementById("neljas1").value);
    taulukko2.push(document.getElementById("viides1").value);
    console.log(taulukko2);
}

function highestValue() {
    var tulos = Math.max.apply({}, taulukko2);
    document.getElementById("vastaus1").innerHTML = tulos;
}

//Tehtävä 3///////////////////////////////////////
function jakojaannos() {
    var annettuLuku = document.getElementById("luku").value;
    if(annettuLuku % 2 === 0) {
        document.getElementById("vastaus2").innerHTML = "Parillinen";
    } else {
        document.getElementById("vastaus2").innerHTML = "Pariton";
    }
}

//Tehtävä 4/////////////////////////////////////////

function kayttajanIka() {
    var ika = document.getElementById("ika").value;
    if(ika >= 100) {
        document.getElementById("vastaus3").innerHTML = "Saatat olla liian vanha ajaaksesi ajoneuvoa";
    } else if (ika < 16) {
        document.getElementById("vastaus3").innerHTML = "Polkupyörä";
    } else if (ika < 18) {
        document.getElementById("vastaus3").innerHTML = "Mopo";
    } else {
        document.getElementById("vastaus3").innerHTML = "Auto";
    }
}

//Tehtävä 5/////////////////////////////////////////

function kielet() {
    var val = document.getElementById("kielet");
    document.getElementById("vastaus4").innerHTML = val.value;
}
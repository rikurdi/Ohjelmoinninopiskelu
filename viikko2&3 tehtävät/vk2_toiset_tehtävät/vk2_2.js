// TEHTÄVÄ 1
function negVaiPos() {
    var luku = document.getElementById("input").value;
    if(luku == '') {
        document.getElementById("V").innerHTML = "Syötä kokonaisluku!"
    }
    else if(luku >= 0) {
        document.getElementById("V").innerHTML = "Luku on positiivinen"
    }else if(luku < 0) {
        document.getElementById("V").innerHTML = "Luku on negatiivinen"
    }
}

// TEHTÄVÄ 2
function viikonpaivat() {
    var luku = document.getElementById("pva").value;
    var paiva = "";

    switch(luku) {
        case 1:
            paiva = "Maanantai";
            break;
        case 2:
            paiva = "Tiistai";
            break;
        case 3:
            paiva = "Keskiviikko";
            break;
        case 4:
            paiva = "Torstai";
            break;
        case 5:
            paiva = "Perjantai";
            break;
        case 6:
            paiva = "Lauantai";
            break;
        case 7:
            paiva = "Sunnuntai";
    }
        document.getElementById("tehtava2").innerHTML = "Tänään on" + paiva;

}

//TEHTÄVÄ 3
function karkausvuosi() {
    var vuosiluku = document.getElementById("vluku").value;

    if(vuosiluku % 4 == 0 && vuosiluku % 100 !== 0) {
        document.getElementById("tehtava3").innerHTML = "Vuosi on karkausvuosi";
    }else if(vuosiluku % 400 == 0) {
        document.getElementById("tehtava3").innerHTML = "Vuosi on karkausvuosi";
    }else{
        document.getElementById("tehtava3").innerHTML = "Vuosi ei ole karkausvuosi.";
    }
}

//TEHTÄVÄ 4

function lukuja() {
    var eka = document.getElementById("luku1").value;
    var toka = document.getElementById("luku2").value;
    var kolmas = document.getElementById("luku3").value;
    var neljas = document.getElementById("luku4").value;
    var viides = document.getElementById("luku5").value;

    eka = parseInt(eka, 10);
    toka = parseInt(toka, 10);
    kolmas = parseInt(kolmas, 10);
    neljas = parseInt(neljas, 10);
    viides = parseInt(viides, 10);

    var summa = eka + toka + kolmas + neljas + viides;
    console.log(summa);
    var keskiarvo = summa / 5;
    document.getElementById("tehtava4").innerHTML = "Lukujen summa on: " + summa + "ja keskiarvo on: " + keskiarvo;
}

//TEHTAVA 5
function lausemuuttuja() {
    var luku = document.getElementById("viisi").value;
    var lause = "";

    lause += luku + " x 1 = " + luku * 1 + "<br>";
    lause += luku + " x 2 = " + luku * 2 + "<br>";
    lause += luku + " x 3 = " + luku * 3 + "<br>";
    lause += luku + " x 4 = " + luku * 4 + "<br>";
    lause += luku + " x 5 = " + luku * 5 + "<br>";
    lause += luku + " x 6 = " + luku * 6 + "<br>";
    lause += luku + " x 7 = " + luku * 7 + "<br>";
    lause += luku + " x 8 = " + luku * 8 + "<br>";
    lause += luku + " x 9 = " + luku * 9 + "<br>";
    lause += luku + " x 10 = " + luku * 10 + "<br>";

    document.getElementById("tehtava5").innerHTML = lause;
}
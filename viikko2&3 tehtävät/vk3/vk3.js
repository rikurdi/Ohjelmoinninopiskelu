//TEHTÄVÄ 1
function parilliset() {
    var input = document.getElementById("eka").value;
    var tulos = 0;
    if(input == "") {
        alert("Syötä parillinen luku!");
    } else if(isNaN(input)) {
        alert("Syötä parillinen luku!");
    } else if(input % 2 !== 0) {
        alert("Luku on pariton, syötä parillinen luku!")
    } else {
        tulos = "";
        for(i = 2; i <= input; i += 2) {
            tulos += i + " ";
        }
        document.getElementById("v1").innerHTML = tulos;
    }
}

//TEHTÄVÄ 2 KESKEN!!!!!
function muuntaja() {
    var str = document.getElementById("toka").value;
    var myArr = str.split("");

    for(i=0; i<myArr.length; i++) {
        myArr.push(["\u00d6"]);
    }
    console.log(myArr);
    
}

//TEHTÄVÄ 3
function check() {
    var str = ""
    str = document.getElementById("kolmas").value;
    if(str.includes('\u00f6')) {
        document.getElementById("v3").innerHTML = "on"
    } else if(str.includes('\u00d6')) {
        document.getElementById("v3").innerHTML = "on"
    }else {
       document.getElementById("v3").innerHTML = "ei ole"
    }
}

//TEHTÄVÄ 4
function kertoma() {
    var luku = document.getElementById("neljas").value;
    var kertoma = 1;
    for(i=luku; i > 1; i--) {
        kertoma *= i;
    };
    document.getElementById("v4").innerHTML = "Luvun " + luku + " kertoma on " + kertoma;
}

//TEHTÄVÄ 5
function hipheijaa() {
    for(i=1; i<101; i++) {
        if(i % 3 === 0) {
            document.getElementById("v5").innerHTML += " hip ";
        } else if(i % 5 === 0) {
            document.getElementById("v5").innerHTML += " heijaa ";
        } else if(i % 3 === 0 && i % 5 === 0){
            document.getElementById("v5").innerHTML += " hipheijaa ";
        } else {
            document.getElementById("v5").innerHTML += " " + i;
        }
    }
}

//TEHTÄVÄ 6
function kymmenen() {
    for(i=1; i<11; i++) {
        document.getElementById("v6").innerHTML += i + " ";
    }
}

//TEHTÄVÄ 7
function summa() {
    var sum = 0;
    for(i=0; i<11; i++) {
        sum += i;
    }
    document.getElementById("v7").innerHTML = sum;
}

//TEHTÄVÄ 8
function potenssi() {
    var int = document.getElementById("korotettava").value;
    var pow = document.getElementById("potenssi").value;
    var result = Math.pow(int, pow);
    document.getElementById("v8").innerHTML = result;
}

//TEHTÄVÄ 9
function minmax() {
    var a = document.getElementById("luku1").value;
    var b = document.getElementById("luku2").value;
    var c = document.getElementById("luku3").value;
    var d = document.getElementById("luku4").value;
    var e = document.getElementById("luku5").value;
    var min = Math.min(a,b,c,d,e)
    var max = Math.max(a,b,c,d,e);

    document.getElementById("v9").innerHTML = "Pienin luku: " + min + " Suurin luku: " + max;


}

//TEHTÄVÄ 10, en saanut ratkaistua.
function saliksia() {
   
}

//TEHTÄVÄ 11, en saanut ratkaistua.
function laskuja() {
    var pienempi = document.getElementById("pieninro").value;
    var suurempi = document.getElementById("isonro").value;
    var evenSum = 0;
    var oddSum = 0;
    var even = 0;
    var odd = 0;

    for(i=pienempi; i<=suurempi; i++) {
        if(i % 2 === 0) {
            console.log(i);
            even += i;
        } else if(i % 2 !==0){
            console.log(i);
            odd += i;
        }
    }
    document.getElementById("evenNro").innerHTML = "Parillisten summa: " + even;
    document.getElementById("oddNro").innerHTML = "Parittomien summa: " + odd;

}

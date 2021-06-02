// Testi alert
function heippa() {
  alert("Heippa!");
}

// Kahden luvun yhteissumma
function lukujenSumma(a, b) {
  console.log(a+b + " Lukujen summa");
}
lukujenSumma(1, 19);

// Taulukkomuuttujan ensimmäisen elementin arvo
function ekaLuku(arr){
  console.log(arr[0] + " Taulukon ensimmäinen luku");
}
ekaLuku([34, 566, 71, 89]);

// Testaa jos lukujen yhteenlaskettu summa on alle 100.
function alleSata(a, b) {
  return (a + b) < 100 ? console.log(a + " + " + b + " Lukujen summa on alle 100")
  : console.log(a + " + " + b + " Luvut ovat liian suuria, jotta pystyisin laskemaan niitä!");
}
alleSata(49, 50);

// Testaa ovatko luvut samoja
function samaLuku(a, b) {
  return (a === b) ? console.log( a + " & " + b + " Samat")
  : console.log( a + " & " + b + " Eri luvut");
}
samaLuku(6, 6);

// Muuntaa annetut tunnit, minuutit ja sekunnit sekunneiksi
function muuntaja(h, min, sec) {
  let sekunnit = 0;
  sekunnit = sekunnit + (3600 * h) + (60 * min) + sec;
  return console.log(sekunnit + " sekuntia");
}
muuntaja(11, 22, 400);

// Muuntaa annetun vuoden ja päivän päiviksi
function paivat(vuodet, paivat) {
  let result = vuodet * 362.25 + 178;
  return console.log(result + " päivää vanha");
}

paivat(23, 178);

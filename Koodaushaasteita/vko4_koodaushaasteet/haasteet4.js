//OHJELMA 1
function isoKirjain() {
    event.preventDefault();
   let input = document.getElementById("str").value;
   let a = /[A-Z]/;
   let vastaus = document.getElementById("t1v");

   if(!a.test(input)) {
        vastaus.innerHTML = "Alkukirjain on pieni";
   } else {
        vastaus.innerHTML = "Alkukirjain on iso";
   }
}

//OHJELMA 2
function trimmer() {
     event.preventDefault();
     let input = document.getElementById("whitespace").value;

     input.trim();
     document.getElementById("t2v").innerHTML = input;
}
//OHJELMA 3
function countVowels() {
     event.preventDefault();
     let input = document.getElementById("vowels").value;
     let vowelCount = 0;
     vowelCount = input.match(/[aeiou]/gi).length;
     document.getElementById("t3v").innerHTML = vowelCount + " vokaalia";
}

//OHJELMA 4
function isAlphanumeric() {
     event.preventDefault();
     let input = document.getElementById("alphanumeric").value;
     let a = /^[a-z0-9]+$/i;
     if(a.test(input)) {
          document.getElementById("t4v").innerHTML = "Alfanumeerinen"
     } else{
          document.getElementById("t4v").innerHTML = "Ei-alfanumeerinen";
     }
}
//OHJELMA 5
function postalCode() {
     event.preventDefault();
     let input = document.getElementById("postal").value;
     let a = /^[0-9]+$/i;
     let vastaus = document.getElementById("t5v");

     if(a.test(input) && input.length === 5) {
          vastaus.innerHTML = "On postinumero";
     } else {
          vastaus.innerHTML = "Ei ole postinumero";
     }
}
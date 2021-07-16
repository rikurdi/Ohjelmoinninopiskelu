// TEHTÄVÄ 1 KESKEN
function scrabbler() {
    var word = document.getElementById("scrabble").value;
    word = word.toUpperCase();

    const pisteet= {
        'A' : 1,'E' : 1,'I' : 1,'N' : 1,'S' : 1,'T' : 1,
        'O' : 2,'Ä' : 2,'K' : 2,'L' : 2,
        'U' : 3,'M' : 3,
        'Y' : 4,'H' : 4,'J' : 4,'P' : 4,'R' : 4,'V' : 4,
        'Ö' : 7,'D' : 7,
        'B' : 8,'F' : 8,'G' : 8,
        'C' : 10,
        'Q' : 12, 'Z' : 12
    };
    var sum = 0;
    for (var i = 0; i < word.length; ++i) {
    sum += pisteet[word.charAt(i)] || 0;
}

    document.getElementById("score").innerHTML = "Pisteet: " + sum;
}

// TEHTÄVÄ 2
function lottery() {
    var numbers = [];
    var min = Math.ceil(1);
    var max = Math.floor(40);
    for(var i = 0; i < 7; i++) {
        numbers.push(Math.floor(Math.random() * (max-min) + min));
    }
    document.getElementById("lottorivi").innerHTML = numbers;
}
// TEHTÄVÄ 3
var tableData = [[1,2,1,24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]];
function createTable(tableData) {
    var table = document.createElement('table');
    var row = {};
    var cell = {};
  
    tableData.forEach(function(rowData) {
      row = table.insertRow(-1);
      rowData.forEach(function(cellData) {
        cell = row.insertCell();
        cell.textContent = cellData;
      });
    });
    document.body.appendChild(table);
  }

  function kortit() {
    var numbers = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    var colors = ['&#9828;', '&#9827;', '&#9826;', '&#9825;'];
    var num1 = numbers[Math.floor(Math.random()*13)];
    var num2 = numbers[Math.floor(Math.random()*13)];
    var num3 = numbers[Math.floor(Math.random()*13)];
    var num4 = numbers[Math.floor(Math.random()*13)];
    var col1 = colors[Math.floor(Math.random()*4)];
    var col2 = colors[Math.floor(Math.random()*4)];
    var col3 = colors[Math.floor(Math.random()*4)];
    var col4 = colors[Math.floor(Math.random()*4)];
    var result = [col1, num1, col2, num2, col3, num3, col4, num4];
    document.getElementById('arvottu').innerHTML = result;
}
  
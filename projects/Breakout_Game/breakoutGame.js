//Breakout oma ryhmäprojekti js-osuus/Paul Willman, Riku Kaartoaho, Eriko Korhonen/7.5.2021
/*
10.5.2021 RIKU KAARTOAHO - MUUTIN HTML canvasin height ja width päittäin jotta sai taustakuvan
kätevästi istumaan ruudulle. Lisäsin peliin loop(), update() ja draw()-funktiot. Muutin myös hieman
var canv = document.createElement("canvas") ---> const canv = document.getElementById("breakout").
Jotta verrataan suoraan jo html-tiedostossa luotuun canvasiin, eikä tarvitse luoda uutta.
Lisäsin myös brick objektin ja funktiot jotta saadaan brick-blockit tulostumaan pelialueelle.
Pituuksia, offsetteja ja värejä voi kokeilla ja säätää riveiltä 32-42.

12.5.2021 RIKU KAARTOAHO - Lisäsin brick-kuvat ja muutin hieman offset-arvoja.

24.5.2021 Paul Willman - päivitin pallon funktioita ja lisäsin funktiot pallon pyörimisille. Nyt pallo
tulee hyödyntämään MIN_BOUNCE_ANGLE ja spinBall funktioita aina kun se osuu seinään, tiileihin tai mailaan.

28.5.2021 Paul Willman - äänet lisätty mailaan, seiniin ja tiileihin.

28.5.2021 Riku Kaartoaho - Lisätty levelUp-toiminto. Max-lvl on säädettävissä. Peli voitettu kun currentLVL == maxlevel.

31.5.2021 Paul Willman - Muutettu mailan kokoa paksummaksi, jotta pallo ei ruudunpäivityksen takia mene siitä läpi.
Vaihdettu myös uudet äänet mailalle, seinille ja tiileille. Lisätty myös voitto ja häviöruuduille omat sound effectit.
“Sound effects obtained from https://www.zapsplat.com“
*/

//=========================================================================================

// pelin parametrit
let BALL_SPD = 0.6; // starting ball speed as a fraction of screen width per second
const BALL_SPD_MAX = 2; // max ball speed as a multiple of starting speed
const BALL_SPIN = 0.2; // ball deflection off the paddle (0 = no spin, 1 = high spin)
const MIN_BOUNCE_ANGLE = 30; // minimum bounce angle from the horizontal in degrees
const HEIGHT = 800; // height as pixels
const PADDLE_SPD = 0.7; //fraction of screen width per second

// derived Dimensions
const WIDTH =  600 //HEIGHT * 0.9;
const WALL = WIDTH / 50;
const BALL_SIZE = 14;
const PADDLE_H = 20;
const PADDLE_W = PADDLE_H * 5;

// värit
const COLOR_WALL = "grey";


// definitions
const Direction = {
  LEFT: 0,
  RIGHT: 1,
  STOP: 2
}

// aseta pelin kanvaasi ja konteksti
const canv = document.getElementById("breakout");
document.body.appendChild(canv);
const ctx = canv.getContext("2d");
ctx.lineWidth = WALL;

// set up sound effects
var fxBrick = new Audio("assets/sounds/brick.mp3");
var fxPaddle = new Audio("assets/sounds/paddle_bounce.mp3");
var fxWall = new Audio("assets/sounds/bounce.mp3");
var fxLevelUp = new Audio("assets/sounds/level_up.mp3")
var fxGameOver = new Audio("assets/sounds/game_over.mp3")
var fxYouWin = new Audio("assets/sounds/you_win.mp3")

// pelin muuttujat
var ball, paddle, touchX;
var gameStarted = false;
var gameOver = false;
var start = document.getElementById("gameStart");
var gameOverSCREEN = document.getElementById("gameOverScreen");
var LIVES = 3; // pelaajalla on 3 elämää
var score = 0; //pelaajan pisteet
var CURRENT_LVL = 1;
var scoreHigh;
const MAX_LVL = 6;
const SCORE_UNIT = 10;
const restart = document.getElementById("restart");
const winner = document.getElementById("gameWon"); 
const KEY_SCORE = "breakout_highscore";
console.log("game started: " + gameStarted);

// aloita uusi peli
 newGame();

 //aloita uusi peli häviön jälkeen
 restart.addEventListener('click', function() {
    location.reload();
 })


// event listeners
//  canv.addEventListener("touchcancel", touchCancel);
//  canv.addEventListener("touchend", touchEnd);
//  canv.addEventListener("touchmove", touchMove);
//  canv.addEventListener("touchstart", touchStart);
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

// tuodaan kuvat
const BG_IMG = new Image();
BG_IMG.src = "assets/background-img3.jpg"; // kokeilu
const red_brick = new Image();
red_brick.src = "assets/bricks/redBrick.png";
const beigeBrick = new Image();
beigeBrick.src = "assets/bricks/beigeBrick.png";
const pinkBrick = new Image();
pinkBrick.src = "assets/bricks/pinkBrick.png";
const orangeBrick = new Image();
orangeBrick.src = "assets/bricks/orangeBrick.png";
const redPaddle = new Image();
redPaddle.src = "assets/paddles/metalPaddle.png";
const redBall = new Image();
redBall.src = "assets/redBall2.png";
const LIFE_IMG = new Image();
LIFE_IMG.src = "assets/life.png";
const SCORE_IMG = new Image();
SCORE_IMG.src = "assets/points.png";
const armored_brick = new Image();
armored_brick.src = "assets/bricks/armored_brick.png";

let brickImages = [beigeBrick, red_brick];

//luodaan brick olio joka sisältää kaikki brickien oletus määritteet.
const brick = {
  row : 1,
  column: 5,
  width: 80,
  height: 22,
  offSetLeft : 33,
  offSetTop : 20,
  marginTop : 80,
  fillColor : "#b90015",
  strokeColor : "#000",
}
//Bricks funktio, käytetään nested for-looppia bricks[][] taulukon läpi ja lisää jokaiselle riville ja rivin sarakkeille uuden brickin
let bricks = [];
function createBricks() {
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}
createBricks();


//Tulostetaan brickit canvasille
function drawBricks() {
  for(let r = 0; r < brick.row; r++){
      for(let c = 0; c < brick.column; c++) {
          let b = bricks[r][c];
      if(b.status && CURRENT_LVL == 1){
          ctx.drawImage(beigeBrick, b.x, b.y, brick.width, brick.height);
          }

      if(b.status && CURRENT_LVL == 2){
          ctx.drawImage(orangeBrick, b.x, b.y, brick.width, brick.height);
          }
      if(b.status && CURRENT_LVL == 3){
        ctx.drawImage(pinkBrick, b.x, b.y, brick.width, brick.height);
        }
      if(b.status && CURRENT_LVL == 4){
        ctx.drawImage(red_brick, b.x, b.y, brick.width, brick.height);
          }
      if(b.status && CURRENT_LVL == 5) {
          ctx.drawImage(armored_brick, b.x, b.y, brick.width, brick.height);
        }
      }
      }
  }


drawBackground();

function drawBackground()
  {
    ctx.fillStyle = BG_IMG;
    ctx.fillRect(0, 0, canv.width, canv.height);
  }
// 1.vaihe/ EK / 7.5.2021


function drawBall() {
  ctx.fillStyle = redBall;
  //ctx.fillRect(ball.x - ball.w * 0.5, ball.y - ball.h * 0.5, ball.w, ball.h);
  ctx.drawImage(redBall, ball.x - ball.w * 0.5, ball.y - ball.h * 0.5, ball.w, ball.h);
}

function drawPaddle() {
  ctx.fillStyle = redPaddle;
  //ctx.fillRect(paddle.x - paddle.w * 0.5, paddle.y - paddle.h * 0.5, paddle.w, paddle.h);
  ctx.drawImage(redPaddle, paddle.x - paddle.w * 0.5, paddle.y - paddle.h * 0.5, paddle.w, paddle.h);
}

function drawWaLLs() {
  let hwall = WALL * 0.5;
  ctx.strokeStyle = COLOR_WALL;
  ctx.beginPath();
  ctx.moveTo(hwall, HEIGHT);
  ctx.lineTo(hwall, hwall);
  ctx.lineTo(WIDTH - hwall, hwall);
  ctx.lineTo(WIDTH - hwall, HEIGHT);
  ctx.stroke();
}
//Pelin ensimmäinen aloitus menusta
function startGame() {
  start.style.display = "none";
  gameStarted = true;
  console.log("game started: " + gameStarted);
}

//
//LEVEL UP
//
function levelUp() {
  if(CURRENT_LVL == MAX_LVL) {
    gameWon();
    return;
  }

  var isLevelDone = true;
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++) {
      isLevelDone = isLevelDone && ! bricks[r][c].status;
    }
  }
    if(isLevelDone) {
      brick.row++;
      checkNextLevel(CURRENT_LVL + 1);
      createBricks();
      BALL_SPD += 0.2;
      fxLevelUp.play();
      newGame();
      CURRENT_LVL++;
    }

}

//
//PELI VOITETTU
//
function gameWon() {
  checkHighScore();
  winner.style.display = "block";
  fxYouWin.play();
}

function checkHighScore() {
  if (score > scoreHigh) {
    scoreHigh = score;
    localStorage.setItem(KEY_SCORE, scoreHigh);
  }
}

//pelin loop funktio
var timeDelta, timeLast;
requestAnimationFrame(loop);
function loop(timeNow) {
  if (!timeLast) {
    timeLast = timeNow;
  }

  // laske aikaero
  timeDelta = (timeNow - timeLast) / 1000; //seconds
  timeLast = timeNow;

  // päivitä
  ifGameOver();
  levelUp();
  updatePaddle(timeDelta);
  updateBall(timeDelta);

  //Pelin draw alue funktiosta, joka tulostaa kaiken halutun tiedon canvasiin. Kuten pallot, paddlet ja brickit.
  ctx.drawImage(BG_IMG, 0, 0);
  drawBricks();
  drawWaLLs();
  drawPaddle();
  drawBall();
  //näyttää elämät
  gameStats(LIVES, canv.width - 50, 50, LIFE_IMG, canv.width - 80, 25);
  //näyttää pisteet
  gameStats(score, 60, 50, SCORE_IMG, 30, 27);
  drawHighscore(scoreHigh, 35, canv.height - 15);

  // kutsu seuraava looppi
    requestAnimationFrame(loop);
}

  // päivitä pallon x ja y kiihdytykset
function applyBallSpeed(angle) {
  ball.xv = ball.spd * Math.cos(angle);
  ball.yv = -ball.spd * Math.sin(angle);
}

function keyDown(ev) {
  switch (ev.keyCode) {
    case 32: // space bar (serve the ball)
      if(gameStarted == true); {
        serve();
        break;
      }
    case 37: // left arrow (move paddle left)
      movePaddle(Direction.LEFT);
      break;
    case 39: // right arrow (move paddle right)
      movePaddle(Direction.RIGHT);
      break;
  }
}

function keyUp(ev) {
  switch (ev.keyCode) {
    case 37: // left arrow (stop moving)
    case 39: // right arrow (stop moving)
      movePaddle(Direction.STOP);
      break;
  }
}

function movePaddle(direction) {
  switch (direction) {
    case Direction.LEFT:
      paddle.xv = -paddle.spd;
      break;
    case Direction.RIGHT:
      paddle.xv = paddle.spd;
      break;
    case Direction.STOP:
      paddle.xv = 0;
      break;
  }
}
//elämien ollessa <= 0, ikkuna pysähtyy ja game over-kuva tulee näkyviin
function ifGameOver() {
  if(gameOver == true) {
    gameOverSCREEN.style.display = "block";
    BG_IMG.style.opacity = 0.5;
    checkHighScore();
    event.preventDefault();
  }
}

function newGame() {
  touchX = null;
  paddle = new Paddle();
  ball = new Ball();
  // get high score from local storage
  let scoreStr = localStorage.getItem(KEY_SCORE);
  if (scoreStr == null) {
    scoreHigh = 0;
  } else {
    scoreHigh = parseInt(scoreStr);
  }
}

function outOfBounds() {
  // mitä tehdä out of bounds tilanteessa
  if(LIVES <= 0) {
    gameOver = true;
    fxGameOver.play();
  } else {
    newGame();
  }
}

//Pelin pisteenlasku funktio
function gameStats(text, textX, textY, img, imgX, imgY) {
  ctx.fillStyle = "000";
  ctx.font = "30px sans-serif";
  ctx.fillText(text, textX, textY);

  //tuodaan kuva
  ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

function drawHighscore(text, textX, textY) {
  ctx.fillStyle = "000";
  ctx.font = "italic small-caps bold 16px Segoe UI";
  ctx.fillText("BEST: " + text, textX, textY);
}

function serve() {
  //Jos peliä ei ole aloitettu, estä syöttö
  if(gameStarted != true) {
    return;
  }
   // jos pallo on jo liikkeellä, estä uudelleen syöttö
  else if (ball.yv != 0) {
      return;
  }
  else {
    // random kulma (ei vähemmän kuin minimi pomppu kulma)
    let minBounceAngle = MIN_BOUNCE_ANGLE / 180 * Math.PI; // radians
    let range = Math.PI - minBounceAngle * 2;
    let angle = Math.random() * range + minBounceAngle;
    applyBallSpeed(angle);
    fxPaddle.play();
    return true;
  }
}

function updateBall(delta) {
  ball.x += ball.xv * delta;
  ball.y += ball.yv * delta;

  // pommahda pallo pois seinistä
  if (ball.x < WALL + ball.w * 0.5) {
      ball.x = WALL + ball.w * 0.5;
      ball.xv = -ball.xv;
      fxWall.play();
      spinBall();
  } else if (ball.x > canv.width - WALL - ball.w * 0.5) {
      ball.x = canv.width - WALL - ball.w * 0.5;
      ball.xv = -ball.xv;
      fxWall.play();
      spinBall();
  } else if (ball.y < WALL + ball.h * 0.5) {
      ball.y = WALL + ball.h * 0.5;
      ball.yv = -ball.yv;
      fxWall.play();
      spinBall();
  }

  // pommahda pallo pois mailasta
  if (ball.y > paddle.y - paddle.h * 0.5 - ball.h * 0.5
      && ball.y < paddle.y + paddle.h * 0.5
      && ball.x > paddle.x - paddle.w * 0.5 - ball.w * 0.5
      && ball.x < paddle.x + paddle.w * 0.5 + ball.w * 0.5
  ) {
    ball.y = paddle.y - paddle.h * 0.5 - ball.h * 0.5;
    ball.yv = -ball.yv;
    fxPaddle.play();
    spinBall();
  }

  function spinBall() {
        let upwards = ball.yv < 0;
        let angle = Math.atan2(-ball.yv, ball.xv);
        angle += (Math.random() * Math.PI / 2 - Math.PI / 4) * BALL_SPIN;

        // minimi pomppun kulma
        let minBounceAngle = MIN_BOUNCE_ANGLE / 180 * Math.PI; // radians
        if (upwards) {
            if (angle < minBounceAngle) {
                angle = minBounceAngle;
            } else if (angle > Math.PI - minBounceAngle) {
                angle = Math.PI - minBounceAngle;
            }
        } else {
            if (angle > -minBounceAngle) {
                angle = -minBounceAngle;
            } else if (angle < -Math.PI + minBounceAngle) {
                angle = -Math.PI + minBounceAngle;
            }
        }
        applyBallSpeed(angle);
    }

    //funktiot kosketus tapahtumille, jotta peliä voi pelata kosketusnäytöllä
    function touchCancel(ev) {
      touchX = null;
      movePaddle(Direction.STOP);
    }

    function touchEnd(ev) {
      touchX = null;
      movePaddle(Direction.STOP);
    }

    function touchMove(ev) {
      touchX = ev.touches[0].clientX;
    }

    function touchStart(ev) {
      if (serve()) {
        if (gameOver) {
          newGame();
        }
        return;
      }
      touchX = ev.touches[0].clientX;
    }


    //pallon osuessa brick:n, brick tuhoutuu ja SCORE++
    for(let r = 0; r < brick.row; r++){
      for(let c = 0; c < brick.column; c++) {
        let b = bricks[r][c];
          if(b.status){
            if(ball.x + BALL_SIZE/2 > b.x && ball.x - BALL_SIZE/2 < b.x + brick.width
                && ball.y + BALL_SIZE/2 > b.y && ball.y - BALL_SIZE/2 < b.y + brick.height) {

                ball.yv = - ball.yv;
                  b.status = false; // Brick rikkoutuu pallon osuessa.
                fxBrick.play();
                spinBall();
                score += SCORE_UNIT;
        }
      }
    }
  }

  // mitä tehdä out of bounds tilanteessa
  if (ball.y > canv.height) {
    LIVES--;
    console.log("elämät: " + LIVES);
    outOfBounds();
  }

  // liikuta paikallaan olevaa palloa mailan kanssa
  if (ball.yv == 0) {
    ball.x = paddle.x;
  }
}

function updatePaddle(delta) {

  // Hoitaa kosketus pelaamisen
  if (touchX != null) {
    if (touchX > paddle.x + wall) {
        movePaddle(Direction.RIGHT);
    } else if (touchX < paddle.x - wall) {
      movePaddle(Direction.LEFT);
    } else {
      movePaddle(Direction.STOP);
    }
  }

  // liikuttaa mailaa
  paddle.x += paddle.xv * delta;

  // pysäytä maila seiniin
  if (paddle.x < WALL + paddle.w * 0.5) {
      paddle.x = WALL + paddle.w * 0.5;
  } else if (paddle.x > canv.width - WALL - paddle.w * 0.5) {
      paddle.x = canv.width - WALL - paddle.w * 0.5;
  }
}

// funktio pallolle
function Ball() {
  this.w = BALL_SIZE;
  this.h = BALL_SIZE;
  this.x = paddle.x;
  this.y = paddle.y - paddle.h / 2 - this.h / 2;
  this.spd = BALL_SPD * WIDTH;
  this.xv = 0;
  this.yv = 0;
}

//funktio mailalle
function Paddle() {
  this.w = PADDLE_W;
  this.h = PADDLE_H;
  this.x = canv.width / 2;
  this.y = canv.height - this.h * 3;
  this.spd = PADDLE_SPD * WIDTH;
  this.xv = 0;
}

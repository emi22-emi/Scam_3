let colors = ['red', 'green', 'blue', 'yellow', 'pink', 'orange', 'brown', 'purple', 'black'];
let circles = [];
let currentColor = '';
let textColor = '';
let score = 0;
let round = 0;
let clicked = false;
let timer = 180;
let showRestart = false;
let buttonX, buttonY, buttonW, buttonH;
let failcount = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();

  buttonW = 200;
  buttonH = 40;
  buttonX = width / 2 - buttonW / 2;
  buttonY = height - 80;

  resetGame();
}

function resetGame() {
  
  circles = [];
  score = 0;
  round = 0;
  clicked = false;
  timer = 180;
  showRestart = false;

  // kółka
  let startX = width/2 -100;
  let startY = 150;
  let spacing = 100;
  let i = 0;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      circles.push({
        x: startX + x * spacing,
        y: startY + y * spacing,
        color: colors[i]
      });
      i++;
    }
  }

  pickNewColor();
}
function draw() {
  background(255);

  if (round >= 3) {
    print(failcount);
    if (failcount == 3){ 
      window.location.href='https://helena212121.github.io/Scam_4/';
      print('go!');
     // failcount++;
    }
    fill(0);
    textSize(24);
    text("Wynik: " + score + " / 3", width / 2, 40);
    textSize(24);
    fill('#DA1E1E');
    text("Coś poszło nie tak.", width / 2, 80);
    
    fill(220);
    rect(buttonX, buttonY, buttonW, buttonH, 10);
    fill(0);
    textSize(18);
    text("spróbuj jeszcze raz", width / 2, buttonY + 10);

    showRestart = true;
    return;
  }
  fill(textColor);
  textSize(24);
  text("Kliknij w kolor: " + currentColor, width / 2, 20);

  for (let c of circles) {
    fill(c.color);
    circle(c.x, c.y, 80);
  }

  timer--;
  if (timer <= 0) {
    if (!clicked) {
      // brak punktu
    }
    clicked = false;
    round++;
    if (round < 3) {
      pickNewColor();
      timer = 180;
    }
  }

 fill(0);
  textSize(18);
text("Czas: " + floor(timer / 60), width / 2, 60);
  textSize(18);
text("Wynik: " + score, width / 2, 80);
}

function mousePressed() {
  if (showRestart) {
    
    if (mouseX > buttonX && mouseX < buttonX + buttonW &&
        mouseY > buttonY && mouseY < buttonY + buttonH) {
      resetGame();
      failcount++;
    }
    return;
  }
  if (round >= 3 || clicked) return;

  for (let c of circles) {
    let d = dist(mouseX, mouseY, c.x, c.y);
    if (d < 40) {
      if (c.color === currentColor) {
        score++;
        clicked = true;
      } else {
        clicked = true;
      }
    }
  }
}

function pickNewColor() {
  
  let usedColors = circles.slice(0, round).map(c => c.color);
  let available = colors.filter(c => !usedColors.includes(c));
  currentColor = random(available); //kolor, który jeszcze nie był wybrany

  textColor = random(colors);
  while (textColor === currentColor) {
    textColor = random(colors);
  }
}








let stars;
let playBool = true;
let question = "Will you go on a date with me? 🙈💕";
let button1, button2;
let button2X, button2Y;
let button2Visible = true;
let isAnimating = false;
let isFadingIn = false; // New flag to track button fading status
// Array of emojis
let emojis = ['😞', '😢', '😔', '😭', '😣', '😩'];
let phrasesAsk = ['Are you 100% sure?', 'Are you convinced?', 'Are you confident about that?', 'Are you really sure?'];
let phrasesPermission = ['Please reconsider', 'Allow me the opportunity', 'I only ask for a chance', 'I ask for permission',];
let phrasesBad = ['I kindly ask you to stop.', 'Please desist from that action.', 'I respectfully request that you cease.', 'I implore you to refrain from that activity.'];

let usedIndexesAsk = [];
let usedIndexesPermission = [];
let usedIndexesBad = [];


let decision = 0;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  c = max(width, height);
  nRot = int(random(2, 15));
  stars = [];
  // nStars = int(random(c / 5, c));
  nStars = int((window.performance.memory.usedJSHeapSize / 1024 / 1024) * 25);
  for (let i = 0; i < nStars; i++) {
    stars[i] = {
      x: randomGaussian(0, c / 4),
      y: randomGaussian(0, c / 4),
      s: randomGaussian(0.2, 2),
      color: color(random(200, 255), random(100, 200), random(100, 200)),
      a: random(-c / 5, c / 5),
      b: random(-c / 5, c / 5),
      c: random(-2, 2),
      d: random(-5, 5)
    };
  }

  createButtons();
}

function createButtons() {
  // Create buttons
  button1 = createButton('Yes');

  button1.style('position', 'absolute');
  button1.style('top', '55%');
  button1.style('left', '40%');
  button1.style('transform', 'translate(-50%, -50%)');

  btn1Height = btn2Height = (10 * windowWidth / 100);
  btn1Width = btn2Width = (5 * windowHeight / 100);

  button1.size(btn1Height, btn1Width);
  button1.style('backgroundColor', 'green');
  button1.style('color', 'white');
  button1.style('border', 'none');
  button1.style('cursor', 'pointer');
  button1.style('borderRadius', '5px');
  button1.mousePressed(option1Pressed);

  button2 = createButton('No');

  button2.style('position', 'absolute');
  button2.style('top', '55%');
  button2.style('left', '60%');
  button2.style('transform', 'translate(-50%, -50%)');

  button2.size(btn2Height, btn2Width);
  button2.style('backgroundColor', 'red');
  button2.style('color', 'white');
  button2.style('border', 'none');
  button2.style('cursor', 'pointer');
  button2.style('borderRadius', '5px');
  button2.style('opacity', '1'); // Ensure the button is initially visible
  button2.mousePressed(option2Pressed);
  button2X = width / 2 + 50;
  button2Y = height / 2 + 50;
}

function draw() {
  background(5, 15, 20);

  translate(width / 2, height / 2);
  t = frameCount / 10;
  noStroke();
  for (let i = 0; i < stars.length; i++) {
    for (let j = 0; j < nRot; j++) {
      push();
      rotate((360 / nRot) * j);
      fill(stars[i].color);
      x =
        stars[i].x +
        stars[i].a * sin(stars[i].b * sin(t)) +
        stars[i].b * cos(stars[i].c - (t / 4) * sin((stars[i].c * t) / 10));
      y =
        stars[i].y +
        stars[i].b * cos(stars[i].b * sin(t)) +
        stars[i].a * sin(stars[i].d - (t / 4) * cos((stars[i].d * t) / 10));
      circle(x, y, stars[i].s);
      pop();
    }
  }

  border();

  // Display question
  textAlign(CENTER, CENTER);
  let textSizeVW = 4 * (windowWidth / 100); // Calculate the text size based on viewport width
  textSize(textSizeVW); // Set the calculated text size
  fill(255);

  let viewportTextSize = min(windowWidth, windowHeight) * 0.04; // Adjust multiplier as needed

  textSize(viewportTextSize); // Set the text size based on the viewport size
  text(question, 22, -50);

}

function border() {
  noFill();
  stroke(10, 20, 30);
  strokeWeight(4);
  rect(0, 0, width - 20, height - 20);
}

function option1Pressed() {
  window.location.href = '../confetti/index.html';
}

function option2Pressed() {
  console.log('decision: ' + decision);
  decision += 1;

  button2X = random(width * 0.9);
  button2Y = random(height * 0.9);

  // Move button2 to the new position
  button2.position(button2X, button2Y);

  // Hide button2 after moving it
  button2.hide();

  // Wait for a short delay before making button2 visible again
  setTimeout(() => {
    // Show button2 after the delay
    button2.show();
  }, 1000); // Adjust the delay time as needed (in milliseconds)

  let index;
  if (decision <= 2) {
    index = getRandomUnusedIndex(phrasesAsk.length, usedIndexesAsk);
    question = phrasesAsk[index];

    btn1Height = btn1Height * 1.1;
    btn1Width = btn1Width * 1.1;
    button1.size(btn1Height, btn1Width);

    btn2Height = btn2Height * 0.9;
    btn2Width = btn2Width * 0.9;
    button2.size(btn2Height, btn2Width);

  } else if (2 < decision && decision <= 4) {
    index = getRandomUnusedIndex(phrasesPermission.length, usedIndexesPermission);
    question = phrasesPermission[index];

    btn1Height = btn1Height * 1.1;
    btn1Width = btn1Width * 1.1;
    button1.size(btn1Height, btn1Width);

    if (decision >= 3) {
      result = '!'.repeat(decision - 3);
      button1.html('YES' + result);
    }

    btn2Height = btn2Height * 0.9;
    btn2Width = btn2Width * 0.9;
    button2.size(btn2Height, btn2Width);

  } else if (4 < decision && decision <= 6) {
    index = getRandomUnusedIndex(phrasesBad.length, usedIndexesBad);
    question = phrasesBad[index];

    btn1Height = btn1Height * 1.1;
    btn1Width = btn1Width * 1.1;
    button1.size(btn1Height, btn1Width);
    result = '!'.repeat(decision - 3);
    button1.html('YES' + result);

    btn2Height = btn2Height * 0.9;
    btn2Width = btn2Width * 0.9;
    button2.size(btn2Height, btn2Width);

  } else if (decision === 7) {
    // Handle invalid decision
    question = 'Alright, I guess you don\'t like me. I\'ll leave you alone 😔😭';
    button1.hide();
    button2.style('position', 'absolute');
    button2.position(width / 2, height / 2);
    button2.style('top', '55%');
    button2.style('left', '50%');
    button2.size((35 * windowWidth / 100), (8 * windowHeight / 100));
    button2.style('backgroundColor', 'rgb(80, 80, 255)');
    button2.style('font-size', '16px');
    button2.html('At least let me give you a flower...');
  }
  else if (decision === 8) {
    window.location.href = "../flower/index.html";
  }
}


function getRandomUnusedIndex(maxLength, usedIndexes) {
  let index;
  do {
    index = Math.floor(Math.random() * maxLength);
  } while (usedIndexes.includes(index));

  usedIndexes.push(index);
  return index;
}

function keyPressed() {
  if (keyCode === 32 && playBool) {
    playBool = false;
    noLoop();
  } else {
    playBool = true;
    loop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


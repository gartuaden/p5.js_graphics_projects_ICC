const max_sparkles = 40;
let longSparkles = [];
let shortSparkles = [];
let mini = [];
let vy = 0;
let scale = 0;

let isFired;

let light, cl, fire;


// pre-load the images for the background, lighting and fire
function preload(){
  light = loadImage('blue.png');
  cl = loadImage('newcloud.png');
  fire = loadImage('fire.png');
}

class Sparkle {
  
  constructor(x, y, l, s, c) {
    this.x = x; // X position of the starting point
    this.y = y; // Y position of the starting point
    this.l = l; // scale of the longer part
    this.s = s; // scale of the shorter part
    this.c = c; // color code
  }
  
  set() {
    let p = random(this.x - this.l, this.x + this.l);
    let q = random(this.y + this.l, this.y - this.l);
    
    // set the position and draw the root of the sparkles 
    stroke(this.c);
    strokeWeight(1);
    line(this.x, this.y, p, q);
    
    // draw lines and circles for the small sparkles
    line(p + random(10, 20), q + random(-10, 10), p + random(10, 20), q + random(-10, 10))
    ellipse(p+ random(-80,80), q + random(-80, 80), random(0, 6));
    
    // set the position and draw the branches of the sparkles 
    for (let i = 0; i < 7; i++) {
       mini[i] = new Sparkle(
          p,
          q
        );
    }
    for(let m of mini){
      let mp = random(p-20, p+20);
      let mq = random(q+20, q-20);
      stroke(color(255,211,176));
      strokeWeight(0.6);
      line(p, q, mp, mq);
    }
    
  }
}


function setup() {
  createCanvas(600, 800);
  frameRate(20);
  imageMode(CENTER);
  isFired = false;
}

function draw() {
  let isBurn = false;
  
  // load background image 
  image(cl,300, 400, 600, 800);
  
  // before putting on fire
  if(!isFired) {
    prompt3();
    image(fire, mouseX, mouseY, 50, 60);
  }
  
  // If cursor is close to the top of the stick, it is lighted.
  if(mouseIsPressed){
    if(mouseButton == 'left' && !isFired){
      if(dist(mouseX, mouseY, 300, 300) < 30) isFired = true;
    }
  }

  
  // after putting on fire
  if(isFired){
    prompt1();
    image(light, 310, 370+vy, 900+scale*3, 1200+scale*3);
  }
  
    
  // if the mouse is pressed, the sparkles will go downward.
  if(mouseIsPressed){
    if(mouseButton == 'left' && isFired){
      if(300+vy < 800) vy += 2;
      if(200+scale > 0) scale -= 0.5;
    }
  }
  
  // if the stick is all burned, get rid of the sparkles by loading background image 
  if(300+vy >= 800) {
    isBurn = true;
    image(cl,300, 400, 600, 800);
    prompt2();
  }
  
  // if 'b' is pressed, go back to the first moment
  if(key == 'b'){
    vy = 0;
    scale = 0;
    isBurn = false;
    isFired = false;
    key = 0;
  }
  
  // draw the stick part
  strokeWeight(3);
  stroke(132, 58 ,4);
  line(300, 300, 300, 800);

  strokeWeight(3);
  stroke(255);
  line(300, 300+vy, 300, 800);
  
  
  // if it is not all burned && it is lighted, it will draw the sparkles.
  if(isBurn == false && isFired) render();
  
}

function render(){
  
  for (let i = 0; i < max_sparkles; i++) {
    // long sparkles for bigger scale
    longSparkles[i] = new Sparkle(
      300,
      300+vy,
      200+scale,
      200+scale,
      color(255, 255, 162)
    );
    // short sparkles for smaller scale 
    shortSparkles[i] = new Sparkle(
      300,
      300+vy,
      130+scale,
      130+scale,
      255
    );
  }
  for (let spk of longSparkles) {
    spk.set();
  }
  for (let spk of shortSparkles) {
    spk.set();
  }
  
}

// promt functions
function prompt1(){
  
  fill(255);
  noStroke();
  textSize(15);
  textStyle(BOLDITALIC);
  textFont('Helvetica');
  textAlign(CENTER, CENTER);
  text('Left-click your mouse to make it burn!', 300, 50);
  
}

function prompt2(){
  fill(255);
  noStroke();
  textSize(15);
  textStyle(BOLDITALIC);
  textFont('Helvetica');
  textAlign(CENTER, CENTER);
  text('Sparkles are all gone!\nPress B to go back.', 300, 50);
  
}

function prompt3(){
  
  fill(255);
  noStroke();
  textSize(15);
  textStyle(BOLDITALIC);
  textFont('Helvetica');
  textAlign(CENTER, CENTER);
  text('Put the fire on the top of the stick by left-click.', 300, 50);
}
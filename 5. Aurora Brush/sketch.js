
var freeze = false; 
var c;

var x = [];
var y = [];
var inc = 0.0;

var bg;
var cFlag = 1;
var dFlag = true;

function preload(){
  // preload background images
   bg = loadImage('background.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  image(bg, 0,0, windowWidth, windowHeight);
  strokeWeight(0.2);
  c = color(255); 
  stroke(c);
  noFill();
  
  // initialize x and y arrays
  for (var i = 0; i < width; i ++) {
    x[i] = i;
    y[i] = inc;
  }
  
  frameRate(20);
  prompt();
}

function draw() {
  var i;
  noFill();
  stroke(c);
  
  // draw the shape
  if(!dFlag){
    push();
    translate(x[0], inc);
    beginShape();
    for (i = mouseX; i < mouseX + 100; i++) {
      curveVertex(x[i], y[i]);
    }
    endShape(); 
    pop();
  }
  
  // assign the position of the vertex
  for(i = 0; i < mouseX; i++) {
    x[i] = i;
    y[i] = inc;
  }
  
  for(i = mouseX; i < mouseX + 200; i++){
    x[i] = i;
    y[i] = inc - sin(i-PI)*random(1, 15) * cos(i-PI)*random(1, 15);
  }
  
  
  // increase the Y position of the aurora
  inc = inc + 1;
  
  
  // change the color mode (random or white mode)
  switch(cFlag){
    case 1:
      // green, blue colors
      c = color(random(50, 100),random(50, 255), random(100,200));
      break;
    case 2:
      // purple, pink colors
      c = color(random(150, 255),random(0, 51), random(100,255));
      break;
    case 3:
      // white color
      c = color(255);
      break;
  }
   
}


function keyReleased() {
  // erase all the output and start at inc = 0
  if (keyCode == DELETE || keyCode == BACKSPACE){
    background(255);
    image(bg, 0,0, windowWidth, windowWidth);
    prompt();
    inc = 0;
    dFlag = true;
  }
  
  // freeze the screen, stop the loop
  if (key == 'f' || key == 'F') freeze = !freeze;
  if (freeze) {
   noLoop();
  }
  else {
    loop();
  }
  
  // change the cFlag to change the color mode
  if (key == '1'){
    cFlag = 1;
  }
  if(key == '2'){
    cFlag = 2;
  }
  if(key == '3'){
    cFlag = 3;
  }
}

function mousePressed(){
  // change the drawing mode
  dFlag = !dFlag; 
}


function prompt(){
  fill(255);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textFont('Georgia');
  text('Aurora Brush', 50, 50);
  
  textSize(8);
  textStyle(NORMAL);
  text('Key 1: Color Mode Blue & Green\nKey2: Color Mode Pink & Purple\nKey3: Color Mode White\nKey F: Stop the loop / Start the loop\nLeft Mouse: Change the Drawing Mode\nBackspace: Erase All', 50, 70);
}



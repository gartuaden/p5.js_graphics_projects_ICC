var msg = "your focus determines your reality";
var font;

var r, g, b;
var c;

var flag = false;
var tmp;

var size = 30;
var d = 27;

function preload(){
  font = loadFont("Afterglow-Regular.ttf");
}

function setup() {
  textFont(font);
  fill(255);
  createCanvas(windowWidth, windowHeight);
  c = 0;
}

function draw(){
  r = 255 * noise(c+7);
  g = 255 * noise(c+14);
  b = 255 * noise(c+21);

  initWindow(r, g, b);
  
  stroke(r, g, b);
  translate(width/2,height/2);
  translate(-(msg.length - 1)*d/2, 0);
  
  textFont(font);
  textAlign(CENTER);
  stroke(r,g,b);
  
  if(!flag){
    tmp = frameCount;
    for(let i = 0; i < msg.length; i++){
      textSize(size);
      strokeWeight(0.3);
      noFill();
      push();
      translate(i*d,0);
      text(msg[i], cos(tmp*0.1 + i*5) * 10,sin(tmp*0.1 + i*5) * 10);
      pop();
    
      for(let k = 0; k < 5; k++){
        textSize(size-k*3-5);
        strokeWeight(1);
        fill(r, g, b);
        push();
        translate(i*d,k*100-200);
        rotate(k);
        text(msg[i], cos(tmp*0.03 + i*5) * 100,sin(tmp*0.03 + i*5) * 100);
        pop();
      }
    }
  
    c += 0.01;
  }
  else{
    background(r, g, b);
    for(let i = 0; i < msg.length; i++){
      textSize(size);
      strokeWeight(1);
      stroke(255);
      fill(255);
      push();
      translate(i*d,0);
      text(msg[i], cos(tmp*0.1 + i*5) * 10,sin(tmp*0.1 + i*5) * 10);
      pop();
    }
    frameCount = tmp;
  }
  
}


function mousePressed(){
  flag = !flag;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function initWindow(r, g, b){
  push();
  fill(255);
  background(255);
  stroke(r, g, b);
  strokeWeight(25);
  rect(0, 0, width, height);
  pop();
}

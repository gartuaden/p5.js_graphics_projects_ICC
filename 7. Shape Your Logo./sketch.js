var input, button, sel, textColor;
var input2, button2, button3;
var shapeSize = 100;

function setup() {
  initWindow();
}
function draw(){
  let item = sel.value();
  if(item == 'rectangle'){
    fill(setColor.color());
    if(mouseIsPressed){
      noStroke();
      rect(mouseX, mouseY, shapeSize, shapeSize);
    }
  }
  if(item == 'circle'){
    fill(setColor.color());
    if(mouseIsPressed){
      noStroke();
      ellipse(mouseX, mouseY, shapeSize, shapeSize);
    }
  }
  if(item == 'line'){
    stroke(setColor.color());
    if(mouseIsPressed){
      stroke(setColor.color());
      line(mouseX, mouseY, mouseX+(int)(shapeSize), mouseY+(int)(shapeSize));
    }
  }
  
  button3.mousePressed(greet3);
  
}


function greet() { // writh the text at the center
  var name = input.value();
  input.value('');
  fill(textColor.color());
  noStroke();
  textSize(100);
  textStyle(NORMAL);
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  text(name, 650, 350);
}

function greet2(){ // assign size of the shape
  shapeSize = input2.value();
  input2.value('');
}

function greet3(){ // clear and initialize the window
  clear();
  initWindow();
}

function initWindow(){
  // drawing side
  textAlign(CENTER);  
  textAlign(CENTER, CENTER);
  createCanvas(1000, 700);
  background(0);
  rect(300, -10, 1100, 800);
  stroke(0);
  fill(255);
  square(325, 25, 650, 10);
  line(325, 50, 975, 50);
  fill(0);
  ellipse(350, 38, 10);
  ellipse(370, 38, 10);
  ellipse(390, 38, 10);

  // left side
  
  noStroke();
  fill(255);
  textSize(70);
  textStyle(BOLD);
  textFont('Georgia');
  text('shape', 140, 100);
  textStyle(BOLDITALIC);
  text('your', 170, 150);
  textStyle(BOLD);
  text('logo.', 140, 200);
  
  textSize(15);
  textStyle(NORMAL);
  text('text', 42, 300);
  stroke(255);
  line(30, 310, 270, 310);
  
      textColor = createColorPicker(color(0));
  textColor.position(30, 320);
  
  input = createInput();
  input.position(81, 323);
  input.changed(greet);
  button = createButton('GO');
  button.position(input.x + input.width, 323);
  button.mousePressed(greet);
  
  
  textSize(15);
  noStroke();
  textStyle(NORMAL);
  text('shape', 50, 400);
  stroke(255);
  line(30, 410, 270, 410);
  
  
  setColor = createColorPicker(color(255,107,166));
  setColor.position(30, 420);
  
  sel = createSelect();
  sel.position(100, 425);
  sel.option('none');
  sel.option('rectangle');
  sel.option('circle');
  sel.option('line');
  
  textSize(12);
  noStroke();
  textStyle(NORMAL);
  text('size:', 50, 483);
  
  input2 = createInput();
  input2.position(81, 473);
  input2.changed(greet2);
  button2 = createButton('GO');
  button2.position(input2.x + input2.width, 473);
  button2.mousePressed(greet2);
  
  button3 = createButton('ERASE ALL');
  button3.position(100, 600);

  
}
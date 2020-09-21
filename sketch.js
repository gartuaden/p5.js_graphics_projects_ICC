
let setColor;

function setup(){
  
  initWindow();
  
}

// for each frame
function draw() {

  let r= random(100,255);
  let g = random(100,255);
  let b = random(100, 255);
  
   cursor('grab');
  if(keyIsPressed){
   if(key == 'd' || key == 'D'){
     let deco_size = 15;
     deco_size = map(deco_size, 5, 15, 1, 10);
     if(mouseIsPressed){
       // fill a circle with random color
      fill(r,g,b);
      stroke(0,0,0);
      strokeWeight(1);
      // draw a circle at the mouseX and mouseY position
      ellipse(mouseX,mouseY, deco_size, deco_size);
     }
   }
   else if(key == 'i' || key == 'I'){
     if(mouseIsPressed){
       // create and draw the ice cream shape
      create_icecream(mouseX, mouseY, setColor.color());
     }
   }
   else if(key == 'c' || key == 'C') {
     if(mouseIsPressed){
       // fill a line with brown color
      fill(84,37,0);
      noStroke();
      // draw a brown line for chocolate part
      circle(mouseX,mouseY, 50);
     }
   }
   else if(key == 'e' || key == 'E'){
    if(mouseIsPressed){
      // create and draw the cherry part
      create_cherry(mouseX, mouseY);
    }
   }
    else if(key == 'q' || key == 'Q'){
      clear();
      initWindow();
    }
  }

}
function initWindow(){
 createCanvas(600,1200);
 // clear background with white color

  background(255);
  stroke(255,107,166);
  strokeWeight(15);

  rect(0, 0, 600, 1200);
  
  fill(255,196,0);
  noStroke();
  triangle(200,800, 300, 1100, 400, 800);

  fill(255,107,166);
  noStroke();
  textSize(30);
  textStyle(BOLDITALIC);
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  text('Create Your Own Icecream!', 300, 100);

  setColor = createColorPicker(color(255,107,166));
  setColor.position(270, 150);

  
  fill(255, 158, 197);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  text('⬇️ Choose a color of your icecream. ⬇️', 300, 130);

  fill(255, 158, 197);
    noStroke();
  textSize(10);
  textStyle(NORMAL);
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  text('* Press I & left-click your mouse to place your icecream.\n* Press C & left-click your mouse to draw chocolate part.\n* Press D & left-click your mouse to decorate with sprinkles.\n* Press E & left-click your mouse to put a cherry on the top.\n*Press Q to clear the window.', 300, 215);
  
  fill(255,107,166);
  noStroke();
  textSize(15);
  textStyle(BOLD);
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  text('🍦\nICECREAM MAKER', 302, 1150);
  
  frameRate(50);
}

// make cherry shaped group
function create_cherry(mouseX,mouseY){
 

  ellipseMode(CORNER);
  fill(color(255,0,70));
  circle(mouseX, mouseY, 50);

  ellipseMode(CORNER);
  fill(color(245,169,169));
  ellipse(mouseX+20, mouseY+7, 20, 10);

  
  ellipseMode(CORNER);
  fill(color(0));
  rect(mouseX+30, mouseY-20, 1, 30);

}

// make ice cream shaped group
function create_icecream(mouseX, mouseY,inputColor){
  
  ellipseMode(CORNER);
  fill(inputColor);
  noStroke();
  circle(mouseX-80, mouseY-80, 190);

  ellipseMode(CORNER);
  fill(inputColor);
  noStroke();
  circle(mouseX-122, mouseY+20, 100);

  ellipseMode(CORNER);
  fill(inputColor);
  noStroke();
  circle(mouseX+50, mouseY+20, 100);

  ellipseMode(CORNER);
  fill(inputColor);
  noStroke();
  circle(mouseX-60, mouseY+10, 150);

}
let h;
let cRange, sizeBigCircle, sizeSmallCircle;

function setup() {
  // create canvas of window size
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  // show the screen with black background
  background(0);
  randomSeed(0);
  drawCircles(0);
  if(mouseIsPressed){
    // show the screen with white background
    background(255);
    drawCircles(255);
  }

}

function drawCircles(c){
    
  // set the color range by mouseY
  cRange = map(mouseY, 0, windowHeight, 0, 360, true);
  
  // set the size range by mouseX
  sizeBigCircle = map(mouseX, 0, windowWidth, -60, 60,true);
  sizeSmallCircle = map(mouseX, 0, windowWidth, -6, 6, true);
  
  
  for(let y = 0; y < windowHeight; y += 60){
    for(let x = 0; x < windowWidth; x += 60){
      
      // change the color of circles by the position of mouseY
      h = random(0, 360);
      fill((h+cRange)%360, 90, 90);
      
      // if the mouse goes left
      if(mouseX < windowWidth / 2) {
        noStroke();
        // draw circles with different sizes
        ellipse(x, y, sizeBigCircle + random(0,30), 60);
                
        fill(c);
        noStroke();
        ellipse(x, y-18, sizeSmallCircle, 6);
      }
      // if the mouse goes right
      else if(mouseX > windowWidth/2) {
        noStroke();
        // draw circles with different sizes
        ellipse(x, y, sizeBigCircle - random(0,30), 60);
              
        fill(c);
        noStroke();
        ellipse(x, y-18, sizeSmallCircle, 6);
      }
      
    }
    
  }
  
  
}

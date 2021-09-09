
const fireworks = [];
let gravity;
var x,y,w,h;
let mood1, mood2, star;
let turningFlag = -1;
var s1, s2;

function preload(){
  // preload background images
  mood1 = loadImage('mood1.png');
  mood2 = loadImage('mood2.png');
  s1 = loadSound('assets/AnaCaptainslogue - Noir Et Blanc Vie.mp3');
  s2 = loadSound('assets/Bravado - Rondo Brothers.mp3');
}

// classes for making fireworks
class Particle {
  constructor(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0);
    if (this.firework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 10));
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    colorMode(HSB);

    if (!this.firework) {
      strokeWeight(2);
      stroke(255);
    } else {
      strokeWeight(4);
      stroke(255);
    }

    point(this.pos.x, this.pos.y);
  }
}

class Firework {
  constructor() {
    this.hu = random(255);
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
    
  //sound input
  mic = new p5.AudioIn()
  mic.start();
	
  //measures amplitude via mic
  amplitude = new p5.Amplitude(0.5);
  amplitude.setInput(mic);
	
  //auto-levels volume
  amplitude.toggleNormalize(1);
	
  //generates a spectrum for sound to appear on
  fft = new p5.FFT();
  //tells spectrum to use mic
  mic.connect(fft);
	
  //higher frequencies than this are sort of useless
  number = 200;
  
  gravity = createVector(0, 0.2);
  

  s1.play();
  s1.loop();
  s1.setVolume(0.01);
  
}


function draw() {
  var frame = 200;
  
  frameRate(frame);
  if(turningFlag == -1){
    // "Calm Mood" - change screen
    image(mood1, 0,0, windowWidth, windowHeight);
  }
  else{
    // "Excited Mood" - change screen and show fireworks
    image(mood2, 0, 0, windowWidth, windowHeight);
    if (random(1) < 0.03) fireworks.push(new Firework());
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      if (fireworks[i].done()) fireworks.splice(i, 1);
    }
  }
  
  spectrum = fft.analyze()
  noFill();

  // audio status
  for (let i = 0; i < number; i++) {
	x = map(i, 0, number, 0.25, 0.75)*width;
	y = height/2;
	w = (width*0.5)/number;
	h = -spectrum[i];
    noFill();
    stroke(255);
    strokeWeight(1);
	rect(x, y, w, h);
    if(spectrum[i] > 230){
      //if the voice goes high, it goes to "Excited Mood"
      if(turningFlag == -1){
        turningFlag = 1;
        s1.stop();
        s2.setVolume(0.1);
        s2.play();
        s2.loop();
      }
      turningFlag=1;
    }
  }
  
  // if you press q, it goes back to "Calm Mood"
  if(key == 'q') {
    turningFlag = -1;
    s2.stop();
    s1.setVolume(0.01);
    s1.play();
    s1.loop();
  }
  key = 0;
}



let oscACount, oscBCount;
let total_oscA = [], total_oscB = [];
let heartbeat, speed, volume;
let beans_0 = [], beans_1 = [], beans_blue_2 = [], beans_green_2, beans_3 = [], beans_4; 
let sample, font, bg = [], wo = [], sw, dr, tn, ct, pp, note = [], pl, pc = [], pic = [], cam, alarm, br, cr, bg_light;
let fadeFlag, opacity, opCount;
let light, lightFlag;
let tnFlag, tnOpacity, tnCount;
let frameWidth, frameHeight;
let doorCount;
let curtainFlag, paperFlag, pillsCount, promptFlag_c, promptFlag_p, camFlag, camPrev, alarmFlag, alarmCount, curtainCount, crackCount, promptFlag_cr;
let darkscreen_count;

let alarm_op;
let i;
let PHASE;
let prev;

let endingSong, endingFlag;
let endingSong_happy, prev_endingH, op_endingH;
let oscBflag = false;
let camOnFlag_1 = false, camOnFlag_2 = false;
let start, rescue, tr, kn;

function preload(){
  heartbeat = loadSound('heartbeat_2.wav');
  start= loadImage('start.png');
  rescue = loadImage('rescue.png');
  tr = loadImage('tr.png');
  beans_0[0] = loadImage('beans_0_1.png');
  beans_0[1] = loadImage('beans_0_2.png');
  
  beans_1[0] = loadImage('beans_1_1.png');
  beans_1[1] = loadImage('beans_1_2.png');

  
  beans_blue_2[0] = loadImage('beans_blue_2_1.png');
  beans_blue_2[1] = loadImage('beans_blue_2_2.png');
  beans_green_2 = loadImage('beans_green_2_1.png');
  
  beans_3[0] = loadImage('beans_3_1.png');
  beans_3[1] = loadImage('beans_3_3.png');
  
  beans_4 = loadImage('beans_bad.png');
  
  sample = loadImage('re.jpeg');
  font = loadFont('CFOneTwoTrees-Regular.ttf');
  bg[0] = loadImage('bgt_0.png');
  bg[1] = loadImage('bgt_1.png');
  bg_light = loadImage('bgt_1_light.png');
  bg[2] = loadImage('bgt_2.png');
  bg[3] = loadImage('bgt_3.png');
  wo[0] = loadImage('bgt_wo.png');
  wo[1] = loadImage('bgt_wo_2.png');
  note[0] = loadImage('paper_0.png');
  note[1] = loadImage('paper_1.png');
  note[2] = loadImage('paper_2.png');
  
  pic[0] = loadImage('pic_0.png');
  sw = loadSound('switch-1.mp3');
  dr = loadSound('door_knob.mp3');
  tn = loadSound('207744__soundsexciting__high-pitched-tone-quiet-to-loud.wav')
  ct = loadSound('curtain.wav');
  pp = loadSound('paper.wav');
  pl = loadSound('pills.wav');
  pc[0] = loadSound('phonecall_1.wav');
  pc[1] = loadSound('Scary Laugh_01.wav');
  cam = loadSound('cam.wav');
  alarm = loadSound('alarm.wav');
  br = loadSound('brain_3.wav');
  cr = loadSound('Rock Impact 01.wav');
  endingSong = loadSound('No.2_Remembering_Her_-_Esther_Abrami.mp3');
  endingSong_happy = loadSound('No.7_Alone_With_My_Thoughts_-_Esther_Abrami.mp3');
  kn = loadSound('Knife Stab 01.wav');
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  frameWidth = 900;
  frameHeight = 500;
  
  oscACount = 50;
  oscBCount = 1; // BGM A
  
  // background color
  opacity = 0;
  opCount = 0;
  light = 0;
  lightFlag = false;
  
  // Sound Variables

  speed = 1;
  volume = 0.3;
  speed = constrain(speed, 0.01, 4);
  volume = constrain(volume, 0, 1);
  
  PHASE = -1;

  fadeFlag = false;
  
  tnFlag = false;
  tnOpacity = 0;
  tnCount = 0;
  doorCount = 0;
  
  curtainFlag = false; paperFlag = false;
  curtainCount = 0;
  camFlag = false;
  pillsCount = 0; alarm_op = 0; alarmFlag = false; alarmCount = 0; crackCount = 0;
  promptFlag_c = false; promptFlag_p = false; promptFlag_cr = false;
  i = 0;
  op_endingH = 0;
  endingFlag = false;
  darkscreen_count = 0;
  
}

function draw() {
  
  cursor();
  background(0);
  heartbeat.rate(speed);
  heartbeat.amp(volume);
  switch(PHASE){
    case -1:
      image(start, width/2, height/2);
      if(mouseIsPressed){
        fadeFlag = true;
        mouseIsPressed = false;
        heartbeat.play();
        heartbeat.loop();
        pushOscA();
      }
      break;
    case 0:
      oscB(0);
      image(bg[0], width/2, height/2);
      curtainEvent(0);
      movingBean(beans_0);
      pillsEvent(0);
      switchEvent(0);
      paperEvent(note[0], 0);
      doorEvent();
      lightEvent(0, 0, 0);
      break;
    case 1:
      if(camOnFlag_1 && camOnFlag_2){
        image(bg_light, width/2, height/2);
      }
      else image(bg[1], width/2, height/2);
      movingBean(beans_1);
      callEvent(1);
      pillsEvent(1);
      switchEvent(1);
      paperEvent(note[1], 1);
      doorEvent();
      cameraEvent(1);
      lightEvent(255, 0, 0);
      break;
    case 2:
      image(bg[2], width/2, height/2);
      curtainEvent(2);
      movingBean(beans_blue_2);
      image(beans_green_2, width/2 - 700, height/2-60);
      callEvent(2);
      switchEvent(2);
      crackEvent(2);
      pillsEvent(2);
      paperEvent(note[2], 2);
      lightEvent(0, 0, 255);
      break;
    case 3:
      oscB_ps(0);
      image(bg[3], width/2, height/2);
      curtainEvent(3);
      movingBean(beans_3);
      callEvent(3);
      switchEvent(3);
      crackEvent(3);
      cameraEvent(3);
      speakerEvent();
      pillsEvent(3);
      greenbeanEvent();
      bluebeanEvent();
      break;
    case 4: // Happy Ending
      oscA_ps(0);
      image(bg[0], width/2, height/2);
      movingBean(beans_0);
      switchEvent(0);
      endingHappy();
      break;
    case 5:
      heartbeat.stop();
      endingPrompt();
      if(endingFlag) image(beans_4, width/2, height/2);
      break;
  }

  transition(); 
}
function initObjects(){
  paperFlag = false;
  crackCount = 0;
  alarmCount = 0;
  alarmOp = 0;
  camFlag = false;
  promptFlag_cr = false;
  oscBflag = false;
  camOnFlag_1 = false;
  camOnflag_2 = false;
}

function endingPrompt(){
  fill(0);
  textFont(font);
  rect(0, 0, width, height);
  fill(255);
  textSize(80);
  text("GAME OVER", width/2, height/2);
}

function endingHappy(){
  if(frameCount - prev_endingH > 290){
    heartbeat.stop();
    if(op_endingH <= 270) op_endingH++;
    fill(0, 0, 0, op_endingH);
    rect(0, 0, width, height);
    fill(255, 255, 255, op_endingH);
    textSize(50);
    text("You rescued your beans.", width/2, height/2);
    
  }
  if(op_endingH >= 270) PHASE = 5;
}

function endingSad(){
  kn.play();
    endingSong.play();
    endingSong.loop();
    endingFlag = true;
    PHASE = 5;
   oscA_ps(0);
  oscB_ps(0);
}

function movingBean(bean){
  image(bean[i], width/2, height/2);
  if(frameCount % 30 == 0){
    if(i == 0) i++;
    else i--;
  }
}

// Object Event Functions
function greenbeanEvent(){
  let gb_x = width/2 + 130;
  let gb_y = height/2 + 100;
  let size = 60;
   let d = dist(mouseX, mouseY, gb_x, gb_y);
  if(d < size){
    if(mouseIsPressed){
      endingSad();
      mouseIsPressed = false;
    }
  }
}

function bluebeanEvent(){
  let bb_x = width/2 - 120;
  let bb_y = height/2 + 100;
  let size = 60;
   let d = dist(mouseX, mouseY, bb_x, bb_y);
  if(d < size){
    if(mouseIsPressed){
      speed = 1;
      volume = 0.3;
      fadeFlag = true;
      prev_endingH = frameCount;
      mouseIsPressed = false;
    }
  }
}

function speakerEvent(){
  let sp_x = width/2 + 200;
  let sp_y = height/2 - 180;
  let size = 60;
   let d = dist(mouseX, mouseY, sp_x, sp_y);
  if(d < size){
    if(mouseIsPressed){
      endingSad();
      mouseIsPressed = false;
    }
  }
  
}
// transition trigger
function crackEvent(phase){
  let crack_x = width/2 - 180;
  let crack_y = height/2 + 80;
  let size = 40;
  let d = dist(mouseX, mouseY, crack_x, crack_y);
  if(d < size){
    cursor('grab');
    if(mouseIsPressed){
      if(phase == 3){
        endingSad();
        mouseIsPressed = false;
      }
      else{
        cr.play();
        crackCount++;
        promptFlag_cr = true;
        prev = frameCount;
        mouseIsPressed = false;
      }
    }
  }
  if(crackCount == 3){
    fadeFlag = true;
    oscBFlag = false;
    speed += 0.01; // increase the heartbeat
    volume += 0.01; // raise the volume of it
    oscB_ps(0);
    cr.stop();
    heartbeat.stop();
    oscA_ps(0);
  }
  if(promptFlag_cr){
    stroke(0);
    strokeWeight(3)
    fill(255);
    textSize(25);
    textStyle(ITALIC);
    text("Face the wound?", width/2, height/2 + 200)
    noStroke();
  }
  if(frameCount - prev > 70) promptFlag_cr = false;
}

// transition trigger
function cameraEvent(phase){
  let cam_x = width/2 - 200;
  let cam_y = height/2 - 60;
  let size = 40;
  let d = dist(mouseX, mouseY, cam_x, cam_y);
  let flag = false;
  
  if(phase == 3){
    if(d<size){
      cursor('grab');
      if(mouseIsPressed){
        endingSad();
        mouseIsPressed = false;
      }
    }
  }
  else{
    if(camOnFlag_1 && camOnFlag_2){
      if(d < size){
        cursor('grab');
        if(mouseIsPressed){
            camFlag = true;
            camPrev = frameCount;
            cam.play();
            mouseIsPressed = false;
        }
      }
    }
    
  if(camFlag) image(pic[0], width/2, height/2);

  
  if(frameCount - camPrev == 200){
    alarm.play();
    alarm.loop();
  }
  if(frameCount - camPrev > 200) flag = true;

  if(frameCount % 37 == 0 && flag) {
    alarmFlag = !alarmFlag;
    alarmCount++;
  }
  
  if(alarmFlag) alarm_op =200;
  else alarm_op =0;
  
  // transition trigger
  if(alarmCount == 10){
    fadeFlag = true;
     speed += 0.005; // increase the heartbeat
    volume += 0.005; // raise the volume of it
      alarm.stop();
      oscB_ps(0);
      heartbeat.stop();
      oscA_ps(0);
  }
  
    push();
    translate(width/2 - frameWidth/2, height/2 - frameHeight/2);
    fill(0,0,255, alarm_op);
    rect(0, 0, frameWidth, frameHeight);
    pop();
  }
}
  

function callEvent(phase){
  let call_x = width/2- 27;
  let call_y = height/2 - 70;
  let size = 40;
  let d = dist(mouseX, mouseY, call_x, call_y);
  if(phase == 1){
    if(d < size){
      cursor('grab');
      if(mouseIsPressed){
        camOnFlag_2 = true;
        pc[0].play();
        promptFlag_c = true;
        prev = frameCount;
        mouseIsPressed = false;
      }
    }
    if(promptFlag_c){
      stroke(0);
      strokeWeight(3)
      fill(255);
      textSize(25);
      textStyle(ITALIC);
      text("Need help? But there's no one", width/2, height/2 + 200)
      noStroke();
    }
     if(frameCount - prev > 70) promptFlag_c = false;
  }
  if(phase == 2){
      if(d < size){
        cursor('grab');
        if(mouseIsPressed){
          pc[1].play();
          promptFlag_c = true;
          prev = frameCount;
          mouseIsPressed = false;
        }
      }
  }
  if(phase == 3){
    if(d < size){
        cursor('grab');
        if(mouseIsPressed){
         endingSad();
          mouseIsPressed = false;
        }
      }
  }
}

// game over trigger
function pillsEvent(phase){
  let pills_x = width/2 + 60;
  let pills_y = height/2 - 65;
  let size = 40;
  let d = dist(mouseX, mouseY, pills_x, pills_y);
  
  if(d < size){
    cursor('grab');
    if(mouseIsPressed){
      if(phase == 3){
       endingSad();
        mouseIsPressed = false;
      }
      else{
        pl.play();
        promptFlag_p = true;
        mouseIsPressed = false;
        prev = frameCount;
        pillsCount++;
      }
    }
  }
  if(promptFlag_p){
    stroke(0);
    strokeWeight(3)
    fill(255);
    textSize(25);
    textStyle(ITALIC);
    text("You ate pills", width/2, height/2 + 200)
    textSize(20);
    fill(0, 0, 255);
    text("(It's not a good idea)", width/2, height/2 + 230)
    noStroke();
  }
  if(frameCount - prev > 70) promptFlag_p = false;
  if(pillsCount >= 5) {
    pl.stop();
    endingSong.play();
    endingSong.loop();
    oscA_ps(0);
    oscB_ps(0);
    PHASE = 5;
  }
}

function paperEvent(note, phase){
  let paper_x = width/2 + 12;
  let paper_y = height/2 - 170;
  let size = 30;
  let d = dist(mouseX, mouseY, paper_x, paper_y);
  if(d < size){
    cursor('grab');
    if(mouseIsPressed){
      if(phase == 1) camOnFlag_1 = true;
      paperFlag = true;
      pp.amp(1.50);
      pp.play();
      mouseIsPressed = false;
    }
  }
  if(paperFlag) image(note, width/2, height/2);
  if(mouseIsPressed) paperFlag = false;
}

function curtainEvent(phase){
  let curtain_x = width/2 + 380;
  let curtain_y = height/2 - 40;
  let size = 150;
  let d = dist(mouseX, mouseY, curtain_x, curtain_y);
  if(phase == 0){
    if(d < size){
      cursor('grab');
      if(mouseIsPressed){
        curtainFlag = true;
        ct.play();
        mouseIsPressed = false;
        prev = frameCount;
      }
    }
    if(curtainFlag) image(wo[0], width/2, height/2);
    if(frameCount - prev > 50) curtainFlag = false; 
  }
  if(phase == 2){ // game over trigger
    if(d < size){
      cursor('grab');
      if(mouseIsPressed){
        curtainFlag = true;
        br.play();
        mouseIsPressed = false;
        prev = frameCount;
        curtainCount++;
      }
    }
    if(curtainFlag) image(wo[1], width/2, height/2);
    if(frameCount - prev > 80) curtainFlag = false;
    if(curtainCount >= 4){
      br.stop();
      oscA_ps(0);
      oscB_ps(0);
      oscBflag = false;
      endingSong.play();
      endingSong.loop();
      PHASE = 5;
    }
  }
  if(phase == 3){
     if(d < size){
      cursor('grab');
      if(mouseIsPressed){
        endingSad();
        mouseIsPressed = false;
      }
    }
  }
}

function switchEvent(phase){
  let switch_x = width/2 - 319;
  let switch_y = height/2 - 93;
  let size = 10;
  let d = dist(mouseX, mouseY, switch_x, switch_y);


  fill(0);
  ellipse(switch_x, switch_y, size);


  if(d < size){
    cursor('grab');
    if(phase == 3){
      if(mouseIsPressed){
         endingSad();
        mouseIsPressed = false;
      }
    }
    else{
      if(mouseIsPressed) {
        sw.play();
        lightFlag = !lightFlag;
        mouseIsPressed = false;
      }
    }
  }

  
}

function lightEvent(light_r, light_g, light_b){
    
  if(lightFlag) light = 200;
  else light = 0;
  push();
  translate(width/2 - frameWidth/2, height/2 - frameHeight/2);
  fill(light_r,light_g,light_b, light);
  rect(0, 0, frameWidth, frameHeight);
  pop();
}

function doorEvent(){
  let handle_x = width/2 - 376
  let handle_y = height/2 - 35;
  let size = 25;
  let d = dist(mouseX, mouseY, handle_x, handle_y);
  
  stroke(0);
  strokeWeight(3);
  fill(102);
  ellipse(handle_x, handle_y, size);
  if(d < size){
    cursor('grab');
    if(mouseIsPressed) {
      dr.amp(0.1);
      dr.play();
      mouseIsPressed = false;
      doorCount++;
    }
  }
  
  if(doorCount == 3){
    tn.rate(2.5);
    tn.amp(1);
    tn.play();
    tnFlag = true;
    doorCount = 0;
  }
  
   if(tnFlag){ // fade-in and fade-out, phase by phase
    if(tnOpacity >= 0 && tnOpacity <= 255 && tnCount == 0) tnOpacity += 1;
    if(tnOpacity > 255) {
      tnCount = 1;
    }
    if(tnCount == 1 && tnOpacity > 0) tnOpacity -= 15;
    else if(tnCount == 1 && tnOpacity <= 0){
      tnFlag = false;
      tnCount = 0;
    }
  }
  
  prompt();

}

function prompt(){
  

      textAlign(CENTER);
  textFont('Helvetica');
  noStroke();
  fill(0, 0, 0, tnOpacity);
  textSize(70);
  text("WHERE ARE YOU GOING ?", width/2, height/2);
  fill(255, 255, 255, tnOpacity);
  rect(0, 0, width, height);
}

function oscA_ps(flag){
  if(flag){
    for(let i = 0; i < total_oscA.length; i++) total_oscA[i].start();
  }
  else{
        for(let i = 0; i < total_oscA.length; i++) total_oscA[i].stop();
  }
}
function oscB_ps(flag){
  if(flag){
      for(let i = 0; i < total_oscB.length; i++) total_oscB[i].start();
  }
  else{
  for(let i = 0; i < total_oscB.length; i++) total_oscB[i].stop();
  
  total_oscB.pop();
  oscBCount = -1;
  }
}

//transition trigger
function oscB(phase){
  if(phase == 0){
    if (frameCount % 50 == 0) {
        for (let i = 0; i < total_oscB.length; i++) total_oscB[i].pan(random(-1, 1));
    }
  
    if(frameCount % 200 == 0){
        pushOscB();
        oscBCount++;
        // transition trigger
        if(oscBCount % 7 == 0) {
          speed += 0.1; // increase the heartbeat
          volume += 0.1; // raise the volume of it
          oscB_ps(0);
          heartbeat.stop();
          oscA_ps(0);
          fadeFlag = true;
        }
    }
  }
  if(phase == 2){
      if (frameCount % 50 == 0) {
        for (let i = 0; i < total_oscB.length; i++) total_oscB[i].pan(random(-1, 1));
  }
  if(frameCount % 10 == 0 && oscBCount < 10){
    pushOscB();
    oscBCount++;
  }
  }
}

function pushOscA(){
  for (let i = 0; i < oscACount; i++) {
    let oscBg = new p5.Oscillator();
    oscBg.setType('sine');
    oscBg.freq(random(100, 1000));
    oscBg.amp(0.05 / oscACount); 
    oscBg.start();
    total_oscA.push(oscBg);
  }
}

function pushOscB() {
  let osc = new p5.Oscillator();
  osc.setType('square');
  osc.freq(random(300, 1000));
  osc.amp(0.005);
  osc.start();
  total_oscB.push(osc);
}

// Fadein Fadeout
function transition(){
  let message= " ";

  if(fadeFlag){ // fade-in and fade-out, phase by phase
    if(opacity >= 0 && opacity <= 255 && opCount == 0) opacity += 5;

    if(opacity > 255 && opCount == 0) {
      if(PHASE == -1 || PHASE == 3) opCount = 1;
      else opCount = 2;
      
      // previous phase
      switch(PHASE){
        case 3:
          endingSong_happy.play();
          endingSong_happy.loop();
          break;
        case 4:
          endingSong.play();
          endingSong.loop();
          break;
      }

      initObjects();
      PHASE++;
    }
    if(opCount == 2){
      if(darkscreen_count < 200){
        darkscreen_count++;
        switch(PHASE){
          case 1:
            message = "Look for the light.";
            break;
          case 2:
            message = "Avoid nightmares and escape.";
            break;
          case 3:
            message = "Think about one you should rescue. You have only one chance.";
            break;
        }
      }
      else{
        opCount = 1;
        darkscreen_count = 0;
      }
    }
    if(opCount == 1 && opacity > 0) opacity -= 5;
    else if(opCount == 1 && opacity <= 0){
      fadeFlag = false;
      opCount = 0;
      // next phase 
      switch(PHASE){
        case 1:
          heartbeat.play();
          oscA_ps(1);
          break;
        case 2:
          heartbeat.play();
          oscA_ps(1);
          oscB_ps(1);
          oscBflag = true;
          break;
        case 3:
          heartbeat.play();
          oscA_ps(1);
          break;
      }
    }
  }
  if(oscBflag) oscB(2);
  
  fill(0, 0, 0, opacity);
  rect(0, 0, width, height);
  fill(0, 0, 0, opacity);
  strokeWeight(3)
  stroke(255, 255, 255, opacity);
  textSize(25);
  textStyle(ITALIC);
  text(message, width/2, height/2 + 200);
  noStroke();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
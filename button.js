
class Button{
  constructor(x, y, w, h, c, handle){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.handle = handle;
  }
  
  show(){
    push();
    rectMode(CENTER);
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
  
  touching(x, y){
    return abs(x - this.x) <= this.w / 2 && abs(y - this.y) <= this.h / 2;
  }
}

let pressButtons = [];
let holdButtons = [];

function createMobileButton(x, y, w, h, c, handle, type){
  if(type == "press"){
    pressButtons.push(new Button(x, y, w, h, c, handle));
  }
  else{
    holdButtons.push(new Button(x, y, w, h, c, handle));
  }
}

let previousTouchCount = 0;

function handleHoldButtons(){
  for(let button of holdButtons){
    if(mouseIsPressed === true && button.touching(mouseX, mouseY)){
      button.handle()
    }
    for(let touch of touches){
      if((touches.x && button.touching(touch.x, touch.y)) ||(button.touching(mouseX, mouseY))){
        button.handle();
        break;
      }
    }
  }
}

function handlePressButtons(){
  let touch = touches[touches.length - 1];
  for(let b of pressButtons){
    if(((touches.x && b.touching(touch.x, touch.y)) || (mouseX && b.touching(mouseX, mouseY)))){
      b.handle();
    }
  }
}

function drawButtons(){
  for(let i of pressButtons){
    i.show();
  }
  for(let i of holdButtons){
    i.show();
  }
}

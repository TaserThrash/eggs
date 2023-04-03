
//use createMobileButton(x, y, w, h, c, handle, type) to make a button

let days, eggsToday = 0, dayCount, entered = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  database = firebase.database();

  var reference = database.ref("days");
  reference.on("value", function(data){
    days = data.val();
  });
  
  var reference3 = database.ref("dayCount");
  reference3.on("value", function(data){
    dayCount = data.val();
  });

  createMobileButton(width / 2, height / 2.2, width / 50, height / 50, "green", () => {eggsToday += 0.5}, "press");
  createMobileButton(width / 2, height / 1.8, width / 50, height / 50, "red", () => {eggsToday -= 0.5}, "press");
  createMobileButton(width / 1.5, height / 2, width / 20, height / 20, "red", addNewElement, "press");
}

function draw() {
  if(entered){
    background("#000000");
    return;
  }

  background(255);

  if((days && eggsToday >= 0 && dayCount)){
    handleHoldButtons();

    average = 0;

    for(let i of days){
      average += i;
    }

    average /= dayCount;

    text("AVERAGE DAILY EGGS: " + average, width / 2 - 80, height / 1.5)
    text("EGGS FROM TODAY: " + eggsToday, width / 2 - 80, height / 2)

    drawButtons();
  }

  else{
    for(let i = 0; i > -8; i--){
      fill(0, 0, 0, 255 * -(i / 8));
      ellipse(width / 2 + width * 0.1 * cos(frameCount / 12 + (i * TAU / 8)), height / 2 + sin(frameCount / 12 + (i * TAU / 8)) * width * 0.1, 10)
      fill(0, 0, 0);
    }
  }
}

function touchStarted(){
  handlePressButtons();
  if(eggsToday < 0){
    eggsToday = 0;
  }
}

const addNewElement = () => {
  if(entered){
    return;
  }

  entered = true;

  var reference = database.ref("days/" + dayCount);
  reference.set(eggsToday);

  var reference2 = database.ref("dayCount");
  reference2.set(dayCount + 1);
}

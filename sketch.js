
//class variables
let body;
let circuit;

//scene transition variables
let next_scene = false;
let first_scene = true;
let transition = false;

//color and transparency
let background_transp1 = 10;
let background_transp2 = 10;
let first_background_color;
let second_background_color;
let lerp_t = 0.02;
let transp_inc = 0.001;

//mouse events
let picked;


function setup() {
  createCanvas(1200, 800);
  //initializations
  body = new OrganicShape();
  body.generate_tiles(width/20, height/10, width - width/8, height - height/4, height/5, height/6);
  body.voronoi(0, width, 0, height);
  first_background_color = color(128, 2, 0, background_transp1);
  second_background_color = color(12, 21, 89, background_transp1);
  circuit = new Circuit(0, 0, width, height);
}

function draw() {
  //first scene
  if (first_scene == true){
    background(128, 2, 0, 255);
    body.display(100, 700, 50, 450);
  }
  //transition conditions
  if(body.break_count > 100 && next_scene == false) {
    transition = true;
    first_scene = false;
    body.break_count = 0;
  }
  //transition from the first to the second scene
  if(transition == true) {
    clear();
    for(let i = 0; i < 20; i++) {
      const rand_index = int(random(body.cells.length));
      circuit.cells.push(body.cells[rand_index]);
    }
    background(first_background_color);
    transition = false;
    background_transp1 = 10;
    next_scene = true;
    circuit.init();
  }
  //2nd scene
  if(next_scene == true) {
    let color = lerpColor(first_background_color, second_background_color, lerp_t)
    lerp_t += 0.002;
    background(color);
    circuit.draw_circuit();
    circuit.check_collision();
    background_transp1 += transp_inc;
    //ending
    if(circuit.end == true) {
      fill(0, 4, 53, background_transp2);
      console.log('end');
      rect(0, 0, width, height);
      background_transp2 += 1;
    }
  }
}

function mouseClicked() {
  if(next_scene == false) {
    body.break(mouseX, mouseY);
  }
  return false;
}
function mouseDragged() {
  if(next_scene == true)  {
    let picked = 0;
    for(let i = 0; i < circuit.cells.length; i++) {
      if(collidePointPoly(mouseX, mouseY, circuit.cells[i].poly)) {
          picked = i;
      }
    }
    if(picked != -1) {
      for(let j = 0; j < circuit.cells[picked].poly.length; j++) {
        circuit.cells[picked].poly[j].x = mouseX + (mouseX - circuit.cells[picked].poly[j].x);
        circuit.cells[picked].poly[j].y = mouseY + (mouseY - circuit.cells[picked].poly[j].y);
      }
    }
  }
  return false;
}
function mouseReleased() {
  if(next_scene == true) {
    picked = -1;
  }
  return false;
}
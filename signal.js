/*
    There are two types of signals. One is for the transition scene where the user cannot interact with the signals and their paths are generated
    beforehand. The other signals are interactive and their paths are generated through collisions. 
*/

class Signal {
    constructor(x,y,dx,dy, path, speed, change_number) {
      this.x = x; 
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.path = path;
      this.speed = speed;
      //change number is for init_signals only. It is to track the remaining number of path changes the signal has to make
      this.change_number = change_number;
    }
  
    display() {
      strokeWeight(2);
      point(this.x, this.y);
      if(this.change_number == 6) {
        stroke(255);
      }
      else {
        stroke(220);
      }
      let random_ellipse = int(random(0,200));
      fill(255);
      if(random_ellipse % 200 == 0 && this.change_number != 5) {
        const rand_r = random(0,12);
        ellipse(this.x, this.y, rand_r, rand_r);
      }
    }
    //updates the movement of the signals
    move() {
      this.check_edges();
      this.x += this.dx * this.speed;
      this.y += this.dy * this.speed;
      if(frameCount % 100 == 0 && this.change_number < 5) {
        const direction_array = this.generate_direction_change_array(this.path[this.change_number], this.dx, this.dy, this.speed);
        this.dx = direction_array[0];
        this.dy = direction_array[1];
        this.change_number++;
      }
      //the init_signals will stop after they changed direction for the 5th time. 
      if(this.change_number == 5) {
        this.dx = 0;
        this.dy = 0;
      }
    }
    //direction change depends on the generatePath() which returns a path array for each individual init_signal.
    //It returns the new dx and dy for the signals
    generate_direction_change_array(change, dx, dy) {
      let new_dx;
      let new_dy;
      if(change == 1) {
        new_dx = dx;
        new_dy = dy;
      }
      else if (change == 2) {
        if(dx == 0) {
          new_dx = dy * -1;
          new_dy = 0;
        }
        else {
          new_dx = 0;
          new_dy = dx;
        } 
      }
      else {
        if(dx == 0) {
          new_dx = dy;
          new_dy = 0;
        }
        else {
          new_dx = 0;
          new_dy = dx * -1;
        }
      }
      return [new_dx,new_dy];
    }

    check_edges() {      
      //the if statement checks whether the signals are interactive since the init signals will only have 5 changes.
      if(this.change_number == 6) {
        if(this.x > width && this.dx > 0) {
          this.x = 0;
        }
        else if(this.x < 0 && this.dx < 0) {
          this.x = width;
        }
        if(this.y > height && this.dy > 0) {
          this.y = 0;
        }
        else if(this.y < 0 && this.dy < 0) {
          this.y = height;
        }
      }
    }
    
  }
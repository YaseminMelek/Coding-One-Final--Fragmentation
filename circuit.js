class Circuit {
    cells = [];
    init_signals = [];
    interactive_signals = [];
    interaction = false;
    heart;
    end = false;
    constructor(x,y,width, height) {
        this.x = x;
        this.y = y; 
        this.width = width; 
        this.height = height; 
    }
    //called only once during transition. Similar to setup() as it initializes everything within the scene
    init() {
        this.generate_init_signals(10);
        this.generate_interactive_signals(6);
        this.heart = new Heart(this.width/4 * 3, this.height/4*3);
    }
    draw_circuit() {
        //draw cells
        for(let i = 0; i < this.cells.length; i++) {
            //random selection of the cells from the first scene. 
            const rand_ind = int(random(this.cells.length));
            beginShape();
               for(let j = 0; j < this.cells[i].poly.length; j++) {
                   fill(220, 0, 0, this.cells[i].transp / 20);
                    
                   //the cells will turn on and off
                   if(frameCount % 100 == 0 && rand_ind == i) {
                    strokeWeight(4);
                    stroke('yellow');
                   }
                   else if(this.cells[i].transp / 10 < 5) {
                    strokeWeight(0.5);
                    stroke(220, 0, 50);
                   }
                   else {
                    noStroke();
                   }
                    vertex(this.cells[i].poly[j].x, this.cells[i].poly[j].y);
               }
           endShape(CLOSE);
        }
        //draw signals
        for(let i = 0; i < this.init_signals.length; i++) {
            this.init_signals[i].display();
            this.init_signals[i].move();
            if(this.init_signals[i].change_number == 5) {
                this.interaction = true;
            }
        }
        if(this.interaction) {
            for(let i = 0; i < this.interactive_signals.length; i++) {
                this.interactive_signals[i].display();
                this.interactive_signals[i].move();
            }
            //draw heart
            this.heart.display();
        }
    }

    generate_init_signals(num) {
        //top
        for(let i = 0; i < num; i++) {
            const signal = new Signal(random(10, width - 10), 0, 0, 1, this.generate_path(), random(0.5, 2),0);
            this.init_signals.push(signal);
        }
        //bottom
        for(let i = 0; i < num; i++) {
            const signal = new Signal(random(10, width - 10), height, 0, -1, this.generate_path(), random(0.5, 3),0);
            this.init_signals.push(signal);
        }
        //left
        for(let i = 0; i < num; i++) {
            const signal = new Signal(0, random(10, height - 10), 1, 0, this.generate_path(), random(0.5, 3),0);
            this.init_signals.push(signal);
        }
        //right
        for(let i = 0; i < num; i++) {
            const signal = new Signal(width, random(10, height - 10), -1, 0, this.generate_path(), random(0.5, 3),0);
            this.init_signals.push(signal);
        }   
    }
    
    generate_path() {
        const r1 = int(random(1, 4)); 
        const r2 = int(random(1, 4));
        const r3 = int(random(1, 4));
        const r4 = int(random(1, 4));
        const r5 = int(random(1, 4));
        let path_array = [r1, r2, r3, r4, r5];
        return path_array;
      }

    generate_interactive_signals(num) {
        for(let i = 1; i <= num; i++) {
            const signal = new Signal(this.x, this.y + 20 * i, 1, 0, [], 2, 6);
            this.interactive_signals.push(signal);
        }
        for(let i = 1; i <= num; i++) {
            const signal = new Signal(this.width - 20 * i, this.y, 0, 1, [], 2, 6);
            this.interactive_signals.push(signal);
        }
        for(let i = 1; i <= num; i++) {
            const signal = new Signal(this.x + 20 * i, this.height, 0, -1, [], 2, 6);
            this.interactive_signals.push(signal);
        }
        for(let i = 1; i <= num; i++) {
            const signal = new Signal(this.width, this.height - 20 * i, -1, 0, [], 2, 6);
            this.interactive_signals.push(signal);
        }
    }

    //The check collision method is called in sketch.js to further the gameplay
    check_collision() {
        this.cell_signal_collision();
        if(this.interaction) {
            this.signal_heart_collision();
        }
    }
    /*
    handles the collision between the remaining voronoi cells and the signals using the p5.collide library. The interaction is only possible
    when the cells have a high transparency. When collision happens the signals will change direction
    */
    cell_signal_collision() {
        for(let i = 0; i < this.cells.length; i++) {
            for(let j = 0; j < this.interactive_signals.length; j++) {
                if(collidePointPoly(this.interactive_signals[j].x, this.interactive_signals[j].y, this.cells[i].poly)) {
                    if(this.cells[i].transp / 10 > 10) {
                        const temp_dx = this.interactive_signals[j].dx;
                        const temp_dy = this.interactive_signals[j].dy;
                        this.interactive_signals[j].dx = temp_dy;
                        this.interactive_signals[j].dy = temp_dx;
                    }
                }
            }
        }
    }

    /*
    handles the collision between the heart and the signals. There is a bug with this collision since sometimes the collision results will 
    not appear
    */
    signal_heart_collision(){
        for(let i = 0; i < this.interactive_signals.length; i++) {
            if(collidePointCircle(this.interactive_signals[i].x, this.interactive_signals[i].y, this.heart.x, this.heart.y, this.heart.changed_r)) {
                this.heart.signal_collision = true;
            }
        }
    }
}
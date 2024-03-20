class Heart {
    theta = 0.05;
    tranp = 2;
    r_color = 75;
    signal_collision;
    collision_count = 0;
    r = 100;
    changed_r;
    amp = 2;
    constructor(x,y) {
        this.x = x; 
        this.y = y;
    }

    display() {
        fill(this.r_color, 0, 0, this.transp);
        //after the circle is moves to the center. The amplitude will increase with lerp 
        if(int(this.x) == width/2 && int(this.y) == height/2) {
            this.amp = lerp(this.amp, 10, 0.001);
            if(this.amp > 9) {
                circuit.end = true;
            }
        }
        //handles collision results from signals
        if(this.signal_collision) {
            stroke(255);
            this.r_color += 1;
            this.tranp += 0.5;
            this.collision_count++;
            this.signal_collision = false;
        }
        //if the collision count goal is reached. The circle will move to the center using lerp
        else if(this.collision_count > 300){
            stroke(255);
            this.x = lerp(this.x, width/2, 0.01);
            this.y = lerp(this.y, height/2, 0.01);
        }
        else {
            noStroke();
        }
        //the diameter changes with a sine wave
        let change = this.amp * sin(this.theta);
        this.changed_r = this.r * change;
        ellipse(this.x, this.y, this.changed_r, this.changed_r);
        this.theta += 0.005;
    }
        
}
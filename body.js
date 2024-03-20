class OrganicShape {
  break_count = 0;
  cells = [];
  tiles = [];
  bone_color = color(227, 218, 201);
  dark_red_color = color(128, 2, 0);
  transp_inc = 80;


  display() {
    //drawing the organic shape
    this.draw_tiles();
    if(frameCount % 100 == 0) {
      this.transp_inc += 10;
    }

    //drawing the voronoi cells
    for (let i = 0; i < this.cells.length; i++) {
      strokeWeight(1.2);
    beginShape();
        let rand_num = int(random(100));
        //random stroke transparancy change for vibration effect in the voronoi cells
        if(rand_num < 5) {
          stroke(255, 255, 255, this.cells[i].transp + this.transp_inc);
        }
        else {
          stroke(255, 255, 255, this.cells[i].transp);
        }
        fill(0, 0, 255, this.cells[i].transp / 5);
        for (let j = 0; j < (this.cells[i].poly).length; j++) {
          vertex(this.cells[i].poly[j].x, this.cells[i].poly[j].y);
        }
      endShape(CLOSE);
    }

  }
  // handles the mouseClicked event with p5.collide library
  break(break_x,break_y) {
    for(let i = 0; i < this.cells.length; i++) {
      if(collideCirclePoly(break_x,break_y, 50, this.cells[i].poly)) {
        this.cells[i].transp += 150;
        this.break_count++;
      }
    }
  }

  /*
  The next few methods have to do with generating the form for the organic shape. I used a tiles to make an organic pattern. There are 4 distinct tiles. 
  The different cases in the generate_tiles() method are for color changes and noise value generation which is random and separate for each cell. 
  After the generation the tiles will update with the draw_tiles() method.  
  */
  draw_tiles() {
    for(let i = 0; i < this.tiles.length; i++) {
      if(this.tiles[i][0] == 1) {
        this.bezier_tile_1(this.tiles[i][1], this.tiles[i][2], this.tiles[i][3], this.tiles[i][4], this.tiles[i][5], this.tiles[i][6], this.tiles[i][7]);
      }
      else if(this.tiles[i][0] == 2) {
        this.bezier_tile_2(this.tiles[i][1], this.tiles[i][2], this.tiles[i][3], this.tiles[i][4], this.tiles[i][5], this.tiles[i][6], this.tiles[i][7]);
      }
      else if(this.tiles[i][0] == 3) {
        this.oval1(this.tiles[i][1], this.tiles[i][2], this.tiles[i][3], this.tiles[i][4], this.tiles[i][5], this.tiles[i][6]);
      }
      else if(this.tiles[i][0] == 4) {
        this.bezier_tile_3(this.tiles[i][1], this.tiles[i][2], this.tiles[i][3], this.tiles[i][4], this.tiles[i][5], this.tiles[i][6], this.tiles[i][7]);
      }
      else {
        this.rect1(this.tiles[i][1], this.tiles[i][2], this.tiles[i][3], this.tiles[i][4]);
      }
    }
  }

  //tiles
  generate_tiles(start_x, start_y, end_x, end_y, r, tile_r) {
    for(let x = start_x; x < end_x; x += tile_r) {
      for(let y = start_y; y < end_y; y += tile_r) {
        let rand = int(random(1,6));
        let n1 = random(0.01, 0.001);
        let n2 = random(0.01, 0.001);
        switch(rand) {
          case 1: 
            this.bezier_tile_1(x,y,r, this.dark_red_color, this.bone_color);
            this.tiles.push([1, x,y,r,this.dark_red_color, this.bone_color, n1, n2]);
            break;
          case 2:  
            this.bezier_tile_2(x,y,r,this.dark_red_color, this.bone_color);
            this.tiles.push([2, x,y,r,this.dark_red_color, this.bone_color, n1, n2]);
            break;
          case 3: 
            this.oval1(x,y,r, r * 0.6, this.dark_red_color, this.bone_color);
            this.tiles.push([3, x,y,r, this.dark_red_color, this.bone_color, n1]);
            break;
          case 4: 
            this.rect1(x,y,r, this.bone_color, this.dark_red_color);
            this.tiles.push([5,x,y,r, this.bone_color]);
            break;
          case 5: 
            this.bezier_tile_1(x,y,r,this.bone_color, this.dark_red_color);
            this.tiles.push([1, x, y, r,this.bone_color, this.dark_red_color, n1, n2]);
            break;
          case 6: 
            this.oval1(x,y,r, r * 0.4, this.bone_color, this.dark_red_color);
            this.tiles.push([3, x,y,r, this.bone_color, this.dark_red_color, n1]);
            break;
        }
      }
    }

  }
  
  //bezier 1
  bezier_tile_1(x,y,r, c1, c2, n1, n2) {
    noStroke();
    fill(c2);
    rect(x,y,r,r, 20);
    fill(c1);
    beginShape();
      vertex(x,y);
      bezierVertex(x + r, y + r/2 , x - r/(10 * noise(n1 * frameCount)), (y + r/2 * noise(n2 * frameCount)) , x + r, y + r);
      vertex(x, y + r);
    endShape(CLOSE);
  }
  //bezier 2
  bezier_tile_2(x,y,r, c1, c2, n1, n2) {
    noStroke();
    fill(c1);
    rect(x,y,r,r,20);
    fill(c2);
    beginShape();
      vertex(x + r,y);
      bezierVertex(x, y, x + r * noise(n1 * frameCount), y + r/2 * noise(n2 * frameCount), x, y + r);
      vertex(x + r, y + r);
    endShape(CLOSE);
  }
  //oval 
  oval1(x, y, r, c1, c2, n1) {
    noStroke();
    fill(c1);
    rect(x,y, r, r, 20);
    fill(c2);
    beginShape();
      vertex(x + r, y);
      quadraticVertex(x, y, x, y + r * noise(n1 * frameCount));
      vertex(x + r, y + r);
    endShape(CLOSE);
  }
  //rect
  rect1(x,y,r, c1) {
    fill(c1);
    rect(x,y,r, r, 10);
  }


  /*
  voronoi cells are generated using the d3.js library with Delaunay triangulation. The first half of the method deals with generating the 
  polygons and the second half making the polygons useful for my context. For instance turning every data point to a vector is necessary
  to handle collisions with the p5.collide library.
  */
  voronoi(start_x, end_x, start_y, end_y) {
    let v_points = [];
    let cell_num = 120;
    let transp = 100;
    for (let i = 0; i < cell_num; i++) {
      v_points.push([random(start_x, end_x), random(start_y, end_y)]);
    }
    const delaunay = d3.Delaunay.from(v_points);
    const voronoi = delaunay.voronoi([start_x, start_y, end_x, end_y]);
    for (let i = 0; i < cell_num; i++) {
      let points = voronoi.cellPolygon(i);
      const polygon = d3.polygonHull(points);
      const poly = [];
      for(let p = 0; p < polygon.length; p++) {
        const section = createVector(polygon[p][0], polygon[p][1]);
        poly.push(section);
      }
      const cell = new Cell(poly, transp)
      this.cells.push(cell);
    }
  }
}


class Cell {
  constructor(poly, transp) {
      this.poly = poly;
      this.transp = transp;
  }
} 